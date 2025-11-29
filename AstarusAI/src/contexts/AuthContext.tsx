import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token on mount
    const storedUser = localStorage.getItem("astarus_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("astarus_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Replace with actual API call
    // For now, simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Mock authentication - in production, this would call your backend
    const mockUser: User = {
      id: crypto.randomUUID(),
      email,
      name: email.split("@")[0],
    };
    
    setUser(mockUser);
    localStorage.setItem("astarus_user", JSON.stringify(mockUser));
  };

  const signup = async (email: string, password: string, name?: string) => {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: crypto.randomUUID(),
      email,
      name: name || email.split("@")[0],
    };
    
    setUser(mockUser);
    localStorage.setItem("astarus_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("astarus_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

