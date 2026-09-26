import { useState } from 'react'
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import backgroundImage from './assets/page_background.jpg'
import logoImage from './assets/logo.jpg'

function StaffSignup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    staffCode: '',
  })

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState({ loading: false, error: '', success: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, error: '', success: '' })

    try {
      const res = await fetch('http://localhost:5000/api/auth/staff-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Sign up failed')

      setStatus({ loading: false, error: '', success: 'Account created! Redirecting to login...' })
      setTimeout(() => navigate('/CustomerLogIn'), 1200)
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: '' })
    }
  }

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-800"

  return (
    <div
      className="h-screen w-full flex items-center justify-center p-6"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

      <div className="w-full max-w-5xl h-[600px] flex flex-col md:flex-row items-stretch bg-white/95 rounded-2xl shadow-xl overflow-hidden border border-green-950">

        {/* LEFT CARD */}
        <div style={{ flex: 0.8 }} className="relative bg-white/90 rounded-2xl p-8 md:p-6 flex flex-col justify-center">

          <h2 className="text-2xl font-bold text-green-800 mb-1 mt-4">Staff sign up</h2>
          <p className="text-sm text-gray-600 mt-2 mb-4">
            Use the email and staff code your admin gave you.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="firstName" className="text-xs font-semibold text-green-800">First Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text" id="firstName" name="firstName" placeholder="First Name"
                    value={formData.firstName} onChange={handleChange} required
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="lastName" className="text-xs font-semibold text-green-800">Last Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text" id="lastName" name="lastName" placeholder="Last Name"
                    value={formData.lastName} onChange={handleChange} required
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs font-semibold text-green-800">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email" id="email" name="email" placeholder="Email"
                  value={formData.email} onChange={handleChange} required
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-xs font-semibold text-green-800">Username</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text" id="username" name="username" placeholder="Username"
                  value={formData.username} onChange={handleChange} required
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-xs font-semibold text-green-800">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password" name="password" placeholder="Password (8+ characters)"
                  value={formData.password} onChange={handleChange} required minLength={8}
                  className={`${inputClass} pl-10 pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-800"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="staffCode" className="text-xs font-semibold text-green-800">Staff Code</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text" id="staffCode" name="staffCode" placeholder="STF-XXXXXXXX"
                  value={formData.staffCode} onChange={handleChange} required
                  className={`${inputClass} pl-10`}
                />
              </div>
              <p className="text-xs text-gray-600">Use the code your admin gave you.</p>
            </div>

            {status.error && <p className="text-xs text-red-600">{status.error}</p>}
            {status.success && <p className="text-xs text-green-700">{status.success}</p>}

            <button
              type="submit"
              disabled={status.loading}
              className="w-full bg-green-900 text-white text-xs font-medium py-3 rounded-lg hover:bg-green-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status.loading ? 'Creating account...' : 'Create staff account'}
            </button>

          </form>

          <button
            type="button"
            onClick={() => navigate("/staffLogin")}
            className="text-xs text-green-700 hover:text-green-800 transition mt-3"
          >
            <span className="text-gray-600">Already have an account? </span>
            Log in
          </button>

        </div>

        {/* RIGHT CARD */}
        <div style={{ flex: 0.4 }} className="relative overflow-hidden rounded-r-2xl px-8 pb-8 flex flex-col justify-start">
          <div
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              opacity: 0.9
            }}
            className="absolute inset-0 scale-110 blur-sm pointer-events-none"
          ></div>
          <div className="absolute inset-0 bg-green-950/40"></div>

          <div className="relative z-10">
            <img src={logoImage} alt="Forrest Logo" className="w-[70px] h-[70px] rounded-full mb-6 mt-8" />
            <h2 className="text-2xl font-bold text-white leading-snug">Find your space.</h2>
            <h2 className="text-2xl font-bold text-white leading-snug mb-2">Find your focus.</h2>
            <h3 className="text-sm text-white opacity-90">Focus. Connect. Grow</h3>

            <div className="mt-6 space-y-1">
              <h3 className="text-sm text-white opacity-90">Forrest Co-working space is a</h3>
              <h3 className="text-sm text-white opacity-90">study hub where you can find the</h3>
              <h3 className="text-sm text-white opacity-90">perfect place to focus and grow</h3>
              <h3 className="text-sm text-white opacity-90">your ideas.</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default StaffSignup