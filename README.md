# Crypto Price Tracker

Real-time cryptocurrency price tracking application with interactive charts and filtering capabilities.

## Setup Instructions

To set up and run the project locally:

1. **Clone the repository**:
```
git clone <repository-url>
cd crypto-price-tracker
```

2. **Install dependencies**:
```
npm install
```

3. **Start the development server**:
```
npm start
```

4. **Open in browser**: The app will be available at `http://localhost:5173`

## Tech Stack & Architecture

### Tech Stack
* **React**: UI library
* **Redux Toolkit**: State management
* **CSS**: Styling (with responsive design)
* **HTML Canvas**: For mini charts

### Architecture
1. **Redux Store**:
   * Single source of truth for all application state
   * Crypto data, filters, and sorting preferences
2. **Components**:
   * `App.js`: Main component that renders the application
   * `CryptoTable.js`: Renders the table of cryptocurrencies
   * `CryptoRow.js`: Individual row for each cryptocurrency
   * `MiniChart.js`: Canvas-based chart for 7-day price history
   * `FilterBar.js`: UI for filtering cryptocurrencies
   * `Header.js`: Application header
3. **Services**:
   * `cryptoService.js`: Handles data fetching and WebSocket simulation
4. **Utils**:
   * `formatters.js`: Utility functions for formatting numbers, currencies, etc.

## Demo

For a full demonstration of the application's features, check out our [demo video](https://www.loom.com/share/95a5bc7f7e954128abc7d81525346d47?sid=a738ba35-79d9-44a1-a027-45e2b1e90672).
