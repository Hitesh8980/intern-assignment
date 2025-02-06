import { configureStore } from '@reduxjs/toolkit';
import stockReducer from '../features/StockSlice';

const store = configureStore({
  reducer: {
    stock: stockReducer,
  },
});

export default store;
