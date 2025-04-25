import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchInitialData,
  simulateWebSocketUpdates,
} from "../../services/cryptoService";

// Async thunk for fetching initial crypto data
export const fetchCryptoData = createAsyncThunk(
  "crypto/fetchCryptoData",
  async () => {
    const data = await fetchInitialData();
    // Start simulating real-time updates after initial fetch
    simulateWebSocketUpdates((store) => {
      store.dispatch(updateCryptoData());
    });
    return data;
  }
);

const initialState = {
  cryptos: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filter: "all", // 'all' | 'gainers' | 'losers'
  sortBy: "rank", // 'rank' | 'name' | 'price' | 'marketCap' | etc.
  sortDirection: "asc", // 'asc' | 'desc'
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateCryptoData: (state) => {
      // This will be called by our simulated WebSocket
      // The actual update logic is in the cryptoService
      // We'll just mark that we've received an update
      state.lastUpdated = Date.now();
    },
    updateCrypto: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.cryptos.findIndex((crypto) => crypto.id === id);
      if (index !== -1) {
        state.cryptos[index] = { ...state.cryptos[index], ...updates };
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      const { sortBy, sortDirection } = action.payload;
      state.sortBy = sortBy;
      state.sortDirection = sortDirection;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cryptos = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { updateCryptoData, updateCrypto, setFilter, setSortBy } =
  cryptoSlice.actions;

// Selectors
export const selectAllCryptos = (state) => state.crypto.cryptos;

export const selectFilteredCryptos = (state) => {
  const { cryptos, filter, sortBy, sortDirection } = state.crypto;

  // Apply filters based on 24h % change
  let filteredCryptos = [...cryptos];
  if (filter === "gainers") {
    filteredCryptos = filteredCryptos.filter(
      (crypto) => crypto.priceChange24h > 0
    );
  } else if (filter === "losers") {
    filteredCryptos = filteredCryptos.filter(
      (crypto) => crypto.priceChange24h < 0
    );
  }

  // Apply sorting
  filteredCryptos.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "price":
        comparison = a.price - b.price;
        break;
      case "priceChange1h":
        comparison = a.priceChange1h - b.priceChange1h;
        break;
      case "priceChange24h":
        comparison = a.priceChange24h - b.priceChange24h;
        break;
      case "priceChange7d":
        comparison = a.priceChange7d - b.priceChange7d;
        break;
      case "marketCap":
        comparison = a.marketCap - b.marketCap;
        break;
      case "volume":
        comparison = a.volume - b.volume;
        break;
      default: // rank
        comparison = a.rank - b.rank;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  return filteredCryptos;
};

export default cryptoSlice.reducer;
