import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface TeamMember {
  name: string
  image: string
}

const teamMembers: TeamMember[] = [
  { name: "Ali Abdul Sater", image: "https://snapynow.com/wp-content/uploads/2024/05/no-dp_16.webp" },
  { name: "Husein Zahweh", image: "https://snapynow.com/wp-content/uploads/2024/05/no-dp_16.webp" },
  { name: "Rana Ezzedine", image: "https://snapynow.com/wp-content/uploads/2024/05/no-dp_16.webp" },
  { name: "Nada Baydoun", image: "https://snapynow.com/wp-content/uploads/2024/05/no-dp_16.webp" },
  { name: "Bahaa Mucharrafie", image: "https://snapynow.com/wp-content/uploads/2024/05/no-dp_16.webp" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="about" />

      <div className="aboutinfo max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">About CodeSage</h1>
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            We are a dedicated team of educators and developers passionate about helping students and aspiring
            programmers develop the mindset and skills needed to excel in software development.
          </p>
          <p>
            Our mission is to cultivate critical thinking and problem-solving abilities that go beyond syntax
            memorization, empowering you to tackle complex programming challenges with confidence.
          </p>
          <p>
            At CodeSage, we believe that becoming a great developer requires more than just writing code - it's about
            developing an analytical approach to problem-solving that will serve you throughout your career.
          </p>
        </div>
      </div>

      <div className="ourteaminfo max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="teammember text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                  sizes="(max-width: 768px) 128px, 128px"
                />
              </div>
              <p className="font-medium text-gray-800">{member.name}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
