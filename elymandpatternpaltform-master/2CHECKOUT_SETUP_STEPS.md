# 🚀 Complete 2Checkout Setup Steps for Elymand Platform

Follow these exact steps in order to enable payment processing and subscription management.

---

## 📋 **Step-by-Step Implementation**

### **STEP 1: Prepare Your GitHub Repository**

```bash
# Navigate to your project directory
cd c:\Users\User\Downloads\Compressed\elymandpatternpaltform-master\elymandpatternpaltform-master

# Check git status
git status

# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Activate 2Checkout Webhook - Payment Integration"

# Push to main branch
git push origin main
```

**Verify:**
- Go to GitHub Repository
- Click **Actions** tab
- Look for "Deploy Supabase Functions" workflow
- **Wait until it turns GREEN** ✅ (usually 2-3 minutes)

---

### **STEP 2: Log In to 2Checkout Control Panel**

1. Visit: https://secure.2checkout.com
2. Enter your credentials
3. Go to: **Integrations → Webhooks & IPN**

---

### **STEP 3: Configure Webhook URL**

**In 2Checkout Dashboard:**

1. Find the **IPN Settings** section
2. In the **IPN URL** field, paste this EXACT URL:
   ```
   https://bynyerbadascsbdrjgdn.supabase.co/functions/v1/checkout-webhook
   ```

3. Set these **CRITICAL** options:
   - ✅ **Allow IPN**: Yes (Checked)
   - ✅ **Response method**: Default (HTTP 200 OK)
   - ✅ **Order Created**: Enabled
   - ✅ **Payment Received**: Enabled
   - ✅ **Refund/Canceled**: Enabled

4. **Click "Save Settings"** at the bottom

---

### **STEP 4: Set Up Database Schema in Supabase**

1. Go to: https://app.supabase.com
2. Select your project
3. Go to: **SQL Editor** tab
4. Click **New Query**
5. Copy and paste this SQL:

```sql
-- Create Subscriptions Table
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

-- Update users table to add subscription fields
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_id TEXT;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
```

6. Click **Run** button
7. You should see ✅ **Success**

---

### **STEP 5: Add Environment Variables**

#### **In GitHub Secrets:**
Go to: **Repository → Settings → Secrets and variables → Actions**

Add these secrets:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (from Supabase settings)
- `2CHECKOUT_SECRET_KEY`: Your 2Checkout merchant key

#### **In Supabase Function Secrets:**
Go to: **Supabase → Functions → checkout-webhook → Settings**

Add the same three environment variables above

---

### **STEP 6: Enable Google AI Studio (Gemini)**

1. Visit: https://aistudio.google.com
2. Click **Get API Key**
3. Create a new API key
4. Copy the key
5. Add to your **environment variables**:
   - `VITE_GOOGLE_AI_KEY`: Your API key

---

### **STEP 7: Test the Complete Flow**

#### **Before Testing:**
- Use a **different email** than your admin email
- Have your 2Checkout test card ready

#### **Test Purchase Steps:**

1. **Navigate to Pricing Page:**
   - URL: `http://localhost:5173/pricing` (or your domain)

2. **Select a Plan:**
   - Click "Join Pro" button

3. **Enter Payment Details:**
   - Email: `test@example.com` (use different email)
   - Credit Card: `5105 1051 0510 5105` (2Checkout test card)
   - Expiry: Any future date (12/25)
   - CVC: Any 3 digits (123)

4. **Complete Order:**
   - You'll be redirected to success page

5. **Verify in Dashboard:**
   - Log out
   - Log in with test email
   - Go to **Dashboard**
   - Check if it shows **"Pro Membership"** ✅

#### **If It Doesn't Work:**
1. Go to **Supabase → Functions → checkout-webhook**
2. Click **Logs** tab
3. Look for errors
4. Check database: `SELECT * FROM subscriptions`

---

### **STEP 8: Monitor & Troubleshoot**

**Common Issues:**

| Problem | Solution |
|---------|----------|
| Webhook not triggering | Verify IPN URL in 2Checkout matches exactly |
| Payment succeeds but no subscription | Check Supabase function logs |
| User doesn't see "Pro" after purchase | Clear browser cache, refresh page |
| Database table doesn't exist | Run the SQL query again in Supabase |
| Environment variables not working | Verify they're added in both GitHub AND Supabase |

**Debug Command (in terminal):**
```bash
# View webhook logs
supabase functions fetch checkout-webhook --logs
```

---

### **STEP 9: Go Live (Production)**

When you're confident everything works:

1. **Switch 2Checkout to Production Mode** (not sandbox)
2. **Test with a real small transaction** ($0.99)
3. **Monitor for 24 hours** for any failures
4. **Enable hash verification** in webhook if needed

---

## ✅ **Complete Checklist**

- [ ] GitHub workflow deployed successfully (green checkmark)
- [ ] Webhook URL added to 2Checkout
- [ ] IPN triggers configured
- [ ] Database tables created
- [ ] Environment variables set in GitHub Secrets
- [ ] Environment variables set in Supabase Function
- [ ] Google AI key configured
- [ ] Test purchase completed successfully
- [ ] User sees "Pro Membership" in dashboard
- [ ] Webhook logs show successful processing

---

## 📞 **Support Resources**

- **2Checkout Docs:** https://knowledgebase.2checkout.com/
- **Supabase Docs:** https://supabase.com/docs
- **Gemini API:** https://aistudio.google.com/app/apikey

---

**Last Updated:** February 2, 2026  
**Status:** ✅ Complete & Ready to Deploy
