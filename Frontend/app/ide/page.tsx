"use client"

import { useState } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function IDEPage() {
  const [code, setCode] = useState("")
  const [hints, setHints] = useState<string[]>([])
  const [showHints, setShowHints] = useState(false)

  const handleEvaluateCode = () => {
    // TODO: Implement code evaluation logic
    console.log("Evaluating code:", code)
    // Mock hints for demonstration
    const mockHints = [
      "Consider using a nested loop approach",
      "Think about the pigeonhole principle",
      "Check if a*b submatrix can have all equal elements",
    ]
    setHints(mockHints)
    setShowHints(true)
  }

  const handleSubmitFile = () => {
    // TODO: Implement file submission logic
    console.log("Submitting code:", code)
    alert("Code submitted successfully!")
  }

  const navigateToProblems = () => {
    window.location.href = "/problems"
  }

  const navigateToSubmissions = () => {
    window.location.href = "/problems/submissions"
  }

  const navigateToDashboard = () => {
    window.location.href = "/problems/dashboard"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="problemcontainer max-w-6xl mx-auto p-4">
        {/* Navigation Tabs */}
        <div className="problemtabs flex gap-2 mb-6">
          <button
            onClick={navigateToProblems}
            className="problemtab px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            Problems
          </button>
          <button
            onClick={navigateToSubmissions}
            className="problemtab px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            Your Submissions
          </button>
          <button
            onClick={navigateToDashboard}
            className="problemtab px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            Dashboard
          </button>
        </div>

        {/* Problem Header */}
        <div className="problemheader flex justify-center mb-6">
          <h1 className="problemtitle text-3xl font-bold">Matrix Game</h1>
        </div>

        {/* Problem Description */}
        <div className="problemdescription bg-white p-6 rounded-lg shadow-sm mb-6">
          <p className="mb-4">
            Aryan and Harshith play a game. They both start with three integers a, b, and k. Aryan then gives Harshith
            two integers n and m. Harshith then gives Aryan a matrix X with n rows and m columns, such that each of the
            elements of X is between 1 and k (inclusive).
          </p>
          <p>
            After that, Aryan wins if he can find a submatrix Y of X with a rows and b columns such that all elements of
            Y are equal.
          </p>
        </div>

        {/* Problem Metadata */}
        <div className="problemmeta grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="metaitem bg-white p-4 rounded-lg shadow-sm">
            <span className="metalabel block text-sm text-gray-600 mb-1">Problem ID</span>
            <span className="metavalue font-semibold">3456246</span>
          </div>
          <div className="metaitem bg-white p-4 rounded-lg shadow-sm">
            <span className="metalabel block text-sm text-gray-600 mb-1">Category</span>
            <span className="metavalue font-semibold">Greedy</span>
          </div>
          <div className="metaitem bg-white p-4 rounded-lg shadow-sm">
            <span className="metalabel block text-sm text-gray-600 mb-1">Difficulty</span>
            <span className="metavalue font-semibold text-green-600">Easy</span>
          </div>
          <div className="metaitem bg-white p-4 rounded-lg shadow-sm">
            <span className="metalabel block text-sm text-gray-600 mb-1">Submission Status</span>
            <span className="metavalue font-semibold text-green-600">Accepted</span>
          </div>
        </div>

        {/* Code Actions */}
        <div className="codeactions flex gap-4 mb-6">
          <div className="evaluatebtncontainer flex items-center gap-2">
            <Image src="/images/Evaluatecode.png" alt="Evaluate Code Button" width={24} height={24} />
            <button
              onClick={handleEvaluateCode}
              className="actionbtn evaluatebtn bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Evaluate Code
            </button>
          </div>
          <div className="submitbtncontainer flex items-center gap-2">
            <Image src="/images/submitfile.png" alt="Submit File Button" width={24} height={24} />
            <button
              onClick={handleSubmitFile}
              className="actionbtn submitbtn bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Submit File
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <textarea
          className="codeeditor w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Write your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {/* Hints Container */}
        <div className="hintcontainer mt-6">
          {showHints && hints.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Hints:</h3>
              <ul className="space-y-1">
                {hints.map((hint, index) => (
                  <li key={index} className="text-yellow-700">
                    {index + 1}. {hint}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
