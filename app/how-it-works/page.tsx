import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="how-it-works" />

      <div className="howitworkscontainer max-w-4xl mx-auto py-16 px-4">
        <h1 className="howitworksh1 text-4xl font-bold text-center mb-12">How it works</h1>
        <div className="howitworkspcontainer space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            When you're stuck on a problem, simply input it into our platform. CodeSage can analyze questions from all
            major competitive programming sites or any original coding challenge.
          </p>
          <p>
            Behind the scenes, our sophisticated artificial intelligence model gets to work. This model has been trained
            on a vast dataset of thousands of solved competitive programming questions. It deconstructs your problem to
            understand its structure, identify patterns, and determine the optimal solving approach.
          </p>
          <p>
            Instead of a direct solution, CodeSage provides a curated sequence of hints. These hints start with general
            guidance about the problem's concept and gradually become more specific, nudging you toward the
            implementation details. This method is designed to replicate the "aha!" moment of discovery, building your
            intuition.
          </p>
          <p>
            If you've exhausted the hints and still need closure, you can unlock the complete solution. This final step
            includes a comprehensive, well-commented answer with detailed explanations on why it works, including time
            complexity analysis and alternative approaches. This ensures you learn from the solution, rather than just
            copying it.
          </p>
          <p>
            With each problem you tackle, CodeSage tracks your progress. Over time, it identifies your strengths and
            weaknesses, helping you systematically improve your algorithmic thinking and coding proficiency. The goal is
            to make you a more independent and confident programmer, capable of tackling any challenge.
          </p>
        </div>
      </div>

      {/* Demo Problem Interface */}
      <div className="problemcontainer max-w-6xl mx-auto py-16 px-4 bg-gray-50">
        <div className="problemtabs flex gap-2 mb-6 justify-center">
          <div className="problemtab bg-blue-600 text-white px-4 py-2 rounded-md">Problem Description</div>
          <div className="problemtab bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Your Submissions</div>
          <div className="problemtab bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Dashboard</div>
        </div>

        <div className="problemheader flex justify-center mb-6">
          <h1 className="problemtitle text-3xl font-bold">Matrix Game</h1>
        </div>

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

        <div className="codeactions flex gap-4 mb-6 justify-center">
          <div className="evaluatebtncontainer flex items-center gap-2">
            <Image src="/images/Evaluatecode.png" alt="Evaluate Code Button" width={24} height={24} />
            <button className="actionbtn evaluatebtn bg-blue-600 text-white px-6 py-2 rounded-md">Evaluate Code</button>
          </div>
          <div className="submitbtncontainer flex items-center gap-2">
            <Image src="/images/submitfile.png" alt="Submit File Button" width={24} height={24} />
            <button className="actionbtn submitbtn bg-green-600 text-white px-6 py-2 rounded-md">Submit File</button>
          </div>
        </div>

        <textarea
          className="codeeditor w-full h-32 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none"
          placeholder="Write your code here..."
          defaultValue="1&#10;2"
          readOnly
        />
      </div>

      <Footer />
    </div>
  )
}
