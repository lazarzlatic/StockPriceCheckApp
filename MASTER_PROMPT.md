# Master Prompt: Stock Price Check Application

**Use this comprehensive prompt to recreate the entire Stock Price Check App v1.0**

---

## 🎯 Project Overview

Create a professional TypeScript web application for checking stock prices with dual API support, 
beautiful UI, and comprehensive documentation. The app should be beginner-friendly while maintaining 
professional code quality.

---

## 📋 Core Requirements

### 1. Basic Application Structure

**Technology Stack:**
- TypeScript for type safety
- Vite as build tool
- Vanilla JavaScript (no frameworks)
- Express.js for proxy server
- Node.js for backend

**Project Setup:**
- Initialize with npm/Vite
- Create proper folder structure (src/, documentation files)
- Include all configuration files (tsconfig.json, package.json)
- Set up .gitignore to protect API keys

---

### 2. User Interface Requirements

**HTML Structure (index.html):**
- Clean, modern single-page application
- Header with title: "📈 Stock Price Checker"
- Subtitle: "Enter a stock ticker to get the current price"
- Input field for stock ticker with placeholder: "Enter stock ticker (e.g., AAPL, MSFT, GOOGL)"
- "Price" button to trigger the search
- Results display area (initially hidden)
- Loading indicator (initially hidden)
- Error display area (initially hidden)

**CSS Styling (src/style.css):**
- Beautiful gradient background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
- White container card with rounded corners (20px) and shadow
- Responsive design (max-width: 500px, centered)
- Smooth animations and transitions
- Hover effects on buttons
- Color scheme:
  - Primary: #667eea (blue-purple)
  - Success: #10b981 (green)
  - Error: #e74c3c (red)
  - Background: Purple gradient
  - Text: #333 (dark gray)
- Loading animation with pulse effect
- Grid layout for historical prices (2 columns)
- Grid layout for fixed dates (3 columns, responsive to 1 column on mobile)

---

### 3. API Toggle Switch Feature

