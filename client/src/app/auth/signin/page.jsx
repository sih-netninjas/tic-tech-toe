'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('student')
  const [eno, setEno] = useState('')  // State for enrollment number
  const [username, setUsername] = useState('') // State for username
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      eno: userType === 'student' ? eno : undefined, // Only pass eno if student
      username: userType !== 'student' ? username : undefined, // Only pass username if not student
      password,
      userType,
      redirect: false,
    })

    if (result?.error) {
      console.error(result.error)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Sign In</h1>

        {userType === 'student' && (
          <input
            type="text"
            value={eno}
            onChange={(e) => setEno(e.target.value)}
            placeholder="Enrollment Number (eno)"
            className="w-full p-2 mb-4 border rounded"
          />
        )}

        {userType !== 'student' && (
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 mb-4 border rounded"
          />
        )}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
        />

        <select
          value={userType}
          onChange={(e) => {
            setUserType(e.target.value);
            if (e.target.value === 'student') {
              setUsername(''); // Reset username if switching to student
            }
          }}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Sign In
        </button>
      </form>
    </div>
  )
}