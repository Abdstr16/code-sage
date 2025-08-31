"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/hooks/use-auth"

export default function SignupPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match!")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    setIsLoading(true)

    try {
      const success = await signUp(fullName, email, password)
      if (success) {
        router.push("/problems")
      } else {
        setError("Failed to create account. Please try again.")
      }
    } catch (error) {
      setError("An error occurred during sign up")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="signuppagecontainer max-w-md mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSignup} className="signupinfos space-y-6">
          <div className="signupfullnamecontainer">
            <label className="signupfullnamelbl block text-sm font-medium mb-2">Full Name :</label>
            <input
              type="text"
              className="signupfullnametxt w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="signupusercontainer">
            <label className="signupuserlbl block text-sm font-medium mb-2">Email :</label>
            <input
              type="email"
              className="signupusernametxt w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="signuppasscontainer">
            <label className="signuppasslbl block text-sm font-medium mb-2">Password :</label>
            <input
              type="password"
              className="signuppasswordtxt w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>

          <div className="signupconfirmpasscontainer">
            <label className="signupconfirmpasslbl block text-sm font-medium mb-2">Confirm Password :</label>
            <input
              type="password"
              className="signupconfirmpasswordtxt w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="signinupcontainer flex gap-4">
            <button
              type="submit"
              className="signuppagesignupbtn flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
            <Link href="/auth/signin" className="flex-1">
              <button
                type="button"
                className="signuppagesigninbtn w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                disabled={isLoading}
              >
                Existing account?
              </button>
            </Link>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
