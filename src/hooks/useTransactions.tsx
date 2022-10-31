import { useCallback } from "react";
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

  /** Whether the passed value from a transaction is an expense or an income */
  const isExpense = useCallback((value: Transaction["value"]): boolean => {
    return value < 0;
  }, []);

  /** Fetches the list of transactions for the user from the backend */
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

  /** Returns the transaction with the id that belongs to the current user */
  const getTransaction = useCallback((id: Transaction["id"]) => {
    if (authenticatedAccount === null) throw new Error("Cannot create transaction - not logged in");
    return transactions.find(transaction => transaction.id === id);
  }, [authenticatedAccount, transactions]);

  /** Calls the backend to update the transaction with the id to have new information */
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

  /** Calls the backend to delete the transaction with the passed id */
  const deleteTransaction = useCallback((id: Transaction["id"]) => {
    if (authenticatedAccount === null) throw new Error("Cannot delete transaction - not logged in");

    api.deleteTransaction(authenticatedAccount, id);
    setTransactions(transactions => transactions.filter(transaction => transaction.id !== id));
  }, [authenticatedAccount, setTransactions]);

  /** Changes the local state (does not call the backend) to remove the passed categoryId from all the user's transactions */
  const pruneCategoryId = useCallback((id: Category["id"]) => {
    // prune the ids from transactions that reference that category
    setTransactions(transactions =>
      transactions.map(transaction => {
        if (transaction.categoryId === id) return {
          ...transaction,
          categoryId: undefined
        };
        return transaction;
      }));
  }, [setTransactions]);

  return {
    isExpense,
    fetchTransactions,
    transactions,
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    pruneCategoryId
  };
};