**Toggle Switch UI:**
- Location: Between title and input field
- Design: Sliding toggle switch (60px width, 30px height)
- Colors:
  - Left position (Alpha Vantage): Blue (#667eea)
  - Right position (Yahoo Finance): Green (#10b981)
- Label: "Data Source:" with current API name display
- Smooth animation (0.4s transition)
- White circular handle (22px) that slides
- Hover effect with glow

**API Selection Logic:**
- Default: Alpha Vantage (left position)
- Toggle updates label text automatically
- Switch controls which API function is called

---

### 4. Dual API Implementation

#### **API 1: Alpha Vantage**

**Configuration:**
- Endpoint: TIME_SERIES_DAILY
- Parameter: outputsize=full (to get 1 year of data)
- API Key: Store in separate config.ts file
- Create config.example.ts as template (without actual key)
- Add config.ts to .gitignore

**Data Fetching:**
- Fetch daily time series data
- Parse JSON response
- Extract current price (most recent close)
- Extract 5 days ago price (5 trading days back)
- Extract 30 days ago price (30 trading days back)
- Find closest dates for: April 1, 2025; October 1, 2025; December 1, 2025
- Calculate changes and percentage changes for all comparisons

**Error Handling:**
- Check for API errors
- Handle rate limits (25 calls/day, 5 calls/minute)
- Display user-friendly error messages

#### **API 2: Yahoo Finance**

**Proxy Server (proxy-server.js):**
- Express.js server on port 3001
- Enable CORS for all routes
- Proxy endpoint: GET /api/stock/:symbol
- Forward to: https://query2.finance.yahoo.com/v8/finance/chart/:symbol?range=1y&interval=1d
- Return JSON data
- Log requests with emojis (📊 fetching, ✅ success)

**Client-Side Implementation:**
- Fetch from local proxy: http://localhost:3001/api/stock/:symbol
- Parse Yahoo Finance response structure
- Extract timestamps and close prices
- Calculate same metrics as Alpha Vantage
- Handle CORS through proxy

**Why Proxy Needed:**
- Yahoo Finance blocks direct browser requests (CORS policy)
- Proxy server runs on Node.js (no CORS restrictions)
- Proxy forwards requests and returns data to browser

---

### 5. Data Display Features

#### **Current Price Section:**
```
Label: "Current Price"
Price: Large text (2.5em), blue color (#667eea)
Daily Change: Show change amount and percentage
Indicator: 🟢 for positive, 🔴 for negative
```

#### **Historical Prices (2-column grid):**

**5 Days Ago (-5):**
- Show price from 5 trading days ago
- Display: $XXX.XX
- Change from that price to current
- Percentage change
- Visual indicator (🟢/🔴)

**30 Days Ago (-30):**
- Show price from 30 trading days ago
- Display: $XXX.XX
- Change from that price to current
- Percentage change
- Visual indicator (🟢/🔴)

#### **Fixed Date Prices (3-column grid):**

**Section Header:** "Fixed Date Prices" with styled divider

**Three Date Cards:**
1. April 1st, 2025
2. October 1st, 2025
3. December 1st, 2025

Each card shows:
- Date label
- Price: $XXX.XX
- Change from that date to current
- Percentage change
- Visual indicator (🟢/🔴)

**Card Styling:**
- Light gray background (#f8f9fa)
- Border: 2px solid #e0e0e0
- Border radius: 10px
- Hover effect: slight lift (translateY(-2px))
- Hover border color change to blue

#### **Additional Info:**
- Currency: USD
- Last updated timestamp

---

### 6. TypeScript Implementation (src/main.ts)

**Interface: StockData**
```typescript
interface StockData {
    symbol: string;
    price: number;
    currency: string;
    change?: number;
    changePercent?: number;
    timestamp?: string;
    price5DaysAgo?: number;
    price30DaysAgo?: number;
    change5Days?: number;
    changePercent5Days?: number;
    change30Days?: number;
    changePercent30Days?: number;
    priceApril1_2025?: number;
    priceOctober1_2025?: number;
    priceDecember1_2025?: number;
    changeApril1?: number;
    changePercentApril1?: number;
    changeOctober1?: number;
    changePercentOctober1?: number;
    changeDecember1?: number;
    changePercentDecember1?: number;
}
```

**Functions to Implement:**

1. `fetchStockPrice(ticker: string): Promise<StockData>`
   - Alpha Vantage implementation
   - Fetch TIME_SERIES_DAILY with full output
   - Parse dates and extract prices
   - Calculate all changes

2. `fetchStockPriceYFinance(ticker: string): Promise<StockData>`
   - Yahoo Finance implementation through proxy
   - Fetch from localhost:3001
   - Parse Yahoo's timestamp/price arrays
   - Calculate same metrics as Alpha Vantage

3. `displayResult(stockData: StockData): void`
   - Format and display all price data
   - Use template literals for HTML
   - Apply conditional formatting (🟢/🔴)
   - Show/hide appropriate sections

4. `formatChange(change: number, changePercent: number): string`
   - Helper function for consistent formatting
   - Add + or - sign
   - Include emoji indicators
   - Format to 2 decimal places

5. `hideMessages(): void`
   - Hide result, loading, and error divs

6. `showError(message: string): void`
   - Display error message
   - Style with red background

7. `handlePriceClick(): Promise<void>`
   - Main handler for button click
   - Validate ticker input
   - Show loading state
   - Check toggle position
   - Call appropriate API function
   - Display results or errors
   - Re-enable button

**Event Listeners:**
- Button click → handlePriceClick()
- Input Enter key → handlePriceClick()
- Toggle switch change → update API name label
- Window load → focus on input field

---

### 7. Configuration Files

**package.json:**
```json
{
  "name": "stock-price-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "proxy": "node proxy-server.js"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "vite": "^5.0.11"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "node-fetch": "^2.7.0"
  }
}
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

**.gitignore:**
```
# Dependencies
node_modules/

# Build output
dist/

# Environment and config files (contains API keys)
src/config.ts

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Temp files
*.tmp
*.temp
```

---

### 8. Documentation Requirements

Create the following documentation files:

1. **README.md**
   - Project description
   - Features list
   - Installation instructions
   - How to use (both APIs)
   - API setup instructions
   - Common stock tickers list
   - Troubleshooting section
   - Technologies used

2. **FEATURES.md**
   - Detailed feature descriptions
   - Screenshots/examples
   - Feature status (completed/planned)

3. **API_SWITCH_GUIDE.md**
   - How toggle switch works
   - Comparison of both APIs
   - When to use which API
   - Testing instructions

4. **YAHOO_FINANCE_SETUP.md**
   - Why proxy is needed
   - How to start proxy server
   - Step-by-step usage guide
   - Terminal setup (2 terminals needed)

5. **CORS_ISSUE_YAHOO_FINANCE.md**
   - CORS explanation
   - Why Yahoo Finance needs proxy
   - Solutions and alternatives

6. **RESTART_PROXY.md**
   - Instructions for restarting proxy
   - When restart is needed
   - Troubleshooting

7. **FIXED_DATE_PRICES_COMPLETE.md**
   - Technical details of fixed dates
   - Why 1 year of data is needed
   - Implementation details

8. **IMPLEMENTATION_COMPLETE.md**
   - Full project summary
   - File structure
   - Success criteria
   - Testing results

---

### 9. Security Requirements

**API Key Protection:**
- Store Alpha Vantage key in `src/config.ts`
- Export as: `export const config = { ALPHA_VANTAGE_API_KEY: 'YOUR_KEY' }`
- Add `src/config.ts` to .gitignore
- Create `src/config.example.ts` template with placeholder
- Never commit actual API key to version control

**Git Configuration:**
- Properly configure .gitignore before first commit
- Verify config.ts is excluded
- Test with `git status` before committing

---

### 10. Testing Requirements

**Test Scenarios:**
1. Alpha Vantage API with various tickers (AAPL, IBM, MSFT, TSLA)
2. Yahoo Finance API through proxy
3. Toggle switch functionality
4. Error handling (invalid ticker, rate limits)
5. All 3 fixed dates displaying
6. Responsive design on different screen sizes

**Test Data:**
- Use real stock tickers: AAPL, MSFT, GOOGL, IBM, TSLA, META, NVDA
- Verify current price matches external sources
- Check historical prices are accurate
- Confirm fixed date prices exist (within 1 year)

---

### 11. User Experience Requirements

**Loading States:**
- Disable button during fetch
- Show "Loading..." message with pulse animation
- Clear previous results before new search

**Error Handling:**
- User-friendly error messages
- Different messages for:
  - Empty input
  - Invalid ticker
  - API rate limits
  - Network errors
  - Proxy not running

**Visual Feedback:**
- Smooth animations (0.3-0.4s transitions)
- Hover effects on interactive elements
- Clear visual hierarchy
- Responsive on mobile (grid changes to single column)

---

### 12. Running Instructions

**For Users (in README.md):**

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up API key:
   - Get free key from https://www.alphavantage.co/support/#api-key
   - Copy `src/config.example.ts` to `src/config.ts`
   - Add your API key

3. Start proxy server (Terminal 1):
   ```bash
   npm run proxy
   ```

4. Start web app (Terminal 2):
   ```bash
   npm run dev
   ```

5. Open browser: http://localhost:5173/

6. Use the app:
   - Toggle to select API
   - Enter stock ticker
   - Click "Price" or press Enter
   - View results

---

### 13. Expected File Structure

```
StockPriceCheckApp/
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── index.html
├── proxy-server.js
├── README.md
├── FEATURES.md
├── API_SWITCH_GUIDE.md
├── YAHOO_FINANCE_SETUP.md
├── CORS_ISSUE_YAHOO_FINANCE.md
├── RESTART_PROXY.md
├── FIXED_DATE_PRICES_COMPLETE.md
├── IMPLEMENTATION_COMPLETE.md
└── src/
    ├── config.example.ts
    ├── config.ts (gitignored)
    ├── main.ts
    └── style.css
```

---

### 14. Success Criteria

The application is complete when:

✅ User can enter stock ticker and get results
✅ Both APIs (Alpha Vantage & Yahoo Finance) work
✅ Toggle switch successfully switches between APIs
✅ Current price displays with daily change
✅ 5-day and 30-day comparisons show correctly
✅ All 3 fixed dates (April, October, December 2025) display
✅ Visual indicators (🟢/🔴) work correctly
✅ Proxy server runs and handles Yahoo Finance requests
✅ API key is protected and not in git repository
✅ Error handling works for all scenarios
✅ UI is responsive and beautiful
✅ All 8 documentation files are complete
✅ Application runs on localhost
✅ Code is properly typed with TypeScript
✅ Project builds without errors

---

### 15. Key Implementation Notes

**CORS Solution:**
- Yahoo Finance requires proxy due to CORS restrictions
- Proxy runs on port 3001
- Web app runs on port 5173
- Two terminals needed for full functionality

**Historical Data:**
- Request 1 year of data (range=1y for Yahoo, outputsize=full for Alpha Vantage)
- This ensures all 3 fixed dates (April, October, December 2025) are available
- 3 months of data would only include December 2025

**Date Handling:**
- Fixed dates may fall on weekends/holidays
- Find closest trading day within 7 days
- Return null if no data available

**Styling Best Practices:**
- Use CSS Grid for layouts
- Implement smooth transitions
- Mobile-first responsive design
- Consistent color scheme throughout

---

### 16. Common Stock Tickers for Testing

- **AAPL** - Apple Inc.
- **MSFT** - Microsoft Corporation
- **GOOGL** - Alphabet Inc. (Google)
- **AMZN** - Amazon.com Inc.
- **TSLA** - Tesla Inc.
- **META** - Meta Platforms Inc.
- **NVDA** - NVIDIA Corporation
- **IBM** - IBM Corporation
- **JPM** - JPMorgan Chase & Co.

---

## 🎯 Final Deliverables

1. ✅ Fully functional web application
2. ✅ Dual API support with toggle switch
3. ✅ Proxy server for CORS bypass
4. ✅ 8 comprehensive documentation files
5. ✅ Secure API key storage
6. ✅ Beautiful, responsive UI
7. ✅ TypeScript code with proper typing
8. ✅ Git repository with proper .gitignore
9. ✅ Ready for GitHub deployment

---

## 📊 Expected Metrics

- **Files**: 18 files
- **Lines of Code**: ~4,000+ lines
- **Documentation**: 8 guide files
- **APIs**: 2 (Alpha Vantage + Yahoo Finance)
- **Features**: 10+ major features
- **Technologies**: 5+ (TypeScript, Vite, Express, Node, HTML/CSS)

---

**Created**: February 18, 2026
**Version**: 1.0
**Type**: Master Prompt for Complete Recreation
**Target Audience**: AI assistants and developers

---

## Usage Instructions

To recreate this application:
1. Provide this entire prompt to an AI assistant
2. Request step-by-step implementation
3. Follow security practices (API key protection)
4. Test each feature as it's built
5. Deploy to GitHub when complete

The AI should create an identical application with all features, documentation, and functionality as described above.
