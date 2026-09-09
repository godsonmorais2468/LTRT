import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Phone, Lock, RefreshCw, ShieldCheck, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import logo from '../../assets/logo.png'
import loginBgDesktop from '../../assets/login-bg.png'
import loginBgMobile from '../../assets/login-bg-mobile.png'

const LOGIN_TYPES = [
  { value: 'chapter', label: 'Chapter' },
  { value: 'superadmin', label: 'Region' },
]

function randomCaptcha() {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('')
}

const FIELD_BORDER = 'rgba(21,42,70,0.10)'
const fieldStyle = {
  background: 'rgba(255,255,255,0.78)',
  border: `1px solid ${FIELD_BORDER}`,
  boxShadow: 'inset 0 1px 2px rgba(21,42,70,0.04)',
}

function focusOn(e) {
  e.target.style.borderColor = 'rgba(212,0,63,0.45)'
  e.target.style.boxShadow = '0 0 0 4px rgba(212,0,63,0.10)'
  e.target.style.background = 'rgba(255,255,255,0.96)'
}
function focusOff(e) {
  e.target.style.borderColor = FIELD_BORDER
  e.target.style.boxShadow = fieldStyle.boxShadow
  e.target.style.background = fieldStyle.background
}

/* Red app-tile brand mark — the BNI wordmark knocked out to white on crimson. */
function BrandMark({ className = '', logoClass = 'h-6' }) {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{
        background: 'linear-gradient(145deg, #F02038 0%, #D4001F 45%, #A00018 100%)',
        boxShadow: '0 10px 24px rgba(90,0,15,0.35), inset 0 1px 0 rgba(255,255,255,0.35)',
      }}
    >
      <img src={logo} alt="BNI" className={`${logoClass} w-auto`} style={{ filter: 'brightness(0) invert(1)' }} />
    </span>
  )
}

/* Backdrop artwork — landscape plate on desktop, portrait plate on phones. */
function Backdrop() {
  const base = 'absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none'
  return (
    <>
      <div className={`${base} hidden lg:block`} style={{ backgroundImage: `url(${loginBgDesktop})` }} aria-hidden="true" />
      <div className={`${base} lg:hidden`} style={{ backgroundImage: `url(${loginBgMobile})` }} aria-hidden="true" />
    </>
  )
}

