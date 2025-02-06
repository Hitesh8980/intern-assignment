import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStockData } from "../features/StockSlice"; 
import { Line } from "react-chartjs-2"; 
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const StockGraph = () => {
  const dispatch = useDispatch();
  const selectedStocks = useSelector((state) => state.stock.selectedStocks); 
  const stockData = useSelector((state) => state.stock.stockData) || {}; 
  const duration = useSelector((state) => state.stock.duration);

  useEffect(() => {
    selectedStocks.forEach((stockId) => {
      if (stockId && duration) {
        const fetchStockData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/api/stocks/${stockId}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ duration }),
            });

            const Data = await response.json();
            // console.log("Stock Data Response:", Data);

            if (Array.isArray(Data.data)) {
              dispatch(setStockData({ stockId, data: Data.data }));
            } else {
              console.error("Unexpected stock data format:", Data);
              dispatch(setStockData({ stockId, data: [] }));
            }
          } catch (error) {
            console.error("Error fetching stock data:", error);
            dispatch(setStockData({ stockId, data: [] }));
          }
        };
        fetchStockData();
      }
    });
  }, [selectedStocks, duration, dispatch]);

  if (!selectedStocks.length) return <p>Select at least one stock to view graphs.</p>;

  return (
    <div>
      {selectedStocks.map((stockId) => {
        const data = stockData[stockId];

        if (!data || data.length === 0) {
          return <p key={stockId}>No data available for stock {stockId}.</p>;
        }

        const chartData = {
          labels: data.map((entry) => entry.timestamp),
          datasets: [
            {
              label: `Stock Price (${stockId})`,
              data: data.map((entry) => entry.price),
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              tension: 0.3,
              pointRadius: 1,
              pointBackgroundColor: 'white',
              pointBorderColor: 'rgba(75, 192, 192, 1)',
            },
          ],
        };

        return <Line key={stockId} data={chartData} />;
      })}
    </div>
  );
};

export default StockGraph;
