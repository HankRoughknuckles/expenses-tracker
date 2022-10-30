import { useCallback } from "react";
import * as api from "../api";
import { Category } from "../model/categories";
import { Transaction, UnpersistedTransaction } from "../model/transactions";
import { replaceElement } from "../utils/array";
import { useAccountContext } from "./useAccounts";

export const useTransactions = () => {
  const { authenticatedAccount, transactions, setTransactions } = useAccountContext();

  const fetchTransactions = useCallback((): void => {
    if (authenticatedAccount === null) throw new Error("Cannot create transaction - not logged in");
    const transactions = api.getTransactions(
      authenticatedAccount.email,
      authenticatedAccount.password
    );
    setTransactions(transactions);
  }, [authenticatedAccount, setTransactions]);

  /**
   * Attempts to save a new transaction on the backend.  Updates the local state with the persisted transaction if
   * successful
   */
  const createTransaction = useCallback((transaction: UnpersistedTransaction): Transaction => {
    if (authenticatedAccount === null) throw new Error("Cannot create transaction - not logged in");

    const savedTransaction = api.createTransaction(authenticatedAccount.email, authenticatedAccount.password, transaction);
    setTransactions((transactions) => [...transactions, savedTransaction]);

    return savedTransaction;
  }, [authenticatedAccount, setTransactions]);

  const getTransaction = useCallback((id: Transaction["id"]) => {
    if (authenticatedAccount === null) throw new Error("Cannot create transaction - not logged in");
    return transactions.find(transaction => transaction.id === id);
  }, [authenticatedAccount, transactions]);

  const updateTransaction = useCallback((id: Transaction["id"], transaction: Transaction) => {
    if (authenticatedAccount === null) throw new Error("Cannot create transaction - not logged in");
    const updatedTransaction = api.updateTransaction(
      authenticatedAccount.email,
      authenticatedAccount.password,
      id,
      transaction
    );

    setTransactions(transactions =>
      replaceElement(
        transactions,
        updatedTransaction,
        (transaction) => transaction.id === id
      ));
  }, [authenticatedAccount, setTransactions]);

  const deleteTransaction = useCallback((id: Category["id"]) => {
    if (authenticatedAccount === null) throw new Error("Cannot delete transaction - not logged in");

    api.deleteTransaction(
      authenticatedAccount.email,
      authenticatedAccount.password,
      id
    );
    setTransactions(transactions => transactions.filter(transaction => transaction.id !== id));
  }, [authenticatedAccount, setTransactions]);

  return {
    fetchTransactions,
    transactions,
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction
  };
};