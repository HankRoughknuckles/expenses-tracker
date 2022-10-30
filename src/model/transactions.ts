import { replaceElement } from "../utils/array";
import { isValidNumberString } from "../utils/string";
import { Account, checkCredentials, getAccounts, setAccounts } from "./accounts";
import { DatabaseId, generateId, Transactions } from "./index";

export interface Transaction {
  id: DatabaseId;
  /** when the expense occurred (in ms since epoch) */
  date: number;
  title: string;
  /**
   * How much the expense / income was for.  If negative, then it's
   * an expense.  If positive, then it was an income.
   **/
  value: string;
}

const validateTransaction = ({ title, date, value }: Partial<Transaction>) => {
  if (date === undefined) throw new Error("Transaction date must not be blank");
  if (title === "" || title === undefined) throw new Error("Transaction title must not be blank");
  if (value === "" || value === undefined || !isValidNumberString(value)) throw new Error("Transaction value must be a number string");
};


export type UnpersistedTransaction = Omit<Transaction, "id">;

const setTransactions = ({ email, password }: Account, transactions: Transactions): void => {
  const accounts = getAccounts().map(account => {
    if (account.email === email && account.password === password) {
      return {
        ...account,
        transactions
      };
    }
    return account;
  });
  setAccounts(accounts);
};

export const getTransactions = (email: string, password: string): Transactions => {
  const account = checkCredentials(email, password);
  return account.transactions;
};

export const createTransaction = (email: string, password: string, transaction: UnpersistedTransaction): Transaction => {
  const account = checkCredentials(email, password);
  const transactions = getTransactions(email, password);

  const newTransaction = {
    id: generateId(),
    date: transaction.date,
    title: transaction.title,
    value: transaction.value
  };

  setTransactions(account, [
    ...transactions,
    newTransaction
  ]);

  return newTransaction;
};

const doesTransactionExist = (account: Account, transactionId: Transaction["id"]): boolean => {
  const transaction =
    getTransactions(account.email, account.password)
    .find(transaction => transaction.id === transactionId);

  return transaction !== undefined;
};

export const updateTransaction = (email: string, password: string, id: Transaction["id"], updatedTransaction: Transaction): Transaction => {
  const account = checkCredentials(email, password);
  validateTransaction(updatedTransaction);
  if (!doesTransactionExist(account, id)) throw new Error("Transaction not found");

  const newList = replaceElement(
    getTransactions(email, password),
    updatedTransaction,
    (transaction) => transaction.id === id
  );

  setTransactions(account, newList);
  return updatedTransaction;
};

export const deleteTransaction = (email: string, password: string, id: Transaction["id"]) => {
  const account = checkCredentials(email, password);
  const newList = getTransactions(email, password).filter(transaction => transaction.id !== id);
  setTransactions(account, newList);
};

