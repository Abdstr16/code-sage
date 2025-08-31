"use client"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSignOut = () => {
    signOut()
    setIsOpen(false)
    router.push("/")
  }

  if (!user.authenticated) {
    return (
      <div className="flex gap-3 mr-16">
        <button
          onClick={() => router.push("/auth/signin")}
          className="w-24 h-11 text-base font-semibold rounded-lg border-none cursor-pointer transition-all duration-300 shadow-md flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-3 focus:ring-blue-300"
        >
          Sign in
        </button>
      </div>
    )
  }

  return (
    <div className="relative mr-16" ref={menuRef}>
      <div
        className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-full transition-colors duration-300 hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className="font-medium text-gray-600">{user.username}</div>
      </div>

      {isOpen && (
        <div className="profile-menu show">
          <div className="menu-item" onClick={() => router.push("/profile")}>
            <i className="fas fa-user w-5 text-center"></i>
            Profile
          </div>
          <div className="menu-item" onClick={() => router.push("/settings")}>
            <i className="fas fa-cog w-5 text-center"></i>
            Settings
          </div>
          <div className="menu-item" onClick={handleSignOut}>
            <i className="fas fa-sign-out-alt w-5 text-center"></i>
            Sign Out
          </div>
        </div>
      )}
    </div>
  )
}
