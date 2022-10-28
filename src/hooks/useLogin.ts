import { Account, checkCredentials } from "../model/user";
import { useAccountContext } from "./useAccounts";

/**
 * Hook for logging into / out of the app
 */
export const useLogin = () => {
  const { authenticatedAccount, setAuthenticatedAccount, unsetAuthenticatedAccount } = useAccountContext();

  const isUserLoggedIn = authenticatedAccount !== null;

  const login = (email: string, password: string): Account => {
    const account = checkCredentials(email, password);
    setAuthenticatedAccount(account);
    return account;
  };

  const logout = (): void => {
    unsetAuthenticatedAccount();
  };

  return {
    login,
    isUserLoggedIn,
    logout
  };
};