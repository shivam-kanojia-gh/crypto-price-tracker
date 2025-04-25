// Format currency with appropriate symbol
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value >= 1 ? 2 : 4,
  }).format(value);
};

// Format large numbers with abbreviations (K, M, B, T)
export const formatLargeNumber = (value) => {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
};

// Format percentage with appropriate sign and color
export const formatPercentage = (value) => {
  const sign = value > 0 ? "▲" : value < 0 ? "▼" : "";
  return `${sign} ${Math.abs(value).toFixed(2)}%`;
};
