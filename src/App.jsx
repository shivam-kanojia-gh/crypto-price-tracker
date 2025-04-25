import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCryptoData,
  selectFilteredCryptos,
} from "./features/crypto/cryptoSlice";
import CryptoTable from "./components/CryptoTable";
import FilterBar from "./components/FilterBar";
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch();
  const cryptos = useSelector(selectFilteredCryptos);
  const status = useSelector((state) => state.crypto.status);
  const error = useSelector((state) => state.crypto.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCryptoData());
    }
  }, [status, dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <FilterBar />
        {status === "loading" && (
          <div className="text-center py-8 text-lg">Loading...</div>
        )}
        {status === "failed" && (
          <div className="text-center py-8 text-lg text-red-500">
            Error: {error}
          </div>
        )}
        {status === "succeeded" && <CryptoTable cryptos={cryptos} />}
      </main>
    </div>
  );
}

export default App;
