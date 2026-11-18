import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function HOME() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/auth/user/logout',
        {},
        { withCredentials: true }
      )
    } catch (error) {
      console.log('Logout error:', error)
    } finally {
      navigate('/login', { replace: true })
    }
  }

  return (
    <main className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-[#FAF6F0] px-4 py-10">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute -top-28 -left-24 h-96 w-96 rounded-full bg-[#E76F51]/20 blur-3xl" />
        <div className="absolute -bottom-28 right-1/4 h-96 w-96 rounded-full bg-[#81B29A]/20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/70 bg-white/75 p-8 text-center shadow-[0_24px_60px_-15px_rgba(92,64,51,0.14)] backdrop-blur-2xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D96B43]/10 text-2xl">
          👋
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-[#2F2A26]">
          Welcome to Home!
        </h1>
        <p className="mt-2 text-sm text-[#6E645B]">
          You have successfully authenticated and logged in.
        </p>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl bg-[#2F2A26] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#433B35] active:scale-[0.98]"
          >
            Sign Out
          </button>
        </div>
      </div>
    </main>
  )
}
