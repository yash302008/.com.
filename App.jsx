import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as tf from "tfjs";
import "./App.css";

export default function App() {
  const [symbol, setSymbol] = useState("AAPL");
  const [stockData, setStockData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);

  const fetchStockData = async () => {
    const API_KEY = "demo"; // Replace with your Alpha Vantage API key
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const timeseries = data["Time Series (Daily)"];
    if (!timeseries) return;

    const parsedData = Object.entries(timeseries).map(([date, values]) => ({
      date,
      close: parseFloat(values["4. close"]),
    }));

    const sorted = parsedData.reverse().slice(-60);
    setStockData(sorted);
    runPrediction(sorted.map((d) => d.close));
  };

  const runPrediction = async (prices) => {
    const inputs = prices.slice(-30);
    const normalized = inputs.map((v) => v / prices[0]);
    const inputTensor = tf.tensor2d([normalized], [1, 30]);

    const model = await tf.loadLayersModel("https://storage.googleapis.com/tfjs-models/tfjs/lstm-stock/model.json");
    const prediction = model.predict(inputTensor);

    const futurePrices = await prediction.data();
    const denormalized = Array.from(futurePrices).map((v) => v * prices[0]);
    setPredictedData(denormalized);
  };

  useEffect(() => {
    fetchStockData();
  }, [symbol]);

  const chartData = {
    labels: stockData.map((d) => d.date).concat(
      predictedData.map((_, i) => `Predicted +${i + 1}`)
    ),
    datasets: [
      {
        label: "Real Prices",
        data: stockData.map((d) => d.close),
        borderColor: "#4F46E5",
        fill: false,
      },
      {
        label: "Predicted",
        data: new Array(stockData.length).fill(null).concat(predictedData),
        borderColor: "#F97316",
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        AI STOCK PREDICTOR
      </h1>
      <div className="max-w-xl mx-auto mb-4">
        <Input
          placeholder="Enter stock symbol (e.g., AAPL, TSLA)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        />
      </div>
      <Card className="max-w-4xl mx-auto shadow-xl">
        <CardContent>
          <Line data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}
