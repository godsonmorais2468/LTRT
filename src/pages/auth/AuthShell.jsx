/**
 * Shared crimson-field + glass-panel frame for every unauthenticated screen.
 * Login, Register, Forgot Password and 404 all sit inside this so the
 * signed-out experience matches the signed-in LTRT 2.0 design system.
 */
export const authFieldStyle = {
  background: 'rgba(255,255,255,0.92)',
  border: '1px solid rgba(21,42,70,0.18)',
  boxShadow: 'inset 0 1px 2px rgba(21,42,70,0.06)',
}

export default function AuthShell({ title, subtitle, icon: Icon, wide, children, footer }) {
  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-4 py-10 overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #C4002F 0%, #A80027 32%, #7A0019 66%, #4A0010 100%)' }}
    >
      <div
        className="absolute -top-40 -left-32 w-[36rem] h-[36rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,70,120,0.28), transparent 68%)' }}
      />
      <div
        className="absolute -bottom-40 -right-24 w-[34rem] h-[34rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(217,167,42,0.20), transparent 68%)' }}
      />

      <svg className="absolute -top-24 -left-24 w-[70%] max-w-2xl opacity-70 pointer-events-none" viewBox="0 0 600 300" fill="none">
        <path d="M-50 60 C150 -20, 250 140, 450 40 C520 5, 580 40, 650 10" stroke="url(#asg1)" strokeWidth="2.5" />
        <defs>
          <linearGradient id="asg1" x1="0" y1="0" x2="600" y2="0">
            <stop offset="0%" stopColor="#D9A72A" stopOpacity="0" />
            <stop offset="50%" stopColor="#F5DFA0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D9A72A" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg className="absolute -bottom-24 -right-24 w-[70%] max-w-2xl opacity-70 rotate-180 pointer-events-none" viewBox="0 0 600 300" fill="none">
        <path d="M-50 60 C150 -20, 250 140, 450 40 C520 5, 580 40, 650 10" stroke="url(#asg2)" strokeWidth="2.5" />
        <defs>
          <linearGradient id="asg2" x1="0" y1="0" x2="600" y2="0">
            <stop offset="0%" stopColor="#D9A72A" stopOpacity="0" />
            <stop offset="50%" stopColor="#F5DFA0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D9A72A" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/40 pointer-events-none"
          style={{
            width: `${3 + (i % 3) * 2}px`,
            height: `${3 + (i % 3) * 2}px`,
            top: `${(i * 53) % 100}%`,
            left: `${(i * 31) % 100}%`,
            opacity: 0.45,
            animation: `sparkle ${2 + (i % 4) * 0.6}s ease-in-out infinite ${(i % 5) * 0.3}s`,
          }}
        />
      ))}

      <div
        className={`relative w-full ${wide ? 'max-w-lg' : 'max-w-md'} rounded-[26px] p-7 sm:p-9 animate-[modalPop_0.4s_cubic-bezier(0.16,1,0.3,1)]`}
        style={{
          background: 'rgba(255,255,255,0.10)',
          WebkitBackdropFilter: 'blur(28px) saturate(160%)',
          backdropFilter: 'blur(28px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.22)',
          boxShadow: '0 24px 70px rgba(45,0,12,0.45), inset 0 1px 0 rgba(255,255,255,0.28)',
        }}
      >
        <div className="text-center mb-7">
          <div
            className="w-[58px] h-[58px] rounded-[18px] mx-auto mb-4 flex items-center justify-center"
            style={{
              background: 'linear-gradient(140deg, #FFFFFF, #FFF2F5)',
              color: 'var(--ltrt-red)',
              boxShadow: '0 10px 26px rgba(45,0,12,0.35), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
          >
            {Icon ? <Icon size={26} strokeWidth={1.9} /> : <span className="font-extrabold text-[13px]">LTRT</span>}
          </div>
          <h1 className="text-white text-[22px] font-bold tracking-[-0.01em]">{title}</h1>
          {subtitle && <p className="text-white/65 text-[13.5px] mt-1">{subtitle}</p>}
          <div className="h-[3px] w-11 rounded-full mx-auto mt-4" style={{ background: 'linear-gradient(90deg, #D9A72A, #F5DFA0)' }} />
        </div>

        {children}

        <p className="text-center text-[11.5px] text-white/40 mt-7">{footer || 'Powered by Geosys IT Solutions Pvt Ltd'}</p>
      </div>
    </div>
  )
}
