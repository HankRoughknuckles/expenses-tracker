import { replaceElement } from "../utils/array";
import { checkCredentials, getAccounts, LoginCredentials, setAccounts } from "./accounts";
import { DatabaseId, generateId, Transactions } from "./index";

export interface Transaction {
  id: DatabaseId;
  /** when the expense occurred (should be stored as the start of the day in ISO format) */
  date: string;
  title: string;
  /**
   * How much the expense / income was for.  If negative, then it's
   * an expense.  If positive, then it was an income.
   **/
  value: number;
}

/** Represents a transaction that hasn't been saved to the database yet */
export type UnpersistedTransaction = Omit<Transaction, "id">;

/** Throws if the passed transaction has the wrong information in it */
const validateTransaction = ({ title, date, value }: Partial<Transaction>) => {
  if (date === undefined) throw new Error("Transaction date must not be blank");
  if (title === "" || title === undefined) throw new Error("Transaction title must not be blank");
  if (value === undefined) throw new Error("Transaction value must be a number");
};

/** Sets all transactions for the passed user to be the list passed in */
const setTransactions = ({ email, password }: LoginCredentials, transactions: Transactions): void => {
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

/** returns all transactions for the passed user */
export const getTransactions = ({ email, password }: LoginCredentials): Transactions => {
  const account = checkCredentials(email, password);
  return account.transactions;
};

/** Adds the passed transaction to the list of transactions for the passed user */
export const createTransaction = (loginCredentials: LoginCredentials, transaction: UnpersistedTransaction): Transaction => {
  const account = checkCredentials(loginCredentials.email, loginCredentials.password);
  const transactions = getTransactions(account);

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

/** Whether a transaction with the passed transactionId exists on the passed user */
const doesTransactionExist = (account: LoginCredentials, transactionId: Transaction["id"]): boolean => {
  const transaction =
    getTransactions(account)
    .find(transaction => transaction.id === transactionId);

  return transaction !== undefined;
};

/** Updates the transaction with the passed id for the passed user to have the passed information */
export const updateTransaction = (loginCredentials: LoginCredentials, id: Transaction["id"], updatedTransaction: Transaction): Transaction => {
  const account = checkCredentials(loginCredentials.email, loginCredentials.password);
  validateTransaction(updatedTransaction);
  if (!doesTransactionExist(account, id)) throw new Error("Transaction not found");

  const newList = replaceElement(
    getTransactions(account),
    updatedTransaction,
    (transaction) => transaction.id === id
  );

  setTransactions(account, newList);
  return updatedTransaction;
};

/** Removes the transaction for the user with the passed transaction id from the database */
export const deleteTransaction = (loginCredentials: LoginCredentials, id: Transaction["id"]) => {
  const account = checkCredentials(loginCredentials.email, loginCredentials.password);
  const newList = getTransactions(account).filter(transaction => transaction.id !== id);
  setTransactions(account, newList);
};

