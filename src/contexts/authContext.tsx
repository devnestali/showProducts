import { api } from "@/lib/axios";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  userId: number | undefined
  token: string | undefined
  signIn: (email: string, password: string) => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<number>()
  const [token, setToken] = useState<string>()


  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/session', { email, password })

      const userInfo = {
        id: data.user.id,
        token: data.token
      }

      setUserId(userInfo.id)
      setToken(userInfo.token)
      
      localStorage.setItem('@showProducts@user:id', String(userInfo.id))
      localStorage.setItem('@showProducts@user:token', userInfo.token)

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('@showProducts@user:token')
    const userId = localStorage.getItem('@showProducts@user:id')

    if(token && userId) {
      setToken(token)
      setUserId(Number(userId))

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }

  }, [token, userId])
  
  return (
    <AuthContext.Provider value={{
      signIn,
      userId,
      token
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}