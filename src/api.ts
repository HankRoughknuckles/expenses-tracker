import { Transactions } from "./model";
import * as accountsModel from "./model/accounts";
import { Account, LoginCredentials } from "./model/accounts";
import * as categoriesModel from "./model/categories";
import { Category } from "./model/categories";
import * as transactionsModel from "./model/transactions";
import { Transaction, UnpersistedTransaction } from "./model/transactions";

/**
 * This file mimics what would be if we had a real backend - holds the functions that make the requests to get
 * information from the backend
 */

export const login = (email: string, password: string): Account => {
  return accountsModel.checkCredentials(email, password);
};

export const createAccount = (email: string, password: string): Account => {
  return accountsModel.createAccount(email, password);
};

export const getTransactions = (loginCredentials: LoginCredentials): Transactions => {
  return transactionsModel.getTransactions(loginCredentials);
};

export const createTransaction = (loginCredentials: LoginCredentials, transaction: UnpersistedTransaction): Transaction => {
  return transactionsModel.createTransaction(loginCredentials, transaction);
};

export const updateTransaction = (loginCredentials: LoginCredentials, transactionId: Transaction["id"], transaction: Transaction) => {
  return transactionsModel.updateTransaction(loginCredentials, transactionId, transaction);
};

export const deleteTransaction = (loginCredentials: LoginCredentials, transactionId: Transaction["id"]) => {
  return transactionsModel.deleteTransaction(loginCredentials, transactionId);
};

export const createCategory = (name: string): Category => {
  return categoriesModel.createCategory(name);
};

export const getCategories = () => {
  return categoriesModel.getCategories();
};

export const deleteCategory = (categoryId: Category["id"]) => {
  return categoriesModel.deleteCategory(categoryId);
};

export const updateCategory = (categoryId: Category["id"], name: Category["name"]) => {
  return categoriesModel.updateCategory(categoryId, name);
};
