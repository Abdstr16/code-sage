"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ProblemDetail {
  id: number
  name: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  description: string
  examples: Array<{
    input: string
    output: string
    explanation?: string
  }>
  constraints: string[]
  starterCode: string
  hints: string[]
}

export default function ProblemIDEPage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const problemId = params.id as string

  const [problem, setProblem] = useState<ProblemDetail | null>(null)
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(-1)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    if (!user.authenticated) {
      router.push("/auth/signin")
      return
    }

    const mockProblems: Record<string, ProblemDetail> = {
      "1": {
        id: 1,
        name: "Two Sum",
        category: "Array",
        difficulty: "Easy",
        description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        examples: [
          {
            input: "nums = [2,7,11,15], target = 9",
            output: "[0,1]",
            explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
          },
          {
            input: "nums = [3,2,4], target = 6",
            output: "[1,2]",
          },
          {
            input: "nums = [3,3], target = 6",
            output: "[0,1]",
          },
        ],
        constraints: [
          "2 <= nums.length <= 10^4",
          "-10^9 <= nums[i] <= 10^9",
          "-10^9 <= target <= 10^9",
          "Only one valid answer exists.",
        ],
        starterCode: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Write your solution here
    pass`,
        hints: [
          "Think about what you need to find for each number in the array.",
          "For each number, you need to find if its complement (target - current number) exists in the array.",
          "Consider using a hash map to store numbers you've seen and their indices for O(1) lookup time.",
          "As you iterate through the array, check if (target - current number) exists in your hash map.",
        ],
      },
      "2": {
        id: 2,
        name: "Add Two Numbers",
        category: "Linked List",
        difficulty: "Medium",
        description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
        examples: [
          {
            input: "l1 = [2,4,3], l2 = [5,6,4]",
            output: "[7,0,8]",
            explanation: "342 + 465 = 807.",
          },
        ],
        constraints: [
          "The number of nodes in each linked list is in the range [1, 100].",
          "0 <= Node.val <= 9",
          "It is guaranteed that the list represents a number that does not have leading zeros.",
        ],
        starterCode: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1, l2):
    """
    :type l1: ListNode
    :type l2: ListNode
    :rtype: ListNode
    """
    # Write your solution here
    pass`,
        hints: [
          "Think of this as elementary school addition, but in reverse order.",
          "You'll need to handle the carry when the sum of two digits is >= 10.",
          "Create a dummy head node to simplify the logic of building the result list.",
          "Don't forget to handle the case where there's a final carry after processing both lists.",
        ],
      },
    }

    const problemData = mockProblems[problemId]
    if (problemData) {
      setProblem(problemData)
      setCode(problemData.starterCode)
    }
  }, [user.authenticated, router, problemId])

  const handleShowHint = () => {
    if (problem && problem.hints.length > 0) {
      const nextHintIndex = currentHintIndex + 1
      if (nextHintIndex < problem.hints.length) {
        setCurrentHintIndex(nextHintIndex)
        setShowHint(true)
      }
    }
  }

  const handleCloseHint = () => {
    setShowHint(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setTimeout(() => {
      setOutput("Code executed successfully!\nTest cases passed: 2/3")
      setIsRunning(false)
    }, 2000)
  }

  const handleSubmit = async () => {
    console.log("[v0] Submitting code:", code)
    alert("Code submitted successfully!")
  }

  if (!user.authenticated || !problem) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="problems" />

      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-2xl font-bold text-gray-800">{problem.name}</h1>
              <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
              <Badge variant="outline">{problem.category}</Badge>
            </div>
            <Button variant="outline" onClick={() => router.push("/problems")} className="text-sm">
              ← Back to Problems
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Problem Description
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShowHint}
                    disabled={!problem.hints || currentHintIndex >= problem.hints.length - 1}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    💡 Hint {currentHintIndex >= 0 ? `(${currentHintIndex + 1}/${problem.hints?.length || 0})` : ""}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showHint && currentHintIndex >= 0 && problem.hints && (
                  <Alert className="mb-4 border-blue-200 bg-blue-50">
                    <AlertDescription className="flex items-start justify-between">
                      <div className="flex-1">
                        <strong className="text-blue-800">Hint {currentHintIndex + 1}:</strong>
                        <p className="mt-1 text-blue-700">{problem.hints[currentHintIndex]}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCloseHint}
                        className="ml-2 h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                    <TabsTrigger value="constraints">Constraints</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-4">
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-line text-gray-700">{problem.description}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="examples" className="mt-4">
                    <div className="space-y-4">
                      {problem.examples.map((example, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Example {index + 1}:</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <strong>Input:</strong> {example.input}
                            </div>
                            <div>
                              <strong>Output:</strong> {example.output}
                            </div>
                            {example.explanation && (
                              <div>
                                <strong>Explanation:</strong> {example.explanation}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="constraints" className="mt-4">
                    <ul className="space-y-2">
                      {problem.constraints.map((constraint, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          • {constraint}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Code Editor
                  <div className="flex gap-2">
                    <Button onClick={handleRunCode} disabled={isRunning} variant="outline">
                      {isRunning ? "Running..." : "Run Code"}
                    </Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 p-4 font-mono text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your code here..."
                  />

                  {output && (
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                      <h4 className="text-white mb-2">Output:</h4>
                      <pre className="whitespace-pre-wrap">{output}</pre>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
