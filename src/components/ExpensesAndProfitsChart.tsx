import React, { FunctionComponent } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { useTransactionsChart } from "../hooks/useTransactionsChart";

export const ExpensesAndProfitsChart: FunctionComponent = () => {
  const { datesWithExpensesAndIncomes } = useTransactionsChart();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3>Incomes and Expenses by day</h3>
      <BarChart width={730} height={300} data={datesWithExpensesAndIncomes}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="expenses" fill="#C23F38" />
        <Bar dataKey="incomes" fill="#45783B" />
      </BarChart>
    </div>
  );
};