# 🚀 How to Use Yahoo Finance (With Proxy)

## The Problem
Yahoo Finance blocks direct browser requests (CORS error). 

## The Solution ✅
I've created a simple proxy server that runs locally and fixes the CORS issue!

---

## 🎯 Quick Start Guide

### Step 1: Start the Proxy Server
Open a **NEW terminal** and run:
```bash
npm run proxy
```

You should see:
```
╔═══════════════════════════════════════════╗
║   🚀 Proxy Server Running!                ║
║   📡 Port: 3001                           ║
║   🌐 URL: http://localhost:3001          ║
║                                           ║
║   ✅ CORS enabled for Yahoo Finance       ║
║   📊 Ready to fetch stock data!           ║
╚═══════════════════════════════════════════╝
```

### Step 2: Start the App (in another terminal)
Open a **SECOND terminal** and run:
```bash
npm run dev
```

App will run on: http://localhost:5173/

### Step 3: Use Yahoo Finance!
1. Open http://localhost:5173/ in your browser
2. **Toggle switch to the RIGHT (green)** → "Yahoo Finance"
3. Enter any stock ticker (IBM, AAPL, MSFT, etc.)
4. Click "Price"
5. ✅ **Results will appear!**

---

## 📺 Visual Guide

### Before (without proxy):
```
Browser → Yahoo Finance API ❌ CORS Error
```

### After (with proxy):
```
Browser → Proxy Server (localhost:3001) → Yahoo Finance API ✅ Works!
```

---

## 🎮 Full Workflow

### Terminal 1 - Proxy Server:
```powershell
cd C:\Dev\VibeCoding\StockPriceApp
npm run proxy
# Keep this running!
```

### Terminal 2 - Web App:
```powershell
cd C:\Dev\VibeCoding\StockPriceApp
npm run dev
# Keep this running too!
```

### Browser:
1. Open: http://localhost:5173/
2. Toggle **RIGHT (Green)** = Yahoo Finance
3. Enter ticker: **IBM**
4. Click **Price**
5. 🎉 See results!

---

## 🔄 Switching Between APIs

### Use Alpha Vantage (No proxy needed):
- Toggle **LEFT (Blue)** → "Alpha Vantage"
- Works immediately
- Limit: 25 calls/day

### Use Yahoo Finance (Proxy required):
- Toggle **RIGHT (Green)** → "Yahoo Finance"  
- **Must have proxy running!**
- Unlimited calls!

---

## 🛠️ Troubleshooting

### Error: "Proxy server error! Make sure proxy is running"
**Solution**: Start the proxy server in a separate terminal:
```bash
npm run proxy
```

### Error: "EADDRINUSE: address already in use :::3001"
**Solution**: Port 3001 is already in use. Either:
1. Close other apps using port 3001, OR
2. Change PORT in `proxy-server.js` to 3002 (and update in `src/main.ts`)

### Proxy server won't start
**Solution**: Make sure dependencies are installed:
```bash
npm install
```

---

## 📊 Testing IBM with Yahoo Finance

Once both servers are running:

1. **Browser**: http://localhost:5173/
2. **Toggle**: Switch to Yahoo Finance (RIGHT/Green)
3. **Enter**: IBM
4. **Click**: Price
5. **Result**: 
   ```
   IBM
   Current Price: $XXX.XX
   
   5 Days Ago: $XXX.XX (change)
   30 Days Ago: $XXX.XX (change)
   
   Fixed Date Prices
   April 1, 2025: $XXX.XX
   October 1, 2025: $XXX.XX
   December 1, 2025: $XXX.XX
   ```

---

## 🎯 Summary

**Two APIs, Two Options:**

| API | Requires Proxy? | Rate Limit | Toggle Position |
|-----|----------------|------------|-----------------|
| **Alpha Vantage** | ❌ No | 25/day | Left (Blue) |
| **Yahoo Finance** | ✅ Yes | Unlimited | Right (Green) |

**For Yahoo Finance**: Always run `npm run proxy` first!

---

## 🚀 All Set!

You now have a fully functional dual-API stock price checker with Yahoo Finance support via proxy! 

**Remember**: Keep both terminals running (proxy + app) to use Yahoo Finance.

Enjoy unlimited stock queries! 📈
