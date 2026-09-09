import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, Building2 } from 'lucide-react'
import AuthShell, { authFieldStyle } from './AuthShell'

const DIOCESES = ['Thiruvananthapuram Diocese', 'Kottayam Diocese', 'Chennai Diocese']

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[12.5px] font-semibold text-white/85 mb-2">{label}</label>
      {children}
    </div>
  )
}

const fieldClass =
  'w-full rounded-[14px] px-4 py-3 text-[14px] text-[var(--ltrt-text)] placeholder-[var(--ltrt-text-secondary)]/60 outline-none transition-all duration-200'

export default function Register() {
  const [form, setForm] = useState({ name: '', diocese: '', email: '', mobile: '', password: '' })
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  function submit(e) {
    e.preventDefault()
    setDone(true)
  }

  if (done) {
    return (
      <AuthShell title="Registration Submitted" icon={CheckCircle2}>
        <p className="text-[13.5px] text-white/75 text-center">
          Your organisation account for <strong className="text-[#F5DFA0]">{form.name}</strong> has been created with a
          1-year trial licence, pending Superadmin verification.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="w-full mt-6 text-white py-3.5 rounded-[14px] text-[14px] font-bold
            transition-all duration-[280ms] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0"
          style={{
            background: 'linear-gradient(135deg, #F0003F 0%, #D4003F 50%, #A80027 100%)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 10px 28px rgba(180,0,45,0.45), inset 0 1px 0 rgba(255,255,255,0.25)',
          }}
        >
          Go to Login
        </button>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      title="Register New Organisation"
      subtitle="Creates a Profile (headoffice) with a 1-year licence"
      icon={Building2}
      wide
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="Organisation / Parish Name">
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={fieldClass} style={authFieldStyle} />
        </Field>

        <Field label="Diocese">
          <select required value={form.diocese} onChange={(e) => setForm({ ...form, diocese: e.target.value })} className={fieldClass} style={authFieldStyle}>
            <option value="">Select diocese...</option>
            {DIOCESES.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Email">
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={fieldClass} style={authFieldStyle} />
          </Field>
          <Field label="Mobile">
            <input required value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className={fieldClass} style={authFieldStyle} />
          </Field>
        </div>

        <Field label="Password">
          <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={fieldClass} style={authFieldStyle} />
        </Field>

        <button
          type="submit"
          className="w-full text-white py-3.5 rounded-[14px] text-[14px] font-bold mt-2
            transition-all duration-[280ms] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0"
          style={{
            background: 'linear-gradient(135deg, #F0003F 0%, #D4003F 50%, #A80027 100%)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 10px 28px rgba(180,0,45,0.45), inset 0 1px 0 rgba(255,255,255,0.25)',
          }}
        >
          Create Account
        </button>

        <p className="text-[12.5px] text-center text-white/50">
          Already registered? <Link to="/login" className="text-[#F5DFA0] hover:underline">Sign in</Link>
        </p>
      </form>
    </AuthShell>
  )
}
