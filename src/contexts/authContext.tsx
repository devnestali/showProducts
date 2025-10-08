import React, { createContext, useContext, useEffect, useState } from "react";
import cookies from "js-cookie";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

type AuthContextType = {
  token: string | undefined;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true);

      const { data } = await api.post("/session", { email, password });

      const userInfo = {
        id: data.user.id,
        token: data.token,
        isAdmin: data.user.isAdmin,
      };

      setToken(userInfo.token);
      setIsAdmin(userInfo.isAdmin);

      cookies.set("userId", String(userInfo.id));
      localStorage.setItem("@showProducts@user:token", userInfo.token);
      localStorage.setItem("@showProducts@user:isAdmin", JSON.stringify(userInfo.isAdmin));

      api.defaults.headers.common["Authorization"] = `Bearer ${userInfo.token}`;

    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
      } else {
        return alert('Erro desconhecido. Entre em contato com o desenvolvedor.')
      }

    } finally {
      setIsLoading(false);

    }
  }

  function signOut() {
    cookies.remove("userId")
    localStorage.clear()
    delete api.defaults.headers.common["Authorization"]
    
    setToken('')
    setIsAdmin(false)

    setIsLoading(false)
  }

  useEffect(() => {
    const token = localStorage.getItem("@showProducts@user:token");
    const userId = cookies.get("userId");
    const isAdmin = localStorage.getItem("@showProducts@user:isAdmin");

    if (token && userId && isAdmin) {
      setToken(token);
      setIsAdmin(JSON.parse(isAdmin));
      
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      signIn,
      signOut, 
      isAdmin, 
      token, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}