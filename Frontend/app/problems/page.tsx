import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProblemsNavigation from "@/components/problems-navigation"

interface Problem {
  id: number
  name: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  status: string
  submissions: number
}

const problems: Problem[] = [
  {
    id: 1,
    name: "Two Sum",
    category: "Array",
    difficulty: "Easy",
    status: "Accepted",
    submissions: 514893,
  },
  {
    id: 2,
    name: "Matrix Game",
    category: "Greedy",
    difficulty: "Easy",
    status: "None",
    submissions: 127982,
  },
  {
    id: 3,
    name: "Reverse Linked List",
    category: "Linked List",
    difficulty: "Medium",
    status: "Rejected",
    submissions: 384756,
  },
  {
    id: 4,
    name: "Binary Search",
    category: "Search",
    difficulty: "Easy",
    status: "Accepted",
    submissions: 298471,
  },
]

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Easy":
      return "text-green-600"
    case "Medium":
      return "text-yellow-600"
    case "Hard":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "Accepted":
      return "text-green-600"
    case "Rejected":
      return "text-red-600"
    case "Pending":
      return "text-yellow-600"
    default:
      return "text-gray-600"
  }
}

export default function ProblemsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="problemscontainer max-w-6xl mx-auto p-4">
        <ProblemsNavigation currentPage="problems" />

        <div className="tabcontent">
          <div className="overflow-x-auto">
            <table className="problemstable w-full bg-white rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Problem ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #Submissions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {problems.map((problem) => (
                  <tr key={problem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{problem.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href="/ide" className="problemlink text-blue-600 hover:text-blue-800 font-medium">
                        {problem.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{problem.category}</td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}
                    >
                      {problem.difficulty}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getStatusColor(problem.status)}`}>
                      {problem.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {problem.submissions.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
