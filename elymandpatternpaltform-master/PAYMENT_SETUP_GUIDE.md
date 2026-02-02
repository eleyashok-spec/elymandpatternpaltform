# 2Checkout Payment Integration Setup Guide

Complete this guide to enable payment processing and subscription management for your Elymand Platform.

---

## **STEP 1: Deploy the Webhook Function to Supabase**

### Prerequisites:
- Git installed and configured
- GitHub repository with Secrets set up
- Supabase project with service role key

### Instructions:

1. **Open your project terminal** on your PC:
   ```bash
   cd /path/to/elymandpatternpaltform-master
   ```

2. **Push latest changes to GitHub**:
   ```bash
   git add .
   git commit -m "Activate 2Checkout Webhook - Payment Integration"
   git push origin main
   ```

3. **Verify deployment**:
   - Go to your **GitHub Repository → Actions** tab
   - Wait for "Deploy Supabase Functions" workflow to **turn Green** ✅
   - This means your webhook is now live at:
     ```
     https://bynyerbadascsbdrjgdn.supabase.co/functions/v1/checkout-webhook
     ```

> **Important:** Your webhook URL MUST be HTTPS and the deployment MUST succeed for payments to work.

---

## **STEP 2: Configure 2Checkout Dashboard**

### Access 2Checkout (Verifone) Control Panel:

1. **Log in** to your [2Checkout Control Panel](https://secure.2checkout.com)
2. Go to **Integrations → Webhooks & IPN**
3. Locate the **IPN Settings** section

### Configure the Webhook:

1. **IPN URL Field** - Paste this exact link:
   ```
   https://bynyerbadascsbdrjgdn.supabase.co/functions/v1/checkout-webhook
   ```

2. **Critical Settings** (Must be enabled):
   - ✅ **Allow IPN**: Checked (Yes)
   - ✅ **Response method**: Default (HTTP 200 OK)
   - ✅ **Triggers** - Ensure these are selected:
     - Order Created
     - Payment Received
     - Refund/Canceled
     - Subscription Canceled (if applicable)

3. **Save Settings** at the bottom of the page

### Verify Configuration:

Send a test webhook from 2Checkout:
- Look for a "Send Test" button in IPN Settings
- Check your Supabase **Function Logs** for success message
- Expected log: `"Webhook processed successfully"`

---

## **STEP 3: Update Your Database Schema**

Ensure your Supabase database has the required tables:

### Run this SQL in Supabase SQL Editor:

```sql
-- Subscriptions Table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE,
  subscription_id TEXT,
  plan_name TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  current_period_end TIMESTAMP,
  is_cancelled BOOLEAN DEFAULT FALSE,
  cancelled_at TIMESTAMP,
  transaction_id TEXT,
  invoice_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Update users table to include subscription fields
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_id TEXT;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
```

---

## **STEP 4: Configure Environment Variables**

Add these to your **GitHub Secrets** and **Supabase Function Secrets**:

### GitHub Secrets:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key (keep secret!)
- `2CHECKOUT_SECRET_KEY`: Your 2Checkout merchant secret (from Integrations)

### Supabase Function Secrets:
Go to **Supabase → Functions → checkout-webhook → Settings**
- Add the same environment variables above

---

## **STEP 5: Connect Google AI Studio (Gemini)**

### Setup Gemini API:

1. Go to [Google AI Studio](https://aistudio.google.com)
2. Create an API key
3. Add to your project environment:

**In `.env` or GitHub Secrets:**
```
VITE_GOOGLE_AI_KEY=your_api_key_here
```

**In `services/geminiService.ts`:**
The service is already configured to auto-fill pattern descriptions using your API key.

---

## **STEP 6: Test a Purchase (End-to-End)**

### Before Testing:
- Use a **different email** than your Admin email
- Have test credit card ready (2Checkout provides test cards)

### Test Flow:

1. **Navigate to Pricing Page**
   - URL: `your-domain/pricing`

2. **Select a Plan and Click "Join Pro"**
   - This redirects to 2Checkout checkout

3. **Enter Test Card Details:**
   - Card: `5105 1051 0510 5105` (2Checkout test card)
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)
   - Email: Use your test email (not admin)

4. **Complete the Order**
   - You should be redirected to `/verify-success` page

5. **Verify in Dashboard:**
   - Log in with the test email
   - Go to Dashboard
   - Check if account now shows **"Pro Membership"**
   - This means the webhook worked! ✅

### Check Webhook Logs:
1. Go to **Supabase → Functions → checkout-webhook**
2. Click **Logs** tab
3. You should see:
   ```
   "Webhook received: POST"
   "Webhook data received: {eventType: PAYMENT_RECEIVED, customerId: ...}"
   "Webhook processed successfully"
   ```

---

## **STEP 7: Monitor Payment Integration**

### Daily Checklist (in Admin Dashboard):

✅ **Payment Connection Status** shows as "ACTIVE"
✅ **Last Webhook** timestamp is recent
✅ **Failed Transactions** count is 0
✅ **Database Subscriptions** table is updating

### Common Issues & Fixes:

| Issue | Solution |
|-------|----------|
| **Webhook not firing** | Verify IPN URL in 2Checkout matches exactly |
| **Payment received but no subscription update** | Check Supabase function logs for errors |
| **Test card rejected** | Ensure you're using 2Checkout sandbox/test environment |
| **User doesn't see "Pro" after purchase** | Clear browser cache and reload; check database subscription status |
| **Webhook returning 401/500** | Verify environment variables in Supabase Function settings |

---

## **STEP 8: Go Live (Production)**

When ready for real transactions:

1. **Switch 2Checkout to Production Mode**
   - Go to 2Checkout Settings → API Keys → Production

2. **Update Webhook URL** (if different from sandbox)
   - Use your production Supabase URL

3. **Test with Real Card** (small amount, e.g., $0.99)

4. **Enable Payment Verification**
   - Ensure `HASH` verification is enabled in webhook function
   - Current version accepts all requests (development mode)

5. **Monitor for 24 hours**
   - Watch for failed transactions
   - Check payment reports in 2Checkout dashboard

---

## **File Changes Made**

- ✅ **supabase/functions/checkout-webhook/index.ts** - Enhanced webhook handler
- ✅ **Database Schema** - Subscriptions table added
- ✅ **Admin Dashboard** - Payment status checklist added

---

## **Support & Debugging**

### Enable Debug Logging:
Add to your `.env`:
```
VITE_DEBUG_PAYMENTS=true
```

### View Live Logs:
```bash
supabase functions fetch checkout-webhook --logs
```

### Test Webhook Locally:
```bash
curl -X POST https://your-url/functions/v1/checkout-webhook \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "IPN_EVENT_TYPE=PAYMENT_RECEIVED&EXTERNAL_REFERENCE=test-user-123&IPN_PNAME_0=Pro"
```

---

**Last Updated**: February 2, 2026  
**Status**: ✅ Ready for Integration Testing
