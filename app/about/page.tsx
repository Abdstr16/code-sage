"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="about" />

      <div className="pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About CodeSage</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering developers with AI-driven learning and personalized coding challenges
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              At CodeSage, we believe that learning to code should be an engaging, personalized experience. Our platform
              combines the power of artificial intelligence with proven educational methodologies to create a learning
              environment that adapts to your unique pace and style. Whether you're a beginner taking your first steps
              into programming or an experienced developer looking to sharpen your skills, CodeSage provides the tools
              and guidance you need to succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-brain text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">AI-Powered Learning</h3>
              <p className="text-gray-600">
                Our advanced AI analyzes your coding patterns and provides personalized hints and feedback.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your improvement with detailed analytics and achievement milestones.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Community Support</h3>
              <p className="text-gray-600">
                Connect with fellow learners and experienced mentors in our supportive community.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
