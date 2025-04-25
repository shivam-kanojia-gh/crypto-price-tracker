import { updateCrypto } from "../features/crypto/cryptoSlice";
import { store } from "../app/store";

// Sample crypto data
const initialCryptoData = [
  {
    id: "bitcoin",
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    price: 93759.48,
    priceChange1h: 0.43,
    priceChange24h: 0.93,
    priceChange7d: 11.11,
    marketCap: 1861618902186,
    volume: 43874950947,
    circulatingSupply: 19.85,
    maxSupply: 21,
    chartData: generateChartData(11.11),
  },
  {
    id: "ethereum",
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    price: 1802.46,
    priceChange1h: 0.6,
    priceChange24h: 3.21,
    priceChange7d: 13.68,
    marketCap: 217581279327,
    volume: 23547469307,
    circulatingSupply: 120.71,
    maxSupply: null,
    chartData: generateChartData(13.68),
  },
  {
    id: "tether",
    rank: 3,
    name: "Tether",
    symbol: "USDT",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    price: 1.0,
    priceChange1h: 0.0,
    priceChange24h: 0.0,
    priceChange7d: 0.04,
    marketCap: 145320022085,
    volume: 92288882007,
    circulatingSupply: 145.27,
    maxSupply: null,
    chartData: generateChartData(0.04),
  },
  {
    id: "xrp",
    rank: 4,
    name: "XRP",
    symbol: "XRP",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
    price: 2.22,
    priceChange1h: 0.46,
    priceChange24h: 0.54,
    priceChange7d: 6.18,
    marketCap: 130073814966,
    volume: 5131481491,
    circulatingSupply: 58.39,
    maxSupply: 100,
    chartData: generateChartData(6.18),
  },
  {
    id: "bnb",
    rank: 5,
    name: "BNB",
    symbol: "BNB",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
    price: 606.65,
    priceChange1h: 0.09,
    priceChange24h: -1.2,
    priceChange7d: 3.73,
    marketCap: 85471956947,
    volume: 1874281784,
    circulatingSupply: 140.89,
    maxSupply: 200,
    chartData: generateChartData(3.73),
  },
  {
    id: "solana",
    rank: 6,
    name: "Solana",
    symbol: "SOL",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
    price: 151.51,
    priceChange1h: 0.53,
    priceChange24h: 1.26,
    priceChange7d: 14.74,
    marketCap: 78381958631,
    volume: 4881674486,
    circulatingSupply: 517.31,
    maxSupply: null,
    chartData: generateChartData(14.74),
  },
];

// Generate sample chart data based on 7d trend
function generateChartData(trend) {
  const data = [];
  let value = 100;

  for (let i = 0; i < 7; i++) {
    // Create some random fluctuation that generally follows the trend
    const change = (Math.random() - 0.5) * 5 + trend / 7;
    value = value * (1 + change / 100);
    data.push(value);
  }

  return data;
}

// Simulate fetching initial data
export const fetchInitialData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialCryptoData);
    }, 1000);
  });
};

// WebSocket simulator class
class WebSocketSimulator {
  constructor(callback) {
    this.callback = callback;
    this.interval = null;
  }

  connect() {
    this.interval = setInterval(() => {
      this.callback();
    }, 1500); // Update every 1.5 seconds
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

// Simulate WebSocket updates
export const simulateWebSocketUpdates = (callback) => {
  const socket = new WebSocketSimulator(() => {
    // Get current cryptos from store
    const cryptos = store.getState().crypto.cryptos;

    // Randomly select 1-3 cryptos to update
    const numUpdates = Math.floor(Math.random() * 3) + 1;
    const indices = new Set();

    while (indices.size < numUpdates) {
      indices.add(Math.floor(Math.random() * cryptos.length));
    }

    // Update each selected crypto
    indices.forEach((index) => {
      const crypto = cryptos[index];

      // Generate random price change (-2% to +2%)
      const priceChange = (Math.random() * 4 - 2) / 100;
      const newPrice = crypto.price * (1 + priceChange);

      // Update price changes
      const newPriceChange1h =
        crypto.priceChange1h + (Math.random() * 0.4 - 0.2);
      const newPriceChange24h =
        crypto.priceChange24h + (Math.random() * 0.6 - 0.3);
      const newPriceChange7d =
        crypto.priceChange7d + (Math.random() * 0.2 - 0.1);

      // Update volume (±5%)
      const volumeChange = (Math.random() * 10 - 5) / 100;
      const newVolume = crypto.volume * (1 + volumeChange);

      // Dispatch update action
      store.dispatch(
        updateCrypto({
          id: crypto.id,
          updates: {
            price: Number.parseFloat(newPrice.toFixed(2)),
            priceChange1h: Number.parseFloat(newPriceChange1h.toFixed(2)),
            priceChange24h: Number.parseFloat(newPriceChange24h.toFixed(2)),
            priceChange7d: Number.parseFloat(newPriceChange7d.toFixed(2)),
            volume: Math.round(newVolume),
            // Update chart data
            chartData: [
              ...crypto.chartData.slice(1),
              crypto.chartData[6] * (1 + priceChange),
            ],
          },
        })
      );
    });

    callback(store);
  });

  socket.connect();
  return socket;
};
