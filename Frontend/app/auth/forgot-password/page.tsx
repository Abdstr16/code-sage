"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement password reset logic
    console.log("Password reset request for:", email)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="forgotpasswordcontainer max-w-md mx-auto py-16 px-4">
        <h1 className="forgotpasswordtitle text-3xl font-bold text-center mb-4">Forgot Password</h1>
        <p className="forgotpasswordsubtitle text-gray-600 text-center mb-8">
          Enter your email address and we'll send you a link to reset your password
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleResetPassword}>
            <div className="emailinputcontainer mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="resetbuttoncontainer mb-6">
              <button
                type="submit"
                className="resetpasswordbtn w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center mb-6">
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
              <p className="text-green-800">
                If an account with that email exists, we've sent you a password reset link.
              </p>
            </div>
          </div>
        )}

        <Link href="/auth/signin" className="backtologin block text-center text-blue-600 hover:text-blue-800">
          Back to Sign In
        </Link>
      </div>

      <Footer />
    </div>
  )
}
