import Header from "@/components/header"
import Footer from "@/components/footer"
import ProblemsNavigation from "@/components/problems-navigation"

interface ActivityItem {
  problemName: string
  status: "Accepted" | "Rejected" | "Pending"
}

const recentActivity: ActivityItem[] = [
  { problemName: "Two Sum", status: "Accepted" },
  { problemName: "Matrix Game", status: "Pending" },
  { problemName: "Reverse Linked List", status: "Rejected" },
  { problemName: "Binary Search", status: "Accepted" },
]

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

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="dashboardcontainer max-w-6xl mx-auto p-4">
        <ProblemsNavigation currentPage="dashboard" />

        <h1 className="dashboardtitle text-3xl font-bold mb-8">Dashboard</h1>

        {/* Statistics Cards */}
        <div className="statscontainer grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="statcard bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="statnumber text-3xl font-bold text-blue-600 mb-2">24</div>
            <div className="statlabel text-gray-600">Problems Solved</div>
          </div>
          <div className="statcard bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="statnumber text-3xl font-bold text-green-600 mb-2">85%</div>
            <div className="statlabel text-gray-600">Accuracy</div>
          </div>
          <div className="statcard bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="statnumber text-3xl font-bold text-orange-600 mb-2">12</div>
            <div className="statlabel text-gray-600">Current Streak</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recentactivity bg-white p-6 rounded-lg shadow-sm">
          <h2 className="activitytitle text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="activityitem flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
              >
                <span className="problemname font-medium">{activity.problemName}</span>
                <span className={`font-medium ${getStatusColor(activity.status)}`}>{activity.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
