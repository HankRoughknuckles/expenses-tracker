import { useCallback, useMemo } from "react";
import * as api from "../api";
import { Category } from "../model/categories";
import { Transaction, UnpersistedTransaction } from "../model/transactions";
import { replaceElement } from "../utils/array";
import { useAccountContext } from "./useAccounts";

/**
 * Hook responsible for managing the react state for the list of transactions for a user.  Also for interacting with
 * the backend
 */
export const useTransactions = () => {
  const { authenticatedAccount, transactions, setTransactions } = useAccountContext();

  const isExpense = useCallback((value: Transaction["value"]): boolean => {
    return value < 0;
  }, []);

  const expenses = useMemo(() => (
      transactions.filter(({ value }) => isExpense(value))
    ),
    [isExpense, transactions]);

  const incomes = useMemo(() => (
      transactions.filter(({ value }) => !isExpense(value))
    ),
    [isExpense, transactions]);

  const fetchTransactions = useCallback((): void => {
    if (authenticatedAccount === null) throw new Error("Cannot create transaction - not logged in");
    const transactions = api.getTransactions(authenticatedAccount);
    setTransactions(transactions);
  }, [authenticatedAccount, setTransactions]);

  /**
   * Attempts to save a new transaction on the backend.  Updates the local state with the persisted transaction if
   * successful
   */
  const createTransaction = useCallback((transaction: UnpersistedTransaction): Transaction => {
    if (authenticatedAccount === null) throw new Error("Cannot create transaction - not logged in");

    const savedTransaction = api.createTransaction(authenticatedAccount, transaction);
    setTransactions((transactions) => [...transactions, savedTransaction]);

    return savedTransaction;
  }, [authenticatedAccount, setTransactions]);

  const getTransaction = useCallback((id: Transaction["id"]) => {
    if (authenticatedAccount === null) throw new Error("Cannot create transaction - not logged in");
    return transactions.find(transaction => transaction.id === id);
  }, [authenticatedAccount, transactions]);

  const updateTransaction = useCallback((id: Transaction["id"], transaction: Transaction) => {
    if (authenticatedAccount === null) throw new Error("Cannot create transaction - not logged in");
    const updatedTransaction = api.updateTransaction(authenticatedAccount, id, transaction);

    setTransactions(transactions =>
      replaceElement(
        transactions,
        updatedTransaction,
        (transaction) => transaction.id === id
      ));
  }, [authenticatedAccount, setTransactions]);

  const deleteTransaction = useCallback((id: Category["id"]) => {
    if (authenticatedAccount === null) throw new Error("Cannot delete transaction - not logged in");

    api.deleteTransaction(authenticatedAccount, id);
    setTransactions(transactions => transactions.filter(transaction => transaction.id !== id));
  }, [authenticatedAccount, setTransactions]);

  return {
    isExpense,
    expenses,
    incomes,
    fetchTransactions,
    transactions,
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction
  };
};