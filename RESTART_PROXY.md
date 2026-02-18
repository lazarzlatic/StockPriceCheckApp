# 🔄 How to Restart Proxy Server (to see all 3 fixed dates)

## What Changed?

I updated the proxy server to request **1 year** of data instead of 3 months, so you can now see:
- ✅ April 1st, 2025
- ✅ October 1st, 2025
- ✅ December 1st, 2025

## How to Apply the Update:

### Step 1: Stop the Old Proxy
In the terminal running the proxy server, press:
```
Ctrl + C
```

### Step 2: Start the New Proxy
In the same terminal, run:
```bash
npm run proxy
```

You'll see:
```
╔═══════════════════════════════════════════╗
║   🚀 Proxy Server Running!                ║
║   📡 Port: 3001                           ║
╚═══════════════════════════════════════════╝
```

### Step 3: Reload the Web App
In your browser, press `F5` or click reload.

### Step 4: Test with IBM
1. Toggle switch to Yahoo Finance (RIGHT/Green)
2. Enter: **IBM**
3. Click "Price"
4. ✅ You should now see ALL 3 fixed dates!

---

## Expected Result:

```
IBM
Current Price: $258.83

5 Days Ago: $296.34
30 Days Ago: $291.50

Fixed Date Prices
┌─────────────┬──────────────┬───────────────┐
│  April 1st  │  October 1st │  December 1st │
│    2025     │     2025     │      2025     │
│  $XXX.XX    │   $XXX.XX    │   $XXX.XX     │
└─────────────┴──────────────┴───────────────┘
```

All three dates will now be displayed!

---

## Why This Is Needed:

The proxy server was requesting only **3 months** of historical data, which only includes:
- ❌ April 2025 - TOO OLD (not included)
- ❌ October 2025 - TOO OLD (not included)  
- ✅ December 2025 - Included

Now it requests **1 year** of data, which includes:
- ✅ April 2025 - Included!
- ✅ October 2025 - Included!
- ✅ December 2025 - Included!

---

## Quick Reference:

**To restart proxy:**
1. Ctrl+C in proxy terminal
2. `npm run proxy`
3. Reload browser

That's it! 🎉
