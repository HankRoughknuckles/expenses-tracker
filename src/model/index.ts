import { v4 as uuid } from "uuid";
import { Account } from "./accounts";
import { Category } from "./categories";
import { Transaction } from "./transactions";

export type DatabaseId = string;
export type Accounts = Account[];
export type Transactions = Transaction[];
export type Categories = Category[];

interface Database {
  accounts: Accounts;
  categories: Categories;
}

const initialState: Database = {
  accounts: [],
  categories: [
    {
      id: uuid(),
      name: "Travel"
    },
    {
      id: uuid(),
      name: "Food"
    }
  ]
};

/** The location in local storage where all the information for this app is stored */
export const LOCAL_STORAGE_KEY = "expenseTracker";

const isDatabaseCorrupt = () => {
  try {
    const localStorageItem: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localStorageItem === null) return true;

    const database = JSON.parse(localStorageItem);
    return (typeof database !== "object" || database === null);
  } catch (e) {
    return true;
  }
};

/** Creates the accounts database if it does not exist */
export const setupDatabase = () => {
  if (isDatabaseCorrupt()) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialState));
  }
};

export const getDatabase = () => {
  if (isDatabaseCorrupt()) {
    throw new Error("Database is corrupt");
  }
  const localStorageItem = localStorage.getItem(LOCAL_STORAGE_KEY);
  return JSON.parse(localStorageItem!);
};

export const setDatabase = (newDatabase: Database) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newDatabase));
};

export const generateId = (): DatabaseId => {
  return uuid();
};