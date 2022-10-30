import { getDatabase, setDatabase, Transactions } from "./index";

export interface Account {
  email: string;
  password: string;
  transactions: Transactions;
}

export interface LoginCredentials {
  email: Account["email"];
  password: Account["password"];
}

/** Saves the passed accounts into the database */
export const setAccounts = (accounts: Account[]): void => {
  setDatabase({
    ...getDatabase(),
    accounts
  });
};

/** Returns all the accounts in the db */
export const getAccounts = (): Account[] => {
  return getDatabase().accounts;
};

/** Returns any account that has the passed email */
const getAccountByEmail = (email: string): Account | undefined => {
  const accounts = getAccounts();
  return accounts.find((account) => account.email === email);
};

/** Checks whether the passed email / password are valid and if so, returns the account the credentials */
export const checkCredentials = (email: string, password: string): Account => {
  const account = getAccountByEmail(email);
  if (account === undefined || account.password !== password) {
    throw new Error("Invalid login, please try again.");
  }

  return account;
};

/** Helper for creating a new account so we have a single source of truth for making the objects */
const newAccountFactory = (email: string, password: string) => {
  return {
    email,
    password,
    transactions: []
  };
};

/** creates an account for the passed email/password and saves it */
export const createAccount = (email: string, password: string): Account => {
    const preExistingAccount = getAccountByEmail(email);
    if (preExistingAccount !== undefined) throw new Error("An account already exists for that email");

    const newAccount = newAccountFactory(email, password);
    const newAccountsList = [...getAccounts(), newAccount];
    setAccounts(newAccountsList);

    return newAccount;
  }
;