"use client"

import Link from "next/link"
import ProfileMenu from "./profile-menu"
import { useAuth } from "@/hooks/use-auth"

interface HeaderProps {
  currentPage?: string
}

export default function Header({ currentPage }: HeaderProps) {
  const { user } = useAuth()

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-4 font-bold text-xl">
        <Link href="/" className="text-blue-600 text-2xl no-underline ml-12">
          Code<span className="text-blue-900">Sage</span>
        </Link>

        <div className="flex gap-5 mx-auto text-center">
          <Link
            href="/"
            className={`text-black no-underline transition-colors duration-300 hover:text-blue-800 ${
              currentPage === "home" ? "text-blue-800" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-black no-underline transition-colors duration-300 hover:text-blue-800 ${
              currentPage === "about" ? "text-blue-800" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/how-it-works"
            className={`text-black no-underline transition-colors duration-300 hover:text-blue-800 ${
              currentPage === "how-it-works" ? "text-blue-800" : ""
            }`}
          >
            How It Works
          </Link>
          {user.authenticated && (
            <Link
              href="/dashboard"
              className={`text-black no-underline transition-colors duration-300 hover:text-blue-800 ${
                currentPage === "dashboard" ? "text-blue-800" : ""
              }`}
            >
              Dashboard
            </Link>
          )}
          {user.authenticated && (
            <Link
              href="/problems"
              className={`text-black no-underline transition-colors duration-300 hover:text-blue-800 ${
                currentPage === "problems" ? "text-blue-800" : ""
              }`}
            >
              Problems
            </Link>
          )}
        </div>

        <ProfileMenu />
      </div>
    </header>
  )
}
