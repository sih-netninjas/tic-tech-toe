import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
  // Retrieve the token from the request
  const token = await getToken({ req })
  console.log('Middleware Token:', token)

  // If no token is found, redirect to sign-in page
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  const userType = token.userType
  console.log('User Type:', userType) // Debugging line to check userType

  // Define protected routes and required user types
  const protectedRoutes = [
    { path: '/admin', requiredTypes: ['admin'] },
    { path: '/teacher', requiredTypes: ['teacher'] },
    { path: '/student', requiredTypes: ['student'] },
  ]

  // Check if the current path matches any protected route
  const matchedRoute = protectedRoutes.find((route) =>
    req.nextUrl.pathname.startsWith(route.path)
  )

  // If a matched route is found and the user type is not allowed, redirect to home
  if (matchedRoute && !matchedRoute.requiredTypes.includes(userType)) {
    console.log(
      `Redirecting user from ${req.nextUrl.pathname} to home due to insufficient permissions.`
    ) // Debugging line
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Proceed with the request if all checks pass
  return NextResponse.next()
}

// Define which paths should trigger this middleware
export const config = {
  matcher: ['/admin/:path*', '/teacher/:path*', '/student/:path*'],
}
