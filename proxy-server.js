// Simple proxy server to bypass CORS for Yahoo Finance API
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        status: 'Proxy server is running!', 
        port: PORT,
        usage: 'GET /api/stock/:symbol'
    });
});

// Proxy endpoint for Yahoo Finance
app.get('/api/stock/:symbol', async (req, res) => {
    const { symbol } = req.params;
    
    console.log(`📊 Fetching data for ${symbol}...`);
    
    try {
        // Request 1 year of data to include all fixed dates (April, October, December 2025)
        const url = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?range=1y&interval=1d`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Yahoo Finance API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log(`✅ Successfully fetched ${symbol} data`);
        res.json(data);
        
    } catch (error) {
        console.error(`❌ Error fetching ${symbol}:`, error.message);
        res.status(500).json({ 
            error: 'Failed to fetch stock data',
            message: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════╗
║   🚀 Proxy Server Running!                ║
║   📡 Port: ${PORT}                           ║
║   🌐 URL: http://localhost:${PORT}          ║
║                                           ║
║   ✅ CORS enabled for Yahoo Finance       ║
║   📊 Ready to fetch stock data!           ║
╚═══════════════════════════════════════════╝
    `);
});
