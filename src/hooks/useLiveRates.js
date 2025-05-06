import { useState, useEffect, useCallback } from "react";
import { currencies } from "../constants/currencies";

export const useLiveRates = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currencyNames = currencies.reduce((acc, curr) => {
    acc[curr.value] = curr.name;
    return acc;
  }, {});

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.EXCHANGE_RATE_BASE_URL}/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`
      );
      const data = await response.json();

      if (data.result === "success") {
        const ratesArray = Object.entries(data.conversion_rates)
          .map(([code, rate]) => ({
            code,
            name: currencyNames[code] || code,
            rate,
            symbol: currencies.find((c) => c.value === code)?.label || "",
          }))
          .sort((a, b) => a.code.localeCompare(b.code));

        setRates(ratesArray);
      } else {
        throw new Error(data.error || "Failed to fetch rates");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching rates:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, [fetchRates]);

  const refreshRates = () => {
    fetchRates();
  };

  return {
    rates,
    loading,
    error,
    refreshRates,
  };
};
