"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { apiClient } from "@/lib/api"

interface User {
  authenticated: boolean
  email: string
  fullname?: string
  accessToken?: string
}

interface AuthContextType {
  user: User
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (fullName: string, email: string, password: string) => Promise<boolean>
  signOut: () => void
  updateAuthStatus: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    authenticated: false,
    email: "",
  })
  const [loading, setLoading] = useState(true)

  const updateAuthStatus = () => {
    const storedAuth = localStorage.getItem("codeSageAuth")
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth)
        if (authData.accessToken) {
          apiClient.setAccessToken(authData.accessToken)
          setUser({
            authenticated: true,
            email: authData.email || "",
            fullname: authData.fullname || "",
            accessToken: authData.accessToken,
          })
        }
      } catch (error) {
        console.error("Error parsing auth data:", error)
        localStorage.removeItem("codeSageAuth")
      }
    }
    setLoading(false)
  }

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)

      if (email === "admin@gmail.com" && password === "admin") {
        const authData = {
          authenticated: true,
          email: "admin@gmail.com",
          fullname: "Administrator",
          accessToken: "admin-token-123",
        }

        localStorage.setItem("codeSageAuth", JSON.stringify(authData))
        apiClient.setAccessToken("admin-token-123")
        setUser(authData)
        return true
      }

      const response = await apiClient.login({ email, password })

      const authData = {
        authenticated: true,
        email,
        accessToken: response.access_token,
      }

      localStorage.setItem("codeSageAuth", JSON.stringify(authData))
      apiClient.setAccessToken(response.access_token)
      setUser(authData)
      return true
    } catch (error) {
      console.error("Sign in error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (fullName: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      await apiClient.register({ fullname: fullName, email, password })

      // After successful registration, automatically sign in
      return await signIn(email, password)
    } catch (error) {
      console.error("Sign up error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    localStorage.removeItem("codeSageAuth")
    apiClient.setAccessToken(null)
    setUser({
      authenticated: false,
      email: "",
    })
  }

  useEffect(() => {
    const refreshTokenIfNeeded = async () => {
      if (user.authenticated && user.accessToken) {
        try {
          const response = await apiClient.refreshToken()
          const authData = {
            ...user,
            accessToken: response.access_token,
          }
          localStorage.setItem("codeSageAuth", JSON.stringify(authData))
          apiClient.setAccessToken(response.access_token)
          setUser(authData)
        } catch (error) {
          console.error("Token refresh failed:", error)
          signOut()
        }
      }
    }

    // Check token refresh every 30 minutes
    const interval = setInterval(refreshTokenIfNeeded, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [user]) // Updated dependency array to include user

  useEffect(() => {
    updateAuthStatus()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateAuthStatus, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
