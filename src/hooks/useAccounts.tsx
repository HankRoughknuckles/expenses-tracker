import { createContext, FunctionComponent, PropsWithChildren, useContext, useState } from "react";
import { Categories, Transactions } from "../model";
import { Account } from "../model/accounts";

const initialState = {
  authenticatedAccount: null,
  setAuthenticatedAccount: () => undefined,
  unsetAuthenticatedAccount: () => undefined,
  isUserLoggedIn: false,
  categories: [],
  setCategories: () => undefined,
  transactions: [],
  setTransactions: () => undefined
};

/** Hook for storing the information of the currently authenticated user */
export const _useAccountState = () => {
  const [authenticatedAccount, setAuthenticatedAccount] = useState<Account | null>(null);
  const [categories, setCategories] = useState<Categories>([]);
  const [transactions, setTransactions] = useState<Transactions>([]);

  const unsetAuthenticatedAccount = () => {
    setAuthenticatedAccount(null);
  };

  return {
    authenticatedAccount,
    setAuthenticatedAccount,
    unsetAuthenticatedAccount,
    categories,
    setCategories,
    transactions,
    setTransactions
  };
};

const AccountContext = createContext<ReturnType<typeof _useAccountState>>(initialState);

/**
 * Provider that makes the account state getters and setters available
 * to any components nested below it.
 */
export const AccountContextProvider: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  const accountState = _useAccountState();
  return <AccountContext.Provider value={accountState}> {children} </AccountContext.Provider>;
};

/** Hook for accessing the accountState through the context api */
export const useAccountContext = () => useContext(AccountContext);
