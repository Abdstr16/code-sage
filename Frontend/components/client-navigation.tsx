"use client"

import { useEffect } from "react"

export default function ClientNavigation() {
  useEffect(() => {
    // Ensure global navigation function is available
    if (typeof window !== "undefined") {
      ;(window as any).Enterpage = (path: string) => {
        const routeMap: { [key: string]: string } = {
          // Auth routes
          "Auth/Signin": "/auth/signin",
          "auth/signin": "/auth/signin",
          Signin: "/auth/signin",
          signin: "/auth/signin",
          createnew: "/auth/signup",
          "Auth/createnew": "/auth/signup",
          signup: "/auth/signup",
          forgotpassword: "/auth/forgot-password",
          "Auth/forgotpassword": "/auth/forgot-password",
          "forgot-password": "/auth/forgot-password",

          // Problems routes
          "Problems/problems": "/problems",
          problems: "/problems",
          "Problems/submissions": "/problems/submissions",
          submissions: "/problems/submissions",
          "Problems/dashboard": "/problems/dashboard",
          dashboard: "/problems/dashboard",

          // IDE route
          "IDE/ide": "/ide",
          ide: "/ide",

          // Main pages
          Home: "/",
          home: "/",
          About: "/about",
          about: "/about",
          HowItWorks: "/how-it-works",
          "how-it-works": "/how-it-works",
        }

        const mappedPath = routeMap[path] || `/${path}`
        window.location.href = mappedPath
      }
    }
  }, [])

  return null
}
