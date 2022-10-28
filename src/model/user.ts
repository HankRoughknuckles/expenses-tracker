/** The location in local storage where all the information for this app is stored */
const LOCAL_STORAGE_KEY = "expenseTracker";

export interface Account {
  email: string;
  password: string;
}

/** Saves the passed accounts into the database */
const setAccounts = (accounts: Account[]): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(accounts));
};

const getAccounts = (): Account[] => {
  const localStorageItem: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (localStorageItem === null) throw new Error("No database available");

  const accounts = JSON.parse(localStorageItem || "[]");
  if (!Array.isArray(accounts)) throw new Error("Database is corrupt");
  return accounts;
};

/** Creates the accounts database if it does not exist */
export const setupAccountDatabase = () => {
  try {
    getAccounts();
  } catch (e) {
    setAccounts([]);
  }
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

export const createAccount = (email: string, password: string): Account => {
  const preExistingAccount = getAccountByEmail(email);
  if (preExistingAccount !== undefined) throw new Error("An account already exists for that email");

  const newAccount = { email, password };
  const newAccountsList = [...getAccounts(), newAccount];
  setAccounts(newAccountsList);

  return newAccount;
};