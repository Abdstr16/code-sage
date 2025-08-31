"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/hooks/use-auth"

export default function SigninPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await signIn(email, password)
      if (success) {
        router.push("/problems")
      } else {
        setError("Invalid email or password")
      }
    } catch (error) {
      setError("An error occurred during sign in")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignin = () => {
    // TODO: Implement Google signin with backend integration
    console.log("Google signin attempt")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="signinpagecontainer max-w-md mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">USER SIGN IN</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSignin} className="signinusernamepassword space-y-6">
          <div className="signinusercontainer">
            <label htmlFor="signinemail" className="signinuserlbl block text-sm font-medium mb-2">
              Email :
            </label>
            <input
              type="email"
              className="usernametxt w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              id="signinemail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="signinpasscontainer">
            <label htmlFor="signinpassword" className="signinpasslbl block text-sm font-medium mb-2">
              Password :
            </label>
            <input
              type="password"
              className="passwordtxt w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              id="signinpassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="signinupcontainer flex gap-4">
            <button
              type="submit"
              className="signinpagebtn flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            <Link href="/auth/signup" className="flex-1">
              <button
                type="button"
                className="signupbtn w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                disabled={isLoading}
              >
                Sign Up
              </button>
            </Link>
          </div>
        </form>

        <Link
          href="/auth/forgot-password"
          className="forgetpassworda block text-center text-blue-600 hover:text-blue-800 mt-4"
        >
          Forget password
        </Link>

        <div className="divider flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">Or continue with</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleSignin}
          className="googlesigninbtn w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
          disabled={isLoading}
        >
          <svg className="googleicon w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>

      <Footer />
    </div>
  )
}
