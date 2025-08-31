import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProblemsNavigation from "@/components/problems-navigation"

interface Submission {
  problemName: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  status: "Accepted" | "Rejected" | "Pending"
}

const submissions: Submission[] = [
  {
    problemName: "Two Sum",
    category: "Array",
    difficulty: "Easy",
    status: "Accepted",
  },
  {
    problemName: "Matrix Game",
    category: "Greedy",
    difficulty: "Easy",
    status: "Pending",
  },
  {
    problemName: "Reverse Linked List",
    category: "Linked List",
    difficulty: "Medium",
    status: "Rejected",
  },
  {
    problemName: "Binary Search",
    category: "Search",
    difficulty: "Easy",
    status: "Accepted",
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
      return "text-green-600 bg-green-50"
    case "Rejected":
      return "text-red-600 bg-red-50"
    case "Pending":
      return "text-yellow-600 bg-yellow-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}

export default function SubmissionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="submissionscontainer max-w-6xl mx-auto p-4">
        <ProblemsNavigation currentPage="submissions" />

        <h1 className="dashboardtitle text-3xl font-bold mb-6">Your Submissions</h1>

        <div className="overflow-x-auto">
          <table className="submissionstable w-full bg-white rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Problem Name
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((submission, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href="/ide" className="problemlink text-blue-600 hover:text-blue-800 font-medium">
                      {submission.problemName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.category}</td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getDifficultyColor(submission.difficulty)}`}
                  >
                    {submission.difficulty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(submission.status)}`}>
                      {submission.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  )
}
