import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

interface BalanceItem {
  id: number;
  month: string;
  description: string;
  amount: number;
  is_investment: boolean;
}

const BalanceChart: React.FC = () => {
  const [data, setData] = useState<{ month: string; amount: number }[]>([]);

  useEffect(() => {
    axios
      .get("/api/balance_items/")
      .then((response) => {
        console.log("API Response:", response.data);
        const items: BalanceItem[] = response.data;

        if (!Array.isArray(items)) {
          console.error("API response is not an array:", items);
          return;
        }

        const groupedData = items.reduce(
          (acc: Record<string, number>, item) => {
            if (!acc[item.month]) {
              acc[item.month] = 0;
            }
            acc[item.month] += item.amount;
            return acc;
          },
          {},
        );

        const chartData = Object.keys(groupedData).map((month) => ({
          month,
          amount: groupedData[month],
        }));

        setData(chartData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BalanceChart;
