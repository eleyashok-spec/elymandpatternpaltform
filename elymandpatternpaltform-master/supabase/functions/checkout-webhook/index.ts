
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Fix: Use type casting for Deno.env to satisfy the compiler while maintaining Deno compatibility
const DenoEnv = (Deno as any).env;
const SUPABASE_URL = DenoEnv.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = DenoEnv.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  // Log incoming request for debugging
  console.log("Webhook received:", req.method);
  
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  try {
    const formData = await req.formData();
    const data: Record<string, string> = {};
    formData.forEach((value, key) => { data[key] = value.toString(); });

    console.log("Webhook data received:", { 
      eventType: data["IPN_EVENT_TYPE"], 
      customerId: data["EXTERNAL_REFERENCE"] 
    });

    // 1. Extract Customer & Payment Data
    const eventType = data["IPN_EVENT_TYPE"];
    const customerId = data["EXTERNAL_REFERENCE"] || data["CUSTOMERID"]; // Passed during checkout
    const subscriptionId = data["IPN_LICENSE_ID_0"] || `sub_${Date.now()}`;
    const planName = data["IPN_PNAME_0"] || "Unknown Plan";
    const transactionId = data["TRANS_ID"];
    const invoiceId = data["IPN_INVOICE_ID"];

    if (!customerId) throw new Error("No User ID associated with payment");

    // 2. Process Events
    if (["ORDER_CREATED", "PAYMENT_RECEIVED", "COMPLETE"].includes(eventType)) {
      console.log(`Processing ${eventType} for user ${customerId}`);
      
      // Update or create subscription
      const { error: upsertError } = await supabase.from("subscriptions").upsert({
        user_id: customerId,
        subscription_id: subscriptionId,
        plan_name: planName,
        status: "active",
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Standard monthly
        is_cancelled: false,
        transaction_id: transactionId,
        invoice_id: invoiceId,
        created_at: new Date().toISOString()
      });

      if (upsertError) throw new Error(`Database error: ${upsertError.message}`);

      // Update user subscription status
      const { error: updateError } = await supabase
        .from("users")
        .update({ subscription_status: "pro", subscription_id: subscriptionId })
        .eq("id", customerId);

      if (updateError) console.error("Error updating user subscription status:", updateError);

    } else if (eventType === "SUBSCRIPTION_CANCELLED" || eventType === "REFUND") {
      console.log(`Processing CANCELLATION for user ${customerId}`);
      
      await supabase.from("subscriptions").update({ 
        is_cancelled: true, 
        status: "canceled",
        cancelled_at: new Date().toISOString()
      }).eq("user_id", customerId);

      // Reset user subscription status
      await supabase
        .from("users")
        .update({ subscription_status: "free" })
        .eq("id", customerId);
    }

    console.log("Webhook processed successfully");
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("IPN Error:", err.message);
    return new Response("Internal Server Error", { status: 500 });
