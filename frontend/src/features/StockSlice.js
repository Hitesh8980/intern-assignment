import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stocks: [],            // List of available stocks
  selectedStocks: [],    // The currently selected stocks
  stockData: {},         // Stock data indexed by stockId
  duration: '5y',        // Default duration
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setStocks: (state, action) => {
      state.stocks = action.payload;
    },
    setSelectedStock: (state, action) => {
      const stockId = action.payload;
      if (!state.selectedStocks.includes(stockId)) {
        state.selectedStocks.push(stockId);
      }
    },
    setStockData: (state, action) => {
      const { stockId, data } = action.payload;
      state.stockData[stockId] = data;  
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
});

export const { setStocks, setSelectedStock, setStockData, setDuration } = stockSlice.actions;

export default stockSlice.reducer;
