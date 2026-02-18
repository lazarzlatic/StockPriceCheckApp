# Release v1.1 - Enhanced User Interface

## What's New

This release focuses on improving the user experience with a redesigned API selector interface.

---

## ✨ Major UI Improvements

**Redesigned API Selector Layout**
- Data Source label now positioned above the toggle switch
- Both API options (Yahoo Finance and Alpha Vantage) are always visible
- Toggle switch positioned in the center between both options
- More intuitive selection experience

**Enhanced Visual Feedback**
- Active API option highlighted in color (Green for Yahoo Finance, Purple for Alpha Vantage)
- Smooth transitions and animations
- Better hover effects
- Professional spacing and layout

---

## 🔧 Technical Changes

- Updated HTML structure for vertical layout
- Enhanced CSS styling with active state indicators
- Simplified TypeScript logic (removed dynamic text updates)
- All business logic and API functionality maintained - no breaking changes

---

## 📊 Features (Unchanged)

All existing features continue to work perfectly:

1. Current Price Display - Real-time stock prices
2. Historical Prices - 5-day and 30-day comparisons
3. Fixed Date Prices - April 1st, October 1st, December 1st, 2025
4. Dual API Support - Yahoo Finance and Alpha Vantage
5. Visual Change Indicators - Green/Red with percentages

---

## 📝 Documentation

- Added UI_UPDATE_CHANGELOG.md - Detailed change log
- Added TEST_REPORT_IREN.md - Comprehensive test results

---

## ✅ Testing

- Tested with IREN ticker
- Yahoo Finance API: ✅ Working
- Alpha Vantage API: ✅ Working
- All 6 price points displayed correctly
- No linter errors
- Clean browser console

---

## 🚀 How to Use

1. Start the development server: `npm run dev`
2. Start the proxy server (for Yahoo Finance): `npm run proxy`
3. Open http://localhost:5174/
4. Select your preferred API by moving the toggle switch
5. Enter a stock ticker and click "Price"

---

## 📦 Files Changed

- index.html - Updated API selector structure
- src/style.css - Enhanced styling
- src/main.ts - Simplified logic
- UI_UPDATE_CHANGELOG.md - New documentation
- TEST_REPORT_IREN.md - New test report

---

## 🔗 Previous Release

- v1.0 - Initial release with dual API support

---

Full Changelog: https://github.com/lazarzlatic/StockPriceCheckApp/compare/v1.0...v1.1
