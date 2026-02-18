// Stock Price App - Main TypeScript File
import { config } from './config';

// Get DOM elements
const tickerInput = document.getElementById('tickerInput') as HTMLInputElement;
const priceButton = document.getElementById('priceButton') as HTMLButtonElement;
const resultDiv = document.getElementById('result') as HTMLDivElement;
const loadingDiv = document.getElementById('loading') as HTMLDivElement;
const errorDiv = document.getElementById('error') as HTMLDivElement;
const apiToggle = document.getElementById('apiToggle') as HTMLInputElement;

// Interface for stock data
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

// Function to fetch stock price with historical data using Alpha Vantage API
async function fetchStockPrice(ticker: string): Promise<StockData> {
    // Using Alpha Vantage API (free tier: 25 requests per day)
    // API key is securely stored in config.ts
    const API_KEY = config.ALPHA_VANTAGE_API_KEY;
    
    // Fetch daily time series to get historical prices (outputsize=full for more historical data)
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker.toUpperCase()}&outputsize=full&apikey=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check for API errors
        if (data['Error Message']) {
            throw new Error('Stock ticker not found or invalid');
        }
        
        if (data['Note']) {
            throw new Error('API rate limit reached. Please try again later');
        }
        
        if (data['Information']) {
            throw new Error('API limit reached. Free API allows 25 requests/day. Please try again later or wait a minute');
        }
        
        const timeSeries = data['Time Series (Daily)'];
        
        if (!timeSeries) {
            throw new Error('No data available for this ticker');
        }
        
        // Get all dates and sort them (most recent first)
        const dates = Object.keys(timeSeries).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
        
        if (dates.length === 0) {
            throw new Error('No price data available');
        }
        
        // Get current price (most recent trading day)
        const currentDate = dates[0];
        const currentPrice = parseFloat(timeSeries[currentDate]['4. close']);
        
        // Get price from 5 days ago (or closest available trading day)
        const date5DaysAgo = dates[Math.min(5, dates.length - 1)];
        const price5DaysAgo = parseFloat(timeSeries[date5DaysAgo]['4. close']);
        
        // Get price from 30 days ago (or closest available trading day)
        const date30DaysAgo = dates[Math.min(30, dates.length - 1)];
        const price30DaysAgo = parseFloat(timeSeries[date30DaysAgo]['4. close']);
        
        // Calculate changes
        const change5Days = currentPrice - price5DaysAgo;
        const changePercent5Days = (change5Days / price5DaysAgo) * 100;
        
        const change30Days = currentPrice - price30DaysAgo;
        const changePercent30Days = (change30Days / price30DaysAgo) * 100;
        
        // Calculate daily change (from previous day)
        const previousDate = dates[1] || dates[0];
        const previousPrice = parseFloat(timeSeries[previousDate]['4. close']);
        const dailyChange = currentPrice - previousPrice;
        const dailyChangePercent = (dailyChange / previousPrice) * 100;
        
        // Helper function to find closest trading day to a specific date
        const findClosestDate = (targetDate: string): string | null => {
            // Check if exact date exists
            if (timeSeries[targetDate]) {
                return targetDate;
            }
            
            // Find closest available date (search within 7 days)
            const target = new Date(targetDate);
            for (let i = 0; i <= 7; i++) {
                // Try dates before
                const dateBefore = new Date(target);
                dateBefore.setDate(target.getDate() - i);
                const dateBeforeStr = dateBefore.toISOString().split('T')[0];
                if (timeSeries[dateBeforeStr]) {
                    return dateBeforeStr;
                }
                
                // Try dates after
                if (i > 0) {
                    const dateAfter = new Date(target);
                    dateAfter.setDate(target.getDate() + i);
                    const dateAfterStr = dateAfter.toISOString().split('T')[0];
                    if (timeSeries[dateAfterStr]) {
                        return dateAfterStr;
                    }
                }
            }
            return null;
        };
        
        // Get prices for fixed dates
        const april1_2025 = findClosestDate('2025-04-01');
        const october1_2025 = findClosestDate('2025-10-01');
        const december1_2025 = findClosestDate('2025-12-01');
        
        let priceApril1_2025, priceOctober1_2025, priceDecember1_2025;
        let changeApril1, changePercentApril1, changeOctober1, changePercentOctober1;
        let changeDecember1, changePercentDecember1;
        
        if (april1_2025) {
            priceApril1_2025 = parseFloat(timeSeries[april1_2025]['4. close']);
            changeApril1 = currentPrice - priceApril1_2025;
            changePercentApril1 = (changeApril1 / priceApril1_2025) * 100;
        }
        
        if (october1_2025) {
            priceOctober1_2025 = parseFloat(timeSeries[october1_2025]['4. close']);
            changeOctober1 = currentPrice - priceOctober1_2025;
            changePercentOctober1 = (changeOctober1 / priceOctober1_2025) * 100;
        }
        
        if (december1_2025) {
            priceDecember1_2025 = parseFloat(timeSeries[december1_2025]['4. close']);
            changeDecember1 = currentPrice - priceDecember1_2025;
            changePercentDecember1 = (changeDecember1 / priceDecember1_2025) * 100;
        }
        
        return {
            symbol: ticker.toUpperCase(),
            price: currentPrice,
            currency: 'USD',
            change: dailyChange,
            changePercent: dailyChangePercent,
            price5DaysAgo: price5DaysAgo,
            price30DaysAgo: price30DaysAgo,
            change5Days: change5Days,
            changePercent5Days: changePercent5Days,
            change30Days: change30Days,
            changePercent30Days: changePercent30Days,
            priceApril1_2025: priceApril1_2025,
            priceOctober1_2025: priceOctober1_2025,
            priceDecember1_2025: priceDecember1_2025,
            changeApril1: changeApril1,
            changePercentApril1: changePercentApril1,
            changeOctober1: changeOctober1,
            changePercentOctober1: changePercentOctober1,
            changeDecember1: changeDecember1,
            changePercentDecember1: changePercentDecember1,
            timestamp: new Date().toLocaleString()
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch stock data: ${error.message}`);
        }
        throw new Error('Failed to fetch stock data');
    }
}

// Function to fetch stock price from Yahoo Finance (yfinance) API
async function fetchStockPriceYFinance(ticker: string): Promise<StockData> {
    // Using Yahoo Finance API through local proxy server (bypasses CORS)
    const symbol = ticker.toUpperCase();
    
    try {
        // Use local proxy server on port 3001
        // Request 1 year of data to get all fixed dates (April, October, December 2025)
        const proxyUrl = `http://localhost:3001/api/stock/${symbol}`;
        
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
            throw new Error(`Proxy server error! Make sure proxy is running: npm run proxy`);
        }
        
        const data = await response.json();
        
        // Check for errors
        if (data.chart?.error) {
            throw new Error('Stock ticker not found or invalid');
        }
        
        const result = data.chart?.result?.[0];
        if (!result || !result.timestamp || result.timestamp.length === 0) {
            throw new Error('No data available for this ticker');
        }
        
        const timestamps = result.timestamp;
        const quotes = result.indicators.quote[0];
        const closePrices = quotes.close;
        
        // Filter out null values and get valid data
        const validData: Array<{timestamp: number, close: number, date: string}> = [];
        for (let i = 0; i < timestamps.length; i++) {
            if (closePrices[i] !== null) {
                const date = new Date(timestamps[i] * 1000);
                validData.push({
                    timestamp: timestamps[i],
                    close: closePrices[i],
                    date: date.toISOString().split('T')[0]
                });
            }
        }
        
        if (validData.length === 0) {
            throw new Error('No valid price data available');
        }
        
        // Get current price (most recent)
        const currentPrice = validData[validData.length - 1].close;
        
        // Get price from 5 trading days ago
        const index5Days = Math.max(0, validData.length - 6);
        const price5DaysAgo = validData[index5Days].close;
        
        // Get price from 30 trading days ago
        const index30Days = Math.max(0, validData.length - 31);
        const price30DaysAgo = validData[index30Days].close;
        
        // Calculate changes
        const change5Days = currentPrice - price5DaysAgo;
        const changePercent5Days = (change5Days / price5DaysAgo) * 100;
        
        const change30Days = currentPrice - price30DaysAgo;
        const changePercent30Days = (change30Days / price30DaysAgo) * 100;
        
        // Calculate daily change
        const previousPrice = validData.length > 1 ? validData[validData.length - 2].close : currentPrice;
        const dailyChange = currentPrice - previousPrice;
        const dailyChangePercent = (dailyChange / previousPrice) * 100;
        
        // Helper function to find closest date
        const findClosestDateYF = (targetDate: string): number | null => {
            let closest = null;
            let minDiff = Infinity;
            
            for (const item of validData) {
                const diff = Math.abs(new Date(item.date).getTime() - new Date(targetDate).getTime());
                if (diff < minDiff && diff <= 7 * 24 * 60 * 60 * 1000) { // Within 7 days
                    minDiff = diff;
                    closest = item.close;
                }
            }
            return closest;
        };
        
        // Get prices for fixed dates
        const priceApril1_2025 = findClosestDateYF('2025-04-01');
        const priceOctober1_2025 = findClosestDateYF('2025-10-01');
        const priceDecember1_2025 = findClosestDateYF('2025-12-01');
        
        let changeApril1, changePercentApril1, changeOctober1, changePercentOctober1;
        let changeDecember1, changePercentDecember1;
        
        if (priceApril1_2025) {
            changeApril1 = currentPrice - priceApril1_2025;
            changePercentApril1 = (changeApril1 / priceApril1_2025) * 100;
        }
        
        if (priceOctober1_2025) {
            changeOctober1 = currentPrice - priceOctober1_2025;
            changePercentOctober1 = (changeOctober1 / priceOctober1_2025) * 100;
        }
        
        if (priceDecember1_2025) {
            changeDecember1 = currentPrice - priceDecember1_2025;
            changePercentDecember1 = (changeDecember1 / priceDecember1_2025) * 100;
        }
        
        return {
            symbol: symbol,
            price: currentPrice,
            currency: 'USD',
            change: dailyChange,
            changePercent: dailyChangePercent,
            price5DaysAgo: price5DaysAgo,
            price30DaysAgo: price30DaysAgo,
            change5Days: change5Days,
            changePercent5Days: changePercent5Days,
            change30Days: change30Days,
            changePercent30Days: changePercent30Days,
            priceApril1_2025: priceApril1_2025 || undefined,
            priceOctober1_2025: priceOctober1_2025 || undefined,
            priceDecember1_2025: priceDecember1_2025 || undefined,
            changeApril1: changeApril1,
            changePercentApril1: changePercentApril1,
            changeOctober1: changeOctober1,
            changePercentOctober1: changePercentOctober1,
            changeDecember1: changeDecember1,
            changePercentDecember1: changePercentDecember1,
            timestamp: new Date().toLocaleString()
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch stock data from Yahoo Finance: ${error.message}`);
        }
        throw new Error('Failed to fetch stock data from Yahoo Finance');
    }
}

// Function to display result
function displayResult(stockData: StockData): void {
    const changeClass = (stockData.change && stockData.change >= 0) ? '🟢' : '🔴';
    const changeSign = (stockData.change && stockData.change >= 0) ? '+' : '';
    
    // Helper function to format change display
    const formatChange = (change: number, changePercent: number) => {
        const icon = change >= 0 ? '🟢' : '🔴';
        const sign = change >= 0 ? '+' : '';
        return `${icon} ${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)`;
    };
    
    resultDiv.innerHTML = `
        <h2>${stockData.symbol}</h2>
        <div class="price-current">
            <div class="price-label">Current Price</div>
            <div class="price">$${stockData.price.toFixed(2)}</div>
            ${stockData.change !== undefined ? `
                <div class="info">
                    ${changeClass} ${changeSign}${stockData.change.toFixed(2)} 
                    (${changeSign}${stockData.changePercent?.toFixed(2)}%)
                </div>
            ` : ''}
        </div>
        
        <div class="historical-prices">
            <div class="price-comparison">
                <div class="comparison-label">5 Days Ago (-5)</div>
                <div class="comparison-price">$${stockData.price5DaysAgo?.toFixed(2)}</div>
                ${stockData.change5Days !== undefined && stockData.changePercent5Days !== undefined ? `
                    <div class="comparison-change">
                        ${formatChange(stockData.change5Days, stockData.changePercent5Days)}
                    </div>
                ` : ''}
            </div>
            
            <div class="price-comparison">
                <div class="comparison-label">30 Days Ago (-30)</div>
                <div class="comparison-price">$${stockData.price30DaysAgo?.toFixed(2)}</div>
                ${stockData.change30Days !== undefined && stockData.changePercent30Days !== undefined ? `
                    <div class="comparison-change">
                        ${formatChange(stockData.change30Days, stockData.changePercent30Days)}
                    </div>
                ` : ''}
            </div>
        </div>
        
        <div class="section-divider">Fixed Date Prices</div>
        
        <div class="fixed-date-prices">
            ${stockData.priceApril1_2025 !== undefined ? `
                <div class="price-comparison">
                    <div class="comparison-label">April 1st, 2025</div>
                    <div class="comparison-price">$${stockData.priceApril1_2025.toFixed(2)}</div>
                    ${stockData.changeApril1 !== undefined && stockData.changePercentApril1 !== undefined ? `
                        <div class="comparison-change">
                            ${formatChange(stockData.changeApril1, stockData.changePercentApril1)}
                        </div>
                    ` : ''}
                </div>
            ` : ''}
            
            ${stockData.priceOctober1_2025 !== undefined ? `
                <div class="price-comparison">
                    <div class="comparison-label">October 1st, 2025</div>
                    <div class="comparison-price">$${stockData.priceOctober1_2025.toFixed(2)}</div>
                    ${stockData.changeOctober1 !== undefined && stockData.changePercentOctober1 !== undefined ? `
                        <div class="comparison-change">
                            ${formatChange(stockData.changeOctober1, stockData.changePercentOctober1)}
                        </div>
                    ` : ''}
                </div>
            ` : ''}
            
            ${stockData.priceDecember1_2025 !== undefined ? `
                <div class="price-comparison">
                    <div class="comparison-label">December 1st, 2025</div>
                    <div class="comparison-price">$${stockData.priceDecember1_2025.toFixed(2)}</div>
                    ${stockData.changeDecember1 !== undefined && stockData.changePercentDecember1 !== undefined ? `
                        <div class="comparison-change">
                            ${formatChange(stockData.changeDecember1, stockData.changePercentDecember1)}
                        </div>
                    ` : ''}
                </div>
            ` : ''}
        </div>
        
        <div class="info" style="margin-top: 15px;">Currency: ${stockData.currency}</div>
        ${stockData.timestamp ? `<div class="info">Last updated: ${stockData.timestamp}</div>` : ''}
    `;
    
    resultDiv.classList.remove('hidden');
}

// Function to show error
function showError(message: string): void {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Function to hide all messages
function hideMessages(): void {
    resultDiv.classList.add('hidden');
    loadingDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
}

// Main function to handle button click
async function handlePriceClick(): Promise<void> {
    const ticker = tickerInput.value.trim();
    
    // Validate input
    if (!ticker) {
        showError('Please enter a stock ticker symbol');
        return;
    }
    
    // Hide previous messages and show loading
    hideMessages();
    loadingDiv.classList.remove('hidden');
    priceButton.disabled = true;
    
    try {
        // Check which API to use based on toggle switch
        // Unchecked (left) = Yahoo Finance, Checked (right) = Alpha Vantage
        const useAlphaVantage = apiToggle.checked;
        let stockData: StockData;
        
        if (useAlphaVantage) {
            // Use Alpha Vantage API
            stockData = await fetchStockPrice(ticker);
        } else {
            // Use Yahoo Finance API
            stockData = await fetchStockPriceYFinance(ticker);
        }
        
        // Hide loading and display result
        loadingDiv.classList.add('hidden');
        displayResult(stockData);
    } catch (error) {
        // Hide loading and show error
        loadingDiv.classList.add('hidden');
        
        if (error instanceof Error) {
            showError(error.message);
        } else {
            showError('An unexpected error occurred');
        }
    } finally {
        priceButton.disabled = false;
    }
}

// Event listeners
priceButton.addEventListener('click', handlePriceClick);

// Allow pressing Enter key in input field
tickerInput.addEventListener('keypress', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        handlePriceClick();
    }
});

// Focus on input field when page loads
window.addEventListener('load', () => {
    tickerInput.focus();
});
