# Original User Prompts - Combined

This document contains all the original user prompts that guided the development of the Stock Price Check App v1.0.

---

## Prompt 1: Initial Application Request
```
Create application, web aplication, use type script. With field for entering stopc ticker. 
On button "Price" klick, use value from field and send it to google finace for stock price 
to current date. Display result under filend and button.
```

---

## Prompt 2: API Provider Question
```
Which provider for stock prices are you are using?
```

---

## Prompt 3: API Key Configuration
```
Here is API Key "xxxxxxxxxxxxx' for alpha vantage. Use it, update code. 
Securly save api key. Show me the result.
```

---

## Prompt 4: Function 1 - Historical Price Comparison
```
Function 1: For given ticker, display currnet price, price 30 days ago -30, price 5 days ko -5.
```

---

## Prompt 5: Function 2 - Fixed Date Prices
```
Good, Functionalit 2: Add price for a ficed dates as price for April 1st 2025, 
October 1st 2025, December 1st 2025.
```

---

## Prompt 6: Dual API Support with Toggle Switch
```
Creata a switch, with two positions one is yfinance  and other Alpha Vantage. 
Based on switch postion, application will geather stock prices from Alpha Vantage of yfinace. 
Build paralel api call for yFinace.
```

---

## Prompt 7: Test Request
```
Test app for "IBM" stocks from Yahoo Finace.
```

---

## Prompt 8: Yahoo Finance Error Report
```
If toggle is on Yahoo Finace, no results are displayed:
Failed to fetch stock data from Yahoo Finance: Failed to fetch"
```

---

## Prompt 9: Fix All 3 Fixed Dates
```
Add to both provider option to show all 3 fixed date prices:
Fixed date prices (April 1, October 1, December 1, 2025)
Now we have onli December 1st.
```

---

## Prompt 10: GitHub Deployment
```
This is version 1.0.
Comit this code to my github. Go step by step. Guide me. 
Check do I have all necesasy app instaled on my machine to perform this action, 
ask all needed information to perfor this task. 
So goal is that on my github account I have one repo where will be placed this application.
```

---

## Summary

Total Prompts: 10 main prompts
Development Time: One session
Result: Complete TypeScript web application with dual API support, deployed to GitHub as v1.0

---

**Created**: February 18, 2026
**Application**: Stock Price Check App v1.0
**Repository**: https://github.com/lazarzlatic/StockPriceCheckApp
