import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-8">
      <div className="footerbar max-w-6xl mx-auto px-4">
        <div className="footerbarlinks flex justify-center gap-6 mb-4">
          <Link href="/" className="home hover:text-blue-600">
            Home
          </Link>
          <Link href="/about" className="about hover:text-blue-600">
            About
          </Link>
          <Link href="/how-it-works" className="howitworks hover:text-blue-600">
            How It Works
          </Link>
        </div>
        <div className="text-center text-gray-600">
          <p>© 2025 CodeSage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
