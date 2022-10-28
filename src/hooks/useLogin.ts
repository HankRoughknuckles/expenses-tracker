import * as api from "../api";
import { Account } from "../model/accounts";
import { useAccountContext } from "./useAccounts";

/**
 * Hook for logging into / out of the app
 */
export const useLogin = () => {
  const { authenticatedAccount, setAuthenticatedAccount, unsetAuthenticatedAccount } = useAccountContext();

  const isUserLoggedIn = authenticatedAccount !== null;

  const login = (email: string, password: string): Account => {
    const account = api.login(email, password);
    setAuthenticatedAccount(account);
    return account;
  };

  const logout = (): void => {
    unsetAuthenticatedAccount();
  };

  const createAccount = (email: string, password: string): void => {
    api.createAccount(email, password);
  };

  return {
    login,
    isUserLoggedIn,
    logout,
    createAccount
  };
};