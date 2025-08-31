"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SignupPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    // TODO: Implement signup logic
    console.log("Signup attempt:", { fullName, email, password })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="signuppagecontainer max-w-md mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>

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
            />
          </div>

          <div className="signuppasscontainer">
            <label className="signuppasslbl block text-sm font-medium mb-2">Password :</label>
            <input
              type="password"
              className="signuppasswordtxt w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            />
          </div>

          <div className="signinupcontainer flex gap-4">
            <button
              type="submit"
              className="signuppagesignupbtn flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
            <Link href="/auth/signin" className="flex-1">
              <button
                type="button"
                className="signuppagesigninbtn w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
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
