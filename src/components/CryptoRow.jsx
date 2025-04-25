import { memo } from "react";
import MiniChart from "./MiniChart";
import {
  formatCurrency,
  formatLargeNumber,
  formatPercentage,
} from "../utils/formatters";

const CryptoRow = ({ crypto }) => {
  const {
    rank,
    logo,
    name,
    symbol,
    price,
    priceChange1h,
    priceChange24h,
    priceChange7d,
    marketCap,
    volume,
    circulatingSupply,
    chartData,
  } = crypto;

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-3 px-4 text-center">{rank}</td>
      <td className="py-3 px-4">
        <div className="flex items-center">
          <img
            src={logo || "/placeholder.svg"}
            alt={name}
            className="w-6 h-6 rounded-full mr-3"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://cryptoicons.org/api/icon/${symbol.toLowerCase()}/200`;
            }}
          />
          <div>
            <span className="font-medium">{name}</span>
            <span className="text-gray-500 text-xs ml-2">{symbol}</span>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-right">{formatCurrency(price)}</td>
      <td
        className={`py-3 px-4 text-right ${
          priceChange1h >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {formatPercentage(priceChange1h)}
      </td>
      <td
        className={`py-3 px-4 text-right ${
          priceChange24h >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {formatPercentage(priceChange24h)}
      </td>
      <td
        className={`py-3 px-4 text-right ${
          priceChange7d >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {formatPercentage(priceChange7d)}
      </td>
      <td className="py-3 px-4 text-right">{formatLargeNumber(marketCap)}</td>
      <td className="py-3 px-4 text-right">
        <div className="flex flex-col items-end">
          <div>{formatLargeNumber(volume)}</div>
          <div className="text-xs text-gray-500">{symbol}</div>
        </div>
      </td>
      <td className="py-3 px-4 text-right">
        <div className="flex flex-col items-end">
          <div>
            {circulatingSupply}M {symbol}
          </div>
          <div className="w-24 h-1 bg-gray-200 rounded-full mt-1 relative">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
              style={{
                width: `${
                  (circulatingSupply /
                    (crypto.maxSupply || circulatingSupply * 1.5)) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <MiniChart data={chartData} trend={priceChange7d} />
      </td>
    </tr>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(CryptoRow);
