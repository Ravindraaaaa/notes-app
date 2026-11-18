import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const inputCls =
  'w-full rounded-xl border border-[#E5DDD2] bg-white/80 px-4 py-2.5 text-sm text-[#2F2A26] placeholder:text-[#9C9186] transition-all duration-200 focus:border-[#D96B43] focus:bg-white focus:ring-4 focus:ring-[#D96B43]/15 focus:outline-none'

export default function Register() {
  const [showPass, setShowPass] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handelSumbmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setIsSuccess(false)

    const fullName = e.target.fullName.value.trim()
    const email = e.target.email.value.trim()
    const password = e.target.password.value

    if (!fullName || !email || !password) {
      setMessage('Please fill in all fields.')
      return
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long.')
      return
    }

    setLoading(true)
    try {
      await axios.post(
        'http://localhost:5000/api/auth/user/register',
        {
          fullName,
          email,
          password,
        },
        { withCredentials: true }
      )

      setIsSuccess(true)
      setMessage('Registration successful! Redirecting to login...')
      setTimeout(() => {
        navigate('/login')
      }, 1200)
    } catch (error) {
      console.log('Error:', error)
      setIsSuccess(false)
      setMessage(error.response?.data?.message || 'Registration failed! Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="animate-page-enter">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-[#2F2A26]">
          Create account
        </h1>
        <p className="mt-1 text-sm text-[#6E645B]">
          Sign up with your name, email, and password
        </p>
      </div>

      {message && (
        <div
          role="alert"
          className={`mb-4 rounded-xl px-3.5 py-2.5 text-center text-xs font-medium transition-all ${isSuccess
              ? 'border border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border border-red-200 bg-red-50 text-red-700'
            }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handelSumbmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="reg-name" className="block text-xs font-semibold text-[#5C534A]">
            Full Name
          </label>
          <input
            id="reg-name"
            name="fullName"
            type="text"
            placeholder="Alex Morgan"
            autoComplete="name"
            required
            onChange={() => message && setMessage('')}
            className={inputCls}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="reg-email" className="block text-xs font-semibold text-[#5C534A]">
            Email
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            onChange={() => message && setMessage('')}
            className={inputCls}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="reg-pass" className="block text-xs font-semibold text-[#5C534A]">
            Password
          </label>
          <div className="relative">
            <input
              id="reg-pass"
              name="password"
              type={showPass ? 'text' : 'password'}
              placeholder="Minimum 6 characters"
              autoComplete="new-password"
              required
              minLength={6}
              onChange={() => message && setMessage('')}
              className={`${inputCls} pr-14`}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute top-1/2 right-3.5 -translate-y-1/2 text-xs font-semibold text-[#8C8177] transition-colors hover:text-[#2F2A26]"
            >
              {showPass ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#D96B43] to-[#C8553D] py-3 text-sm font-semibold text-white shadow-lg shadow-[#D96B43]/25 transition-all hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-[#6E645B]">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-[#C8553D] hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}
