"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

interface Problem {
  id: number
  name: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  status: "Not Started" | "In Progress" | "Completed"
  submissions: number
}

export default function ProblemsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [problems, setProblems] = useState<Problem[]>([])

  useEffect(() => {
    if (!user.authenticated) {
      router.push("/auth/signin")
      return
    }

    // Mock data - replace with actual API call
    setProblems([
      { id: 1, name: "Two Sum", category: "Array", difficulty: "Easy", status: "Completed", submissions: 3 },
      {
        id: 2,
        name: "Add Two Numbers",
        category: "Linked List",
        difficulty: "Medium",
        status: "In Progress",
        submissions: 1,
      },
      {
        id: 3,
        name: "Longest Substring",
        category: "String",
        difficulty: "Medium",
        status: "Not Started",
        submissions: 0,
      },
      {
        id: 4,
        name: "Median of Two Arrays",
        category: "Array",
        difficulty: "Hard",
        status: "Not Started",
        submissions: 0,
      },
      { id: 5, name: "Valid Parentheses", category: "Stack", difficulty: "Easy", status: "Completed", submissions: 2 },
    ])
  }, [user.authenticated, router])

  const filteredProblems = problems.filter((problem) => {
    if (activeTab === "all") return true
    if (activeTab === "completed") return problem.status === "Completed"
    if (activeTab === "in-progress") return problem.status === "In Progress"
    if (activeTab === "not-started") return problem.status === "Not Started"
    return true
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100"
      case "Medium":
        return "text-yellow-600 bg-yellow-100"
      case "Hard":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-100"
      case "In Progress":
        return "text-blue-600 bg-blue-100"
      case "Not Started":
        return "text-gray-600 bg-gray-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  if (!user.authenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="problems" />

      <div className="pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Coding Problems</h1>
            <p className="text-gray-600">Challenge yourself with our curated collection of coding problems</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: "all", label: "All Problems" },
                  { key: "not-started", label: "Not Started" },
                  { key: "in-progress", label: "In Progress" },
                  { key: "completed", label: "Completed" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.key
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Problem
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submissions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProblems.map((problem) => (
                    <tr
                      key={problem.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/problems/${problem.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{problem.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{problem.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(problem.difficulty)}`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(problem.status)}`}
                        >
                          {problem.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{problem.submissions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
