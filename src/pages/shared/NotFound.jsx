import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import AuthShell from '../auth/AuthShell'

export default function NotFound() {
  return (
    <AuthShell title="Page not found" subtitle="The page you're looking for doesn't exist" icon={Compass}>
      <p className="text-center text-[52px] font-extrabold text-white/15 leading-none mb-2 select-none">404</p>
      <Link
        to="/login"
        className="block w-full text-center text-white py-3.5 rounded-[14px] text-[14px] font-bold
          transition-all duration-[280ms] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0"
        style={{
          background: 'linear-gradient(135deg, #F0003F 0%, #D4003F 50%, #A80027 100%)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 10px 28px rgba(180,0,45,0.45), inset 0 1px 0 rgba(255,255,255,0.25)',
        }}
      >
        Back to login
      </Link>
    </AuthShell>
  )
}
