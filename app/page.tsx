"use client"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  const handleGetStarted = () => {
    if (!user.authenticated) {
      router.push("/auth/signin")
    } else {
      router.push("/problems")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="home" />

      <div className="w-full bg-blue-50 text-gray-800 py-10 px-4 text-base font-bold mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <Image
            src="/images/homeinfo.png"
            alt="CodeSage Platform Interface"
            width={300}
            height={200}
            className="mx-auto mb-4"
          />
          <p className="w-4/5 text-gray-600 py-2 text-xl text-center mx-auto my-5">
            With CodeSage, get an AI assistant that sharpens your skills and broadens your knowledge.
          </p>
          <button
            type="button"
            onClick={handleGetStarted}
            className="w-45 h-12 px-5 text-white font-semibold text-lg tracking-wide bg-blue-600 border-none rounded-lg shadow-md transition-all duration-300 cursor-pointer relative overflow-hidden hover:bg-blue-700 hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="w-11/12 mx-auto my-5 flex justify-around gap-5 flex-wrap bg-gray-50 p-5 rounded-lg">
        <div className="flex-1 min-w-64 bg-white p-5 text-blue-600 text-sm rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
          <Image src="/images/benefit1.png" alt="AI Assistance" width={100} height={100} className="mx-auto my-2" />
          <h1 className="font-bold text-lg mb-2">Personalized AI Guidance</h1>
          <p className="text-gray-600 mx-5 text-base">
            Get hints and support tailored specifically to your skill level and learning pace.
          </p>
        </div>

        <div className="flex-1 min-w-64 bg-white p-5 text-blue-600 text-sm rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
          <Image src="/images/benefit2.png" alt="Critical Thinking" width={100} height={100} className="mx-auto my-2" />
          <h1 className="font-bold text-lg mb-2">Critical Thinking Development</h1>
          <p className="text-gray-600 mx-5 text-base">
            Build strong problem-solving skills by learning to think like a developer.
          </p>
        </div>

        <div className="flex-1 min-w-64 bg-white p-5 text-blue-600 text-sm rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
          <Image src="/images/benefit3.png" alt="Progress Tracking" width={100} height={100} className="mx-auto my-2" />
          <h1 className="font-bold text-lg mb-2">Progress Tracking & Feedback</h1>
          <p className="text-gray-600 mx-5 text-base">
            Monitor your growth and receive customized feedback to improve continuously.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
