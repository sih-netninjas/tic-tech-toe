import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from 'next-auth'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: { label: 'Password', type: 'password' },
        userType: {
          label: 'User Type',
          type: 'select',
          options: ['admin', 'teacher', 'student'],
        },
        eno: { label: 'Enrollment Number (eno)', type: 'text' }, // Added eno field
        username: { label: 'Username', type: 'text' }, // Added username field for teachers/admins
      },

      async authorize(credentials) {
        if (!credentials?.password || !credentials?.userType) {
          return null
        }

        // Prepare request body based on user type
        const requestBody =
          credentials.userType === 'student'
            ? {
                eno: credentials.eno,
                password: credentials.password,
                userType: credentials.userType,
              }
            : {
                username: credentials.username,
                password: credentials.password,
                userType: credentials.userType,
              }

        const user = await fetch('http://localhost:5000/auth/signin', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: { 'Content-Type': 'application/json' },
        })

        const data = await user.json()

        if (user.ok && data) {
          return {
            id: data._id,
            name: data.name,
            email: data.email,
            userType: credentials.userType,
          }
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userType = user.userType
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.userType = token.userType
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