export default function Login() {
  const [loginType, setLoginType] = useState('chapter')
  const role = loginType === 'superadmin' ? 'superadmin' : 'chapter_admin'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [captcha, setCaptcha] = useState(randomCaptcha)
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaSpin, setCaptchaSpin] = useState(0)
  const { login } = useAuth()
  const navigate = useNavigate()

  function refreshCaptcha() {
    setCaptcha(randomCaptcha())
    setCaptchaSpin((s) => s + 1)
  }

  function submit(e) {
    e.preventDefault()
    const label = role === 'superadmin' ? 'Superadmin' : 'Admin'
    const dest = login(role, username || label, { chapter: '' })
    navigate(dest)
  }

  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-4 py-4 sm:py-8 overflow-y-auto overflow-x-hidden"
      style={{ fontFamily: 'var(--ltrt-font-display)', background: '#A80022' }}
    >
      <Backdrop />

      <div className="relative z-10 w-full flex items-center justify-center">
        {/* ── Desktop brand block, sits in the red field ─────────── */}
        <div className="hidden lg:block absolute left-[3%] xl:left-[7%] top-1/2 -translate-y-1/2 w-[230px] xl:w-[280px] text-white">
          <BrandMark className="w-[78px] h-[78px] rounded-[22px]" logoClass="h-9" />
          <h2 className="text-[40px] xl:text-[46px] font-bold tracking-[-0.02em] leading-none mt-7">LTRT 3.0</h2>
          <p className="text-[13px] tracking-[0.32em] text-white/80 mt-2.5 uppercase">Login Panel</p>
          <div className="w-9 h-[3px] rounded-full my-6" style={{ background: 'rgba(120,0,18,0.7)' }} />
          <p className="text-[14px] tracking-[0.06em] text-white/85 leading-[1.8]">
            Stronger Connections.<br />Bigger Opportunities.
          </p>
          <div className="w-7 h-[2px] rounded-full mt-16 mb-4" style={{ background: 'rgba(255,255,255,0.45)' }} />
          <p className="text-[12px] tracking-[0.1em] text-white/60 leading-[1.7]">
            Business Networking<br />Made Simple
          </p>
        </div>

        {/* ── Desktop right rail ─────────────────────────────────── */}
        <div className="hidden xl:flex absolute right-[5%] top-1/2 -translate-y-1/2 items-stretch gap-4">
          <div className="w-[2px] rounded-full" style={{ background: 'rgba(150,20,35,0.30)' }} />
          <div className="text-[11px] tracking-[0.34em] uppercase leading-[2.4]" style={{ color: 'rgba(120,30,40,0.55)' }}>
            <p>Connect</p>
            <p>Collaborate</p>
            <p>Grow</p>
          </div>
        </div>

        {/* ── Card column ────────────────────────────────────────── */}
        <div className="w-full max-w-[330px] sm:max-w-[430px]">
          <div
            className="relative rounded-[24px] sm:rounded-[30px] overflow-hidden animate-[modalPop_0.45s_cubic-bezier(0.16,1,0.3,1)]"
            style={{
              background: 'rgba(255,255,255,0.62)',
              WebkitBackdropFilter: 'blur(30px) saturate(150%)',
              backdropFilter: 'blur(30px) saturate(150%)',
              border: '1px solid rgba(255,255,255,0.55)',
              boxShadow: '0 30px 70px rgba(70,0,18,0.32), inset 0 1px 0 rgba(255,255,255,0.65)',
            }}
          >
            {/* frosted sheen across the top-left corner */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.06) 42%, rgba(255,255,255,0) 70%)' }}
            />

            <div className="relative p-4 sm:p-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-3.5 sm:mb-6">
                <BrandMark className="w-[44px] h-[44px] sm:w-[62px] sm:h-[62px] rounded-[13px] sm:rounded-[17px]" logoClass="h-5 sm:h-7" />
                <div className="min-w-0">
                  <h1 className="text-[19px] sm:text-[26px] font-bold tracking-[-0.01em] leading-none" style={{ color: '#D4001F' }}>
                    LTRT 3.0
                  </h1>
                  <p className="text-[12px] sm:text-[15px] leading-none mt-1 sm:mt-2 text-[var(--ltrt-text-secondary)]">Login Panel</p>
                </div>
              </div>

              <div className="flex gap-2 mb-3.5 sm:mb-5" role="tablist" aria-label="Login as">
                {LOGIN_TYPES.map((t) => (
                  <button
                    type="button"
                    key={t.value}
                    role="tab"
                    aria-selected={loginType === t.value}
                    onClick={() => setLoginType(t.value)}
                    className="flex-1 text-[12.5px] sm:text-[15px] font-semibold py-2 sm:py-3 rounded-full transition-all duration-[240ms] active:scale-[0.97]"
                    style={
                      loginType === t.value
                        ? {
                            background: 'linear-gradient(145deg, #E8102F, #C4001F 60%, #A00018)',
                            color: '#fff',
                            boxShadow: '0 8px 20px rgba(160,0,25,0.35), inset 0 1px 0 rgba(255,255,255,0.3)',
                          }
                        : {
                            background: 'rgba(255,255,255,0.42)',
                            border: '1px solid rgba(255,255,255,0.55)',
                            color: 'var(--ltrt-text-secondary)',
                          }
                    }
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <form onSubmit={submit} className="space-y-2.5 sm:space-y-3.5">
                <div className="relative">
                  <Phone size={15} strokeWidth={1.9} className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-[var(--ltrt-text-secondary)]/65 z-10" />
                  <label htmlFor="mobile-number" className="sr-only">Mobile number</label>
                  <input
                    id="mobile-number"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Mobile number"
                    autoComplete="tel"
                    className="w-full rounded-full pl-[40px] sm:pl-[52px] pr-4 sm:pr-5 py-2.5 sm:py-3.5 text-[13px] sm:text-[15px] text-[var(--ltrt-text)] placeholder-[var(--ltrt-text-secondary)]/60 outline-none transition-all duration-200"
                    style={fieldStyle}
                    onFocus={focusOn}
                    onBlur={focusOff}
                  />
                </div>

                <div className="relative">
                  <Lock size={15} strokeWidth={1.9} className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-[var(--ltrt-text-secondary)]/65 z-10" />
                  <label htmlFor="pin" className="sr-only">PIN</label>
                  <input
                    id="pin"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="PIN"
                    autoComplete="current-password"
                    className="w-full rounded-full pl-[40px] sm:pl-[52px] pr-4 sm:pr-5 py-2.5 sm:py-3.5 text-[13px] sm:text-[15px] text-[var(--ltrt-text)] placeholder-[var(--ltrt-text-secondary)]/60 outline-none transition-all duration-200"
                    style={fieldStyle}
                    onFocus={focusOn}
                    onBlur={focusOff}
                  />
                </div>

                <div className="flex items-center justify-between py-0.5 sm:py-1">
                  <span className="text-[12.5px] sm:text-[15px] font-medium" style={{ color: '#D4001F' }}>Remember me</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={remember}
                    aria-label="Remember me"
                    onClick={() => setRemember((r) => !r)}
                    className="w-[46px] h-[25px] rounded-full transition-all duration-[280ms] relative active:scale-95 shrink-0"
                    style={{
                      background: remember
                        ? 'linear-gradient(145deg, #E8102F, #B80020)'
                        : 'rgba(21,42,70,0.16)',
                      boxShadow: remember ? '0 4px 12px rgba(180,0,30,0.30)' : 'inset 0 1px 3px rgba(21,42,70,0.12)',
                    }}
                  >
                    <span
                      className="absolute top-[3px] w-[19px] h-[19px] rounded-full bg-white transition-all duration-[280ms] ease-out"
                      style={{ left: remember ? '24px' : '3px', boxShadow: '0 2px 6px rgba(0,0,0,0.22)' }}
                    />
                  </button>
                </div>

                <div className="flex gap-2 sm:gap-2.5">
                  <div
                    className="rounded-[13px] sm:rounded-[16px] px-3 sm:px-4 flex items-center font-semibold text-[14px] sm:text-[17px] tracking-[0.1em] text-[var(--ltrt-text)] select-none shrink-0"
                    style={{
                      ...fieldStyle,
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontStyle: 'italic',
                      textDecoration: 'line-through',
                      textDecorationStyle: 'wavy',
                    }}
                  >
                    {captcha}
                  </div>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="rounded-[13px] sm:rounded-[16px] w-[42px] sm:w-[52px] flex items-center justify-center text-white transition-all duration-200 active:scale-95 shrink-0"
                    style={{
                      background: 'linear-gradient(145deg, #E8102F, #B80020)',
                      boxShadow: '0 6px 16px rgba(160,0,25,0.32), inset 0 1px 0 rgba(255,255,255,0.28)',
                    }}
                    aria-label="Refresh captcha"
                  >
                    <RefreshCw
                      size={16}
                      strokeWidth={2.1}
                      style={{ transform: `rotate(${captchaSpin * 360}deg)`, transition: 'transform 0.5s ease' }}
                    />
                  </button>
                  <div className="relative flex-1 min-w-0">
                    <Lock size={14} strokeWidth={1.9} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[var(--ltrt-text-secondary)]/60 z-10" />
                    <label htmlFor="captcha-code" className="sr-only">Code</label>
                    <input
                      id="captcha-code"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Code"
                      className="w-full rounded-[13px] sm:rounded-[16px] pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3.5 text-[13px] sm:text-[15px] text-[var(--ltrt-text)] placeholder-[var(--ltrt-text-secondary)]/60 outline-none transition-all duration-200"
                      style={fieldStyle}
                      onFocus={focusOn}
                      onBlur={focusOff}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 sm:gap-2.5 text-white py-3 sm:py-4 rounded-full text-[14px] sm:text-[17px] font-semibold
                    transition-all duration-[240ms] hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.98] active:translate-y-0"
                  style={{
                    background: 'linear-gradient(145deg, #E8102F 0%, #C4001F 55%, #A00018 100%)',
                    boxShadow: '0 14px 30px rgba(160,0,25,0.38), inset 0 1px 0 rgba(255,255,255,0.3)',
                  }}
                >
                  <ShieldCheck size={16} strokeWidth={2} /> Login Now <ArrowRight size={15} strokeWidth={2.2} />
                </button>

                <p className="text-center pt-1 sm:pt-2">
                  <Link to="/forget-password" className="text-[13px] sm:text-[15px] font-semibold transition-colors duration-200" style={{ color: '#D4001F' }}>
                    Forgot Password?
                  </Link>
                </p>
              </form>

              <div className="mt-3 pt-2.5 sm:mt-5 sm:pt-4" style={{ borderTop: '1px solid rgba(21,42,70,0.09)' }}>
                <p className="text-center text-[10.5px] sm:text-[12px] text-[var(--ltrt-text-secondary)]/80">Powered by Geosys IT Solutions Pvt Ltd</p>
              </div>
            </div>
          </div>

          {/* Mobile footer lockup */}
          <div className="lg:hidden flex flex-col items-center mt-3.5 sm:mt-7">
            <div className="w-8 h-[2px] rounded-full mb-2 sm:mb-4" style={{ background: 'rgba(142,0,24,0.45)' }} />
            <p className="text-center text-[10px] sm:text-[12px] tracking-[0.14em] leading-[1.7]" style={{ color: 'rgba(142,0,24,0.9)' }}>
              Business Networking<br />Made Simple
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
