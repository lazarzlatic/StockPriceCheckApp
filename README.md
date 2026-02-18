# 📈 Stock Price App

A simple and beautiful web application to check current stock prices using TypeScript.

## Features

### 🔄 Dual API Support - NEW!
- **Toggle Switch**: Switch between Alpha Vantage and Yahoo Finance
- **Yahoo Finance**: No API key needed, unlimited requests, fast!
- **Alpha Vantage**: More historical data, requires API key
- Smart API selection based on your choice

### Functionality 1: Current Price with Historical Comparison ✅
- 💰 **Current Price**: Real-time stock price with daily change
- 📊 **5 Days Ago (-5)**: Price from 5 trading days ago with comparison
- 📈 **30 Days Ago (-30)**: Price from 30 trading days ago with comparison
- 🟢🔴 Visual indicators for gains and losses

### Functionality 2: Fixed Date Prices ✅
- 📅 **April 1st, 2025**: Historical price from April 2025
- 📅 **October 1st, 2025**: Historical price from October 2025
- 📅 **December 1st, 2025**: Historical price from December 2025
- 📊 Each shows change from that date to current price

### General Features
- 🎯 Simple and intuitive interface
- 🎨 Modern and responsive design
- ⌨️ Supports Enter key for quick searching
- 🔒 Secure API key storage

## Getting Started

### Prerequisites

- Node.js installed on your computer (download from https://nodejs.org/)

### Installation

1. Open a terminal/command prompt in this folder

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and go to the URL shown in the terminal (usually http://localhost:5173)

## How to Use

### Starting the App:
```bash
npm run dev
```
Then open http://localhost:5173/

### Using the App:

1. **Choose Your Data Source:**
   - Use the toggle switch to select between:
     - **Alpha Vantage** (left/blue) - Requires API key
     - **Yahoo Finance** (right/green) - No API key needed! ⭐ Recommended

2. **Enter a Stock Ticker:**
   - Type any stock ticker (e.g., AAPL, MSFT, GOOGL, TSLA)

3. **Get the Price:**
   - Click "Price" button or press Enter

4. **View All Price Data:**
   - Current price with daily change
   - 5-day and 30-day historical comparison
   - Fixed date prices (April, October, December 2025)

### Recommended: Use Yahoo Finance! 🚀
- **No rate limits** - query as many stocks as you want!
- **No API key needed** - works immediately
- **Fast responses** - instant results
- Just toggle the switch to the right (green)

## Common Stock Tickers

- **AAPL** - Apple Inc.
- **MSFT** - Microsoft Corporation
- **GOOGL** - Alphabet Inc. (Google)
- **AMZN** - Amazon.com Inc.
- **TSLA** - Tesla Inc.
- **META** - Meta Platforms Inc. (Facebook)
- **NVDA** - NVIDIA Corporation
- **JPM** - JPMorgan Chase & Co.

## API Information

This app supports **TWO data sources**:

### 1. Yahoo Finance API (Recommended! ⭐)
- **No API key required** - works out of the box!
- **No rate limits** - unlimited requests
- **Fast and reliable**
- Toggle switch to the right (green) to use

### 2. Alpha Vantage API
- **API key required** (already configured for you)
- **Rate limits**: 25 requests per day
- **More historical data** (20+ years)
- Toggle switch to the left (blue) to use

### API Key Setup (For Alpha Vantage Only)

Your API key is securely stored in `src/config.ts`

If you need to change it:
1. Open `src/config.ts`
2. Update the `ALPHA_VANTAGE_API_KEY` value
3. Save the file (the app will automatically reload)

**Security Note:** 
- The `config.ts` file is excluded from git via `.gitignore` to protect your API key
- Never share or commit your `config.ts` file
- Use `config.example.ts` as a template when sharing the project

## Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `dist` folder.

## Troubleshooting

- **"Stock ticker not found"**: Make sure you're using a valid US stock ticker symbol
- **Rate limit errors**: Switch to Yahoo Finance (toggle right) for unlimited requests!
- **Alpha Vantage rate limits**: Wait until the next day or use Yahoo Finance instead
- **Connection errors**: Check your internet connection

## Technologies Used

- TypeScript
- HTML5
- CSS3
- Vite (build tool)
- Alpha Vantage API
- Yahoo Finance API

Enjoy checking stock prices! 🚀
