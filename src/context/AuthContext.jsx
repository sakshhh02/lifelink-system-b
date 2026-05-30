import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { demoCredentials } from '../data/mockData';

const STORAGE_KEY = 'lifelink-auth';

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback((email, password) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      setTimeout(() => {
        const normalizedEmail = email.trim().toLowerCase();
        const valid =
          normalizedEmail === demoCredentials.email.toLowerCase() &&
          password === demoCredentials.password;

        if (valid) {
          const nextUser = { ...demoCredentials.user };
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
          setUser(nextUser);
          setIsLoading(false);
          resolve(nextUser);
        } else {
          setIsLoading(false);
          reject(new Error('Invalid email or password.'));
        }
      }, 800);
    });
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
