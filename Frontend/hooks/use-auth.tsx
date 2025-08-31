"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"

interface User {
  authenticated: boolean
  username: string
  password: string
}

interface AuthContextType {
  user: User
  signIn: (username: string, password: string) => Promise<boolean>
  signUp: (fullName: string, username: string, password: string) => Promise<boolean>
  signOut: () => void
  updateAuthStatus: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    authenticated: false,
    username: "",
    password: "",
  })

  const updateAuthStatus = () => {
    const storedAuth = localStorage.getItem("codeSageAuth")
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth)
        setUser({
          authenticated: authData.authenticated || false,
          username: authData.username || "",
          password: authData.password || "",
        })
      } catch (error) {
        console.error("Error parsing auth data:", error)
        localStorage.removeItem("codeSageAuth")
      }
    }
  }

  const signIn = async (username: string, password: string): Promise<boolean> => {
    // Simulate authentication - replace with real API call
    if (username && password) {
      const authData = {
        authenticated: true,
        username,
        password,
      }
      localStorage.setItem("codeSageAuth", JSON.stringify(authData))
      setUser(authData)
      return true
    }
    return false
  }

  const signUp = async (fullName: string, username: string, password: string): Promise<boolean> => {
    // Simulate registration - replace with real API call
    if (fullName && username && password) {
      const authData = {
        authenticated: true,
        username,
        password,
      }
      localStorage.setItem("codeSageAuth", JSON.stringify(authData))
      setUser(authData)
      return true
    }
    return false
  }

  const signOut = () => {
    localStorage.removeItem("codeSageAuth")
    setUser({
      authenticated: false,
      username: "",
      password: "",
    })
  }

  useEffect(() => {
    updateAuthStatus()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateAuthStatus }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
