export const API_CONFIG = {
  baseUrl: process.env.EXCHANGE_RATE_BASE_URL,
  apiKey: process.env.EXCHANGE_RATE_API_KEY,
  getExchangeRateUrl: (currency = 'USD') => 
    `${process.env.EXCHANGE_RATE_BASE_URL}/${process.env.EXCHANGE_RATE_API_KEY}/latest/${currency}`
};