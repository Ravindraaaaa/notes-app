import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import AuthLayout from './Genral/AuthLayout'
import HOME from './Genral/HOME'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirects to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes rendered inside the centered Frosted Glass Card with tabs */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Navigate to="/register" replace />} />
        </Route>

        {/* Home page rendered full-screen outside of the Auth card */}
        <Route path="/home" element={<HOME />} />

        {/* Fallback unknown route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
