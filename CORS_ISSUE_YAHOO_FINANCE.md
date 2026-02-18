# Yahoo Finance CORS Issue & Solution

## Issue Discovered

When testing the Yahoo Finance API integration, we encountered a **CORS (Cross-Origin Resource Sharing)** error:

```
Access to fetch at 'https://query2.finance.yahoo.com/...' from origin 'http://localhost:5173' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present.
```

## What is CORS?

CORS is a browser security feature that prevents web pages from making requests to a different domain than the one serving the web page. Yahoo Finance API doesn't allow direct browser requests for security reasons.

## Current Status

✅ **Alpha Vantage API**: ✅ **Works perfectly** (configured and tested)  
⚠️ **Yahoo Finance API**: Code implemented but blocked by CORS in browser

## Solutions

### Solution 1: Use Alpha Vantage (Current Working Solution) ⭐
**Status**: ✅ Fully functional

- Toggle switch to Alpha Vantage (left/blue)
- Works immediately with your configured API key
- Rate limit: 25 calls/day
- **This is the recommended approach for this application**

### Solution 2: Backend Proxy (For Production Yahoo Finance) 🔧
**Status**: Requires additional setup

To use Yahoo Finance, you need a backend server:

1. **Create a simple Node.js proxy server**:
```javascript
// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/api/stock/:symbol', async (req, res) => {
    const { symbol } = req.params;
    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?range=3mo&interval=1d`;
    
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => console.log('Proxy running on port 3000'));
```

2. **Update app to use proxy**:
```typescript
// In fetchStockPriceYFinance():
const url = `http://localhost:3000/api/stock/${symbol}`;
```

3. **Run both servers**:
```bash
node server.js          # Backend proxy on port 3000
npm run dev             # Frontend on port 5173
```

### Solution 3: Browser Extension (Development Only) 🔧
**Not recommended for production**

Install a CORS-unblocking extension like "CORS Unblock" (Chrome/Edge) for development testing only.

### Solution 4: Use Alternative Free APIs ✅
**Other options that work without CORS issues**:

1. **Alpha Vantage** (Current - Working ✅)
2. **Finnhub** (Requires API key, has CORS support)
3. **IEX Cloud** (Has free tier with CORS support)

## Recommendation

For this application, **continue using Alpha Vantage** as the primary data source:

✅ **Pros**:
- Already configured and working
- No CORS issues
- Good historical data (20+ years)
- Your API key is set up

⚠️ **Cons**:
- Rate limit of 25 calls/day (sufficient for personal use)
- Requires API key

## Toggle Switch Functionality

The toggle switch UI is **fully implemented** and works correctly. It's ready to switch between APIs when you have a CORS-compatible solution in place.

### Current Behavior:
- **Left (Blue) - Alpha Vantage**: ✅ Works perfectly
- **Right (Green) - Yahoo Finance**: ⚠️ Blocked by CORS (code is ready, just needs proxy)

## Testing Results

### ✅ Alpha Vantage Test (IBM):
Earlier testing showed successful results:
- **IBM**: $262.38 (+1.10%)
- All features working: current, 5-day, 30-day, fixed dates

### ⚠️ Yahoo Finance Test (IBM):
- Code executed correctly
- API request sent
- **Blocked by browser CORS policy**
- Error: "No 'Access-Control-Allow-Origin' header"

## Conclusion

The application is **fully functional** with Alpha Vantage. The Yahoo Finance integration is **code-complete** but requires a backend proxy to bypass CORS restrictions. For a simple web application without a backend server, Alpha Vantage is the better choice.

**Recommendation**: Use Alpha Vantage as your primary API source. If you need unlimited calls in the future, implement the backend proxy solution above.

---

**Date**: February 17, 2026  
**Status**: Alpha Vantage ✅ Working | Yahoo Finance ⚠️ CORS-blocked
