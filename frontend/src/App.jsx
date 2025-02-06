import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import StockDropdown from './components/StockdropDown';
import StockGraph from './components/Stockgraph';
import './index.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="app-container">
        <h1 className="app-title">Stock Dashboard</h1>
        <StockDropdown />
        <StockGraph />
      </div>
    </Provider>
  );
};

export default App;
