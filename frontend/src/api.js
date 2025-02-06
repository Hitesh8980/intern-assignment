export const fetchStocks = async () => {
    const response = await fetch('http://localhost:3000/api/stocks');
    return await response.json();
  };
  
  export const fetchStockData = async (stockId) => {
    const response = await fetch(`http://localhost:3000/api/stocks/${stockId}`);
    return await response.json();
  };
  