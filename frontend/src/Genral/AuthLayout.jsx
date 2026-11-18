import { NavLink, Outlet } from 'react-router-dom'

const navCls = ({ isActive }) =>
  `rounded-xl py-2 text-center text-xs font-semibold transition-all duration-200 ${
    isActive
      ? 'bg-white text-[#2F2A26] shadow-sm'
      : 'text-[#6E645B] hover:text-[#2F2A26]'
  }`

export default function AuthLayout() {
  return (
    <main className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-[#FAF6F0] px-4 py-10">
      {/* Warm organic blurred background shapes */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute -top-28 -left-24 h-96 w-96 rounded-full bg-[#E76F51]/30 blur-3xl" />
        <div className="absolute top-1/4 -right-24 h-80 w-80 rounded-full bg-[#F4A261]/30 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-96 w-96 rounded-full bg-[#81B29A]/30 blur-3xl" />
      </div>

      {/* Frosted glass card */}
      <section className="relative z-10 w-full max-w-md rounded-3xl border border-white/70 bg-white/65 p-6 shadow-[0_24px_60px_-15px_rgba(92,64,51,0.14)] backdrop-blur-2xl sm:p-8">
        <nav aria-label="Authentication routes" className="mb-6 grid grid-cols-2 rounded-2xl bg-[#EFE7DC]/80 p-1">
          <NavLink to="/login" className={navCls}>
            Login
          </NavLink>
          <NavLink to="/register" className={navCls}>
            Sign Up
          </NavLink>
        </nav>

        <Outlet />
      </section>
    </main>
  )
}
