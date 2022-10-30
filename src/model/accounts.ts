import { getDatabase, setDatabase, Transactions } from "./index";

export interface Account {
  email: string;
  password: string;
  transactions: Transactions;
}

/** Saves the passed accounts into the database */
export const setAccounts = (accounts: Account[]): void => {
  setDatabase({
    ...getDatabase(),
    accounts
  });
};

export const getAccounts = (): Account[] => {
  return getDatabase().accounts;
};

const getAccountByEmail = (email: string): Account | undefined => {
  const accounts = getAccounts();
  return accounts.find((account) => account.email === email);
};

export const checkCredentials = (email: string, password: string): Account => {
  const account = getAccountByEmail(email);
  if (account === undefined || account.password !== password) {
    throw new Error("Invalid login, please try again.");
  }

  return account;
};

const newAccountFactory = (email: string, password: string) => {
  return {
    email,
    password,
    transactions: []
  };
};

export const createAccount = (email: string, password: string): Account => {
    const preExistingAccount = getAccountByEmail(email);
    if (preExistingAccount !== undefined) throw new Error("An account already exists for that email");

    const newAccount = newAccountFactory(email, password);
    const newAccountsList = [...getAccounts(), newAccount];
    setAccounts(newAccountsList);

    return newAccount;
  }
;