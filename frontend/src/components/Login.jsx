import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const inputCls =
  'w-full rounded-xl border border-[#E5DDD2] bg-white/80 px-4 py-2.5 text-sm text-[#2F2A26] placeholder:text-[#9C9186] transition-all duration-200 focus:border-[#D96B43] focus:bg-white focus:ring-4 focus:ring-[#D96B43]/15 focus:outline-none'

export default function Login() {
  const [showPass, setShowPass] = useState(false)
  const [text, setText] = useState("");

  const navigate = useNavigate();


  const handelSumbmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/user/login",
        {
          email,
          password,
        },
        {
          withCredentials:true  // used to save cookie in browser 
        }
      );

      setText("login successful!");
      navigate("/home",{ replace: true })

    } catch (error) {
      console.log("Error:", error);

      setText(
        error.response?.data?.message || "login failed!"
      );
    }
  }



  return (
    <div className="animate-page-enter">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-[#2F2A26]">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-[#6E645B]">
          Sign in with your email and password
        </p>
      </div>

      <form onSubmit={handelSumbmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="login-email" className="block text-xs font-semibold text-[#5C534A]">
            Email
          </label>
          <input
            id="login-email"
            name='email'
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={inputCls}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="login-pass" className="block text-xs font-semibold text-[#5C534A]">
            Password
          </label>
          <div className="relative">
            <input
              id="login-pass"
              name='password'
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
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
          className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#D96B43] to-[#C8553D] py-3 text-sm font-semibold text-white shadow-lg shadow-[#D96B43]/25 transition-all hover:brightness-105 active:scale-[0.98]"
        >
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-[#6E645B]">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-[#C8553D] hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}

