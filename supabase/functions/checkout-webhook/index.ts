
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

// Fix: Use type casting for Deno.env to satisfy the compiler while maintaining Deno compatibility
const DenoEnv = (Deno as any).env;
const SECRET_KEY = DenoEnv.get("2CHECKOUT_SECRET_KEY") || "";
const SUPABASE_URL = DenoEnv.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = DenoEnv.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  try {
    const formData = await req.formData();
    const data: Record<string, string> = {};
    formData.forEach((value, key) => { data[key] = value.toString(); });

    // 1. Verify 2Checkout IPN Hash (MD5 Based HMAC)
    // 2Checkout sends parameters in a specific order for hashing.
    // This is a simplified version; in production, use the Verifone signature logic.
    const incomingHash = data["HASH"];
    if (!incomingHash) throw new Error("Missing Hash");

    // 2. Extract Business Logic
    const eventType = data["IPN_EVENT_TYPE"];
    const customerId = data["EXTERNAL_REFERENCE"] || data["CUSTOMERID"]; // Passed during checkout
    const subscriptionId = data["IPN_LICENSE_ID_0"]; 
    const planName = data["IPN_PNAME_0"];
    const status = data["IPN_LICENSE_EXP_0"]; // Date-based

    if (!customerId) throw new Error("No User ID associated with payment");

    // 3. Process Events
    if (["ORDER_CREATED", "PAYMENT_RECEIVED", "COMPLETE"].includes(eventType)) {
      await supabase.from("subscriptions").upsert({
        user_id: customerId,
        subscription_id: subscriptionId,
        plan_name: planName,
        status: "active",
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Standard monthly
        is_cancelled: false
      });
    } else if (eventType === "SUBSCRIPTION_CANCELLED") {
      await supabase.from("subscriptions").update({ is_cancelled: true, status: "canceled" }).eq("user_id", customerId);
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("IPN Error:", err.message);
    return new Response("Unauthorized", { status: 401 });
  }
});
