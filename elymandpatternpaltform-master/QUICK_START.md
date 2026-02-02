# ⚡ 2Checkout Setup - Quick Reference Card

## 🎯 What You Need to Do (In Order)

### Step 1️⃣: Git Push (5 min)
```bash
git add .
git commit -m "Activate 2Checkout Webhook"
git push origin main
```
✓ **Then wait for GitHub Actions to turn GREEN**

### Step 2️⃣: 2Checkout Config (5 min)
```
Website: https://secure.2checkout.com
Go to: Integrations → Webhooks & IPN
Paste URL: https://bynyerbadascsbdrjgdn.supabase.co/functions/v1/checkout-webhook
Enable: Allow IPN (Yes)
Enable: Order Created, Payment Received, Refund/Canceled
Click: Save Settings
```

### Step 3️⃣: Database Setup (5 min)
```
Website: https://app.supabase.com
Go to: SQL Editor
Run SQL from: PAYMENT_SETUP_GUIDE.md
Wait for: ✅ Success message
```

### Step 4️⃣: Environment Variables (5 min)
```
Add to GitHub Secrets:
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- 2CHECKOUT_SECRET_KEY
- VITE_GOOGLE_AI_KEY

Add to Supabase Function Secrets:
(Same 4 variables above)
```

### Step 5️⃣: Test Payment (5 min)
```
Go to: /pricing
Click: Join Pro
Email: test@example.com
Card: 5105 1051 0510 5105
Expiry: 12/25
CVC: 123
Verify: "Pro Membership" shows in Dashboard ✅
```

---

## 🔗 Your URLs

| What | URL |
|------|-----|
| **Webhook** | `https://bynyerbadascsbdrjgdn.supabase.co/functions/v1/checkout-webhook` |
| **2Checkout** | https://secure.2checkout.com |
| **Supabase** | https://app.supabase.com |
| **Google AI** | https://aistudio.google.com |

---

## ✅ Verify Success

- [ ] GitHub Actions: GREEN ✓
- [ ] 2Checkout: IPN URL saved ✓
- [ ] Database: Subscriptions table exists ✓
- [ ] Test Payment: Completed ✓
- [ ] Dashboard: Shows "Pro Membership" ✓

---

## 🆘 If Something Fails

| Error | Fix |
|-------|-----|
| Webhook not firing | Check 2Checkout IPN URL matches EXACTLY |
| No subscription created | Check Supabase function logs |
| "Pro" badge missing | Clear cache, refresh page |
| Database error | Run SQL again |
| Env vars not working | Add to BOTH GitHub AND Supabase |

---

## 📖 Full Documentation

Read these files for detailed information:
- **2CHECKOUT_SETUP_STEPS.md** ← START HERE
- **PAYMENT_SETUP_GUIDE.md** ← Detailed guide
- **IMPLEMENTATION_SUMMARY.md** ← Overview

---

**⏱️ Total Time: ~20-30 minutes**  
**📊 Status: ALL SYSTEMS READY** ✅
