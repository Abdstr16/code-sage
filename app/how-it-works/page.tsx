"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="how-it-works" />

      <div className="pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">How CodeSage Works</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our AI-powered platform transforms your coding journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Step-by-Step Learning Process</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Choose Your Challenge</h3>
                    <p className="text-gray-600">
                      Select from our curated collection of coding problems tailored to your skill level.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Code with AI Assistance</h3>
                    <p className="text-gray-600">
                      Write your solution while receiving intelligent hints and guidance from our AI mentor.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Instant Feedback</h3>
                    <p className="text-gray-600">
                      Receive detailed analysis of your code with suggestions for improvement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Your Progress</h3>
                    <p className="text-gray-600">Monitor your improvement and unlock new challenges as you advance.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <Image
                src="/images/evaluatecode-1.png"
                alt="CodeSage Interface Demo"
                width={500}
                height={400}
                className="w-full rounded-lg"
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Why Choose CodeSage?</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-robot text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">AI-Powered</h3>
                <p className="text-sm text-gray-600">Advanced AI provides personalized learning experiences</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-clock text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Real-time</h3>
                <p className="text-sm text-gray-600">Instant feedback and code evaluation</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-graduation-cap text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Adaptive</h3>
                <p className="text-sm text-gray-600">Learns your style and adapts to your pace</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-trophy text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Gamified</h3>
                <p className="text-sm text-gray-600">Earn achievements and track your progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
