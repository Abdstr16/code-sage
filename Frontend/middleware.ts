import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle legacy HTML routes and redirect to new structure
  const redirectMap: { [key: string]: string } = {
    "/pages/Home.html": "/",
    "/pages/About.html": "/about",
    "/pages/HowItWorks.html": "/how-it-works",
    "/pages/Auth/Signin.html": "/auth/signin",
    "/pages/Auth/createnew.html": "/auth/signup",
    "/pages/Auth/forgotpassword.html": "/auth/forgot-password",
    "/pages/IDE/ide.html": "/ide",
    "/pages/Problems/problems.html": "/problems",
    "/pages/Problems/submissions.html": "/problems/submissions",
    "/pages/Problems/dashboard.html": "/problems/dashboard",
  }

  if (redirectMap[pathname]) {
    return NextResponse.redirect(new URL(redirectMap[pathname], request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/pages/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
