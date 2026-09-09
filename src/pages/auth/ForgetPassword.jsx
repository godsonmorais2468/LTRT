import { useState } from 'react'
import { Link } from 'react-router-dom'
import { KeyRound, ArrowLeft } from 'lucide-react'
import AuthShell, { authFieldStyle } from './AuthShell'

export default function ForgetPassword() {
  const [step, setStep] = useState(1)
  const [value, setValue] = useState('')

  return (
    <AuthShell title="Forgot Password" subtitle={step === 1 ? 'Recover access to your account' : 'Enter the code we sent you'} icon={KeyRound}>
      <div className="space-y-4">
        {step === 1 ? (
          <>
            <p className="text-[13.5px] text-white/75">
              Enter your registered username or mobile number to receive an OTP.
            </p>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Username / Mobile"
              className="w-full rounded-[14px] px-4 py-3 text-[14px] text-[var(--ltrt-text)] placeholder-[var(--ltrt-text-secondary)]/60 outline-none transition-all duration-200"
              style={authFieldStyle}
            />
            <AuthButton onClick={() => setStep(2)}>Send OTP</AuthButton>
          </>
        ) : (
          <>
            <p className="text-[13.5px] font-medium" style={{ color: '#7DE8C0' }}>
              OTP sent to {value || 'your registered contact'} (mock: 123456)
            </p>
            <input
              placeholder="Enter OTP"
              className="w-full rounded-[14px] px-4 py-3 text-[14px] text-[var(--ltrt-text)] placeholder-[var(--ltrt-text-secondary)]/60 outline-none transition-all duration-200"
              style={authFieldStyle}
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full rounded-[14px] px-4 py-3 text-[14px] text-[var(--ltrt-text)] placeholder-[var(--ltrt-text-secondary)]/60 outline-none transition-all duration-200"
              style={authFieldStyle}
            />
            <AuthButton>Reset Password</AuthButton>
          </>
        )}

        <p className="text-center pt-1">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-white/75 hover:text-[#F5DFA0] text-[13.5px] font-medium transition-colors duration-200"
          >
            <ArrowLeft size={15} strokeWidth={2} /> Back to login
          </Link>
        </p>
      </div>
    </AuthShell>
  )
}

function AuthButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full text-white py-3.5 rounded-[14px] text-[14px] font-bold
        transition-all duration-[280ms] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0"
      style={{
        background: 'linear-gradient(135deg, #F0003F 0%, #D4003F 50%, #A80027 100%)',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 10px 28px rgba(180,0,45,0.45), inset 0 1px 0 rgba(255,255,255,0.25)',
      }}
    >
      {children}
    </button>
  )
}
