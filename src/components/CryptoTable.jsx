import { useDispatch, useSelector } from "react-redux";
import { setSortBy } from "../features/crypto/cryptoSlice";
import CryptoRow from "./CryptoRow";

const CryptoTable = ({ cryptos }) => {
  const dispatch = useDispatch();
  const { sortBy, sortDirection } = useSelector((state) => state.crypto);

  const handleSort = (column) => {
    dispatch(
      setSortBy({
        sortBy: column,
        sortDirection:
          sortBy === column && sortDirection === "asc" ? "desc" : "asc",
      })
    );
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
            <th
              className="py-3 px-4 text-center cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("rank")}
            >
              # {getSortIcon("rank")}
            </th>
            <th
              className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("name")}
            >
              Name {getSortIcon("name")}
            </th>
            <th
              className="py-3 px-4 text-right cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("price")}
            >
              Price {getSortIcon("price")}
            </th>
            <th
              className="py-3 px-4 text-right cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("priceChange1h")}
            >
              1h % {getSortIcon("priceChange1h")}
            </th>
            <th
              className="py-3 px-4 text-right cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("priceChange24h")}
            >
              24h % {getSortIcon("priceChange24h")}
            </th>
            <th
              className="py-3 px-4 text-right cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("priceChange7d")}
            >
              7d % {getSortIcon("priceChange7d")}
            </th>
            <th
              className="py-3 px-4 text-right cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("marketCap")}
            >
              Market Cap {getSortIcon("marketCap")}
            </th>
            <th
              className="py-3 px-4 text-right cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("volume")}
            >
              Volume(24h) {getSortIcon("volume")}
            </th>
            <th
              className="py-3 px-4 text-right cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("circulatingSupply")}
            >
              Circulating Supply {getSortIcon("circulatingSupply")}
            </th>
            <th className="py-3 px-4 text-right">Last 7 Days</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {cryptos.map((crypto) => (
            <CryptoRow key={crypto.id} crypto={crypto} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
