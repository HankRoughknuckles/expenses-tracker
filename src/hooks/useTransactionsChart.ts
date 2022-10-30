import { groupBy } from "lodash";
import { useMemo } from "react";
import { Transaction } from "../model/transactions";
import { sumArray } from "../utils/array";
import { dateAsReadable, dateStringAsMs } from "../utils/dates";
import { useTransactions } from "./useTransactions";

interface ChartDatum {
  date: string;
  expenses: number;
  incomes: number;
}

/** Hook that massages the information about transactions to make them easier to put into recharts */
export const useTransactionsChart = () => {
  const { transactions, isExpense } = useTransactions();

  /** Keys are dates, values are transactions that occurred on that date */
  const transactionsByDate: Record<string, Transaction[]> = useMemo(() => (
    groupBy(transactions, (transaction) => transaction.date)
  ), [transactions]);

  /**
   * Returns a list where each element represents a point on the chart.  Each point contains the sum of the expenses for
   * that day as well as the sum of the incomes of that day
   */
  const datesWithExpensesAndIncomes: ChartDatum[] = useMemo(() => {
    const unsortedData = Object.entries(transactionsByDate).map(([dateString, transactions]) => {
      const expenses = transactions.filter(({ value }) => isExpense(value)).map(t => t.value);
      const incomes = transactions.filter(({ value }) => !isExpense(value)).map(t => t.value);
      return {
        date: dateAsReadable(dateString),
        expenses: sumArray(expenses),
        incomes: sumArray(incomes)
      };
    });

    return unsortedData.sort((a, b) => dateStringAsMs(a.date) - dateStringAsMs(b.date));
  }, [isExpense, transactionsByDate]);

  return {
    transactionsByDate,
    datesWithExpensesAndIncomes
  };
};