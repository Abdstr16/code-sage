"use client"

import Link from "next/link"

interface ProblemsNavigationProps {
  currentPage: "problems" | "submissions" | "dashboard"
}

export default function ProblemsNavigation({ currentPage }: ProblemsNavigationProps) {
  return (
    <div className="tabsnavigation flex gap-2 mb-6">
      <Link href="/problems">
        <button
          className={`tabbutton px-4 py-2 rounded-md transition-colors ${
            currentPage === "problems" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          Problems
        </button>
      </Link>
      <Link href="/problems/submissions">
        <button
          className={`tabbutton px-4 py-2 rounded-md transition-colors ${
            currentPage === "submissions" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          Your Submissions
        </button>
      </Link>
      <Link href="/problems/dashboard">
        <button
          className={`tabbutton px-4 py-2 rounded-md transition-colors ${
            currentPage === "dashboard" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          Dashboard
        </button>
      </Link>
    </div>
  )
}
