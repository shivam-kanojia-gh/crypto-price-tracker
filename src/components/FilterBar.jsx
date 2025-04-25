import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/crypto/cryptoSlice";

const FilterBar = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.crypto.filter);

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  return (
    <div className="flex items-center mb-6 pb-2 border-b border-gray-200">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentFilter === "all"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          All Cryptocurrencies
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentFilter === "gainers"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => handleFilterChange("gainers")}
        >
          Top Gainers
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentFilter === "losers"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => handleFilterChange("losers")}
        >
          Top Losers
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
