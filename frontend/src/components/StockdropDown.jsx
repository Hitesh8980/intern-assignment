import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStocks, setSelectedStock } from '../features/StockSlice';

const StockDropdown = () => {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.stock.stocks);

  useEffect(() => {
    const fetchStocks = async () => {
      const response = await fetch('http://localhost:3000/api/stocks');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      dispatch(setStocks(data));
    };
    fetchStocks();
  }, [dispatch]);

  const handleStockChange = (event) => {
    const stockId = event.target.value;
    dispatch(setSelectedStock(stockId)); 
  };

  return (
    <div className="stock-dropdown-container">
      <label htmlFor="stock-select">Select a stock: </label>
      <select id="stock-select" onChange={handleStockChange}>
        <option value="">Select a stock</option>
        {stocks.map((stock) => (
          <option key={stock.id} value={stock.id}>
            {stock.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StockDropdown;

