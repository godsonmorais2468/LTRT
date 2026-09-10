import { useState } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Menu, ChevronDown, LogOut, Search, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.png'

export default function AppShell({ menu, brand = 'LTRT' }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState(() => menu.find((g) => g.items)?.label ?? null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  function closeMobile() {
    setMobileOpen(false)
  }

  const desktopWidth = collapsed ? 'lg:w-[84px]' : 'lg:w-[278px]'

  return (
    <div className="h-screen overflow-hidden flex">
      <div className="ltrt-backdrop" />

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-[rgba(10,15,30,0.35)] backdrop-blur-md z-30 lg:hidden animate-[fadeIn_0.2s_ease-out]"
          onClick={closeMobile}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside
        className={`shrink-0 overflow-hidden z-40 w-[278px] max-w-[85vw]
          fixed lg:static inset-y-0 left-0
          transition-[width] duration-300 ease-out ${desktopWidth}
          transform transition-transform duration-300 ease-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        style={{
          background:
            'linear-gradient(178deg, #C4002F 0%, #A80027 28%, #7A0019 62%, #520011 88%, #3D000C 100%)',
          boxShadow: '4px 0 30px rgba(87, 0, 20, 0.22)',
        }}
      >
        <div className="relative h-full flex flex-col">
          {/* soft crimson glow + faint translucent shapes */}
          <div
            className="absolute -top-24 -right-16 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,60,110,0.28), transparent 68%)' }}
          />
          <div
            className="absolute top-1/3 -left-20 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.07), transparent 70%)' }}
          />

          {/* elegant gold decorative curve at the base */}
          <svg
            className="absolute bottom-0 left-0 w-full h-[46%] pointer-events-none"
            viewBox="0 0 280 320"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M-20 300 C 40 250, 20 150, 96 78 C 140 36, 190 20, 240 -10"
              stroke="url(#sbGoldA)"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M-30 322 C 46 268, 30 168, 118 96 C 168 54, 220 36, 280 4"
              stroke="url(#sbGoldB)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M-40 340 C 60 300, 120 240, 300 200 L 300 340 Z"
              fill="url(#sbDeep)"
              opacity="0.55"
            />
            <defs>
              <linearGradient id="sbGoldA" x1="0" y1="320" x2="240" y2="0">
                <stop offset="0%" stopColor="#D9A72A" stopOpacity="0" />
                <stop offset="35%" stopColor="#F5DFA0" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#D9A72A" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#D9A72A" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="sbGoldB" x1="0" y1="320" x2="280" y2="0">
                <stop offset="0%" stopColor="#F5DFA0" stopOpacity="0" />
                <stop offset="50%" stopColor="#F5DFA0" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#F5DFA0" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="sbDeep" x1="0" y1="200" x2="0" y2="340">
                <stop offset="0%" stopColor="#2E0008" stopOpacity="0" />
                <stop offset="100%" stopColor="#2E0008" stopOpacity="0.85" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative z-10 flex flex-col h-full">
            {/* Logo */}
            <div className={`h-[78px] flex items-center shrink-0 ${collapsed ? 'lg:justify-center lg:px-0' : 'px-6'}`}>
              <div
                className={`rounded-[14px] flex items-center justify-center shrink-0 ${collapsed ? 'p-1.5' : 'px-3 py-2'}`}
                style={{
                  background: 'linear-gradient(140deg, #FFFFFF, #FFF2F5)',
                  boxShadow: '0 6px 18px rgba(45,0,12,0.28), inset 0 1px 0 rgba(255,255,255,0.9)',
                }}
              >
                <img src={logo} alt={brand} className={collapsed ? 'h-6 w-auto' : 'h-7 w-auto'} />
              </div>
            </div>

            <div className={`h-px mx-6 mb-3 ${collapsed ? 'lg:hidden' : ''}`}
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)' }}
            />

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 pb-2 space-y-1.5 [scrollbar-width:thin]">
              {menu.map((entry) => {
                const Icon = entry.icon

                if (entry.items) {
                  const groupActive = entry.items.some((i) => location.pathname === i.to)
                  const isOpen = openGroup === entry.label
                  return (
                    <div key={entry.label}>
                      <button
                        onClick={() => setOpenGroup(isOpen ? null : entry.label)}
                        className={`group w-full flex items-center gap-3 px-3.5 py-3 rounded-[14px] text-[14.5px] font-medium
                          transition-all duration-[280ms] ease-out
                          ${groupActive ? 'text-white bg-white/[0.09]' : 'text-white/80 hover:text-white hover:bg-white/[0.08]'}`}
                      >
                        <Icon size={19} strokeWidth={1.9} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
                        <span className={`flex-1 text-left truncate ${collapsed ? 'lg:hidden' : ''}`}>{entry.label}</span>
                        <ChevronDown
                          size={16}
                          strokeWidth={2}
                          className={`shrink-0 text-white/55 transition-transform duration-300 ease-out ${collapsed ? 'lg:hidden' : ''} ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-[320ms] ease-out ${collapsed ? 'lg:hidden' : ''}`}
                        style={{ maxHeight: isOpen ? entry.items.length * 46 + 14 : 0, opacity: isOpen ? 1 : 0 }}
                      >
                        <div
                          className="mt-1.5 ml-[26px] pl-5 pb-1 space-y-0.5 relative"
                          style={{ borderLeft: '1px solid rgba(245,223,160,0.32)' }}
                        >
                          {entry.items.map((item) => (
                            <NavLink
                              key={item.to}
                              to={item.to}
                              onClick={closeMobile}
                              className={({ isActive }) =>
                                `group relative block pl-3 pr-3 py-2.5 rounded-[10px] text-[13.5px] leading-tight
                                 transition-all duration-[220ms] ease-out ${
                                   isActive
                                     ? 'text-[#F5DFA0] font-semibold bg-white/[0.06]'
                                     : 'text-white/60 hover:text-white hover:translate-x-1'
                                 }`
                              }
                            >
                              {({ isActive }) => (
                                <>
                                  <span
                                    className="absolute -left-[25px] top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full transition-all duration-[220ms]"
                                    style={{
                                      background: isActive ? '#F5DFA0' : 'rgba(245,223,160,0.4)',
                                      boxShadow: isActive ? '0 0 8px rgba(245,223,160,0.8)' : 'none',
                                    }}
                                  />
                                  {item.label}
                                </>
                              )}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                }

                return (
                  <NavLink
                    key={entry.to}
                    to={entry.to}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 px-3.5 py-3 rounded-[14px] text-[14.5px] font-semibold overflow-hidden
                       transition-all duration-[280ms] ease-out ${
                         isActive ? 'text-white' : 'text-white/80 hover:text-white hover:bg-white/[0.08] hover:translate-x-0.5'
                       }`
                    }
                    style={({ isActive }) =>
                      isActive
                        ? {
                            background: 'linear-gradient(100deg, #F0003F 0%, #D4003F 55%, #A80027 100%)',
                            boxShadow: '0 8px 22px rgba(240,0,70,0.38), inset 0 1px 0 rgba(255,255,255,0.28)',
                          }
                        : undefined
                    }
                  >
                    <Icon size={19} strokeWidth={1.9} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <span className={`truncate ${collapsed ? 'lg:hidden' : ''}`}>{entry.label}</span>
                  </NavLink>
                )
              })}
            </nav>

            <div className={`px-6 py-5 shrink-0 ${collapsed ? 'lg:hidden' : ''}`}>
              <p className="text-[11px] text-white/45 tracking-wide">LTRT 3.0 · Geosys IT Solutions</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main column ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Glass header */}
        <header
          className="h-[76px] flex items-center gap-3 px-4 sm:px-6 sticky top-0 z-20 glass"
          style={{ borderLeft: 0, borderRight: 0, borderTop: 0, borderRadius: 0 }}
        >
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-[var(--ltrt-text-secondary)] hover:text-[var(--ltrt-red)] hover:bg-white/70 p-2.5 rounded-[12px] transition-all duration-200 active:scale-90 shrink-0"
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.9} />
          </button>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden lg:flex text-[var(--ltrt-text-secondary)] hover:text-[var(--ltrt-red)] hover:bg-white/70 p-2.5 rounded-[12px] transition-all duration-200 active:scale-90 shrink-0"
            aria-label="Toggle sidebar"
          >
            <Menu size={21} strokeWidth={1.9} />
          </button>

          {/* Glass search */}
          <div className="relative flex-1 max-w-[640px] hidden sm:block ml-1">
            <Search size={17} strokeWidth={2} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--ltrt-text-secondary)]/70 pointer-events-none z-10" />
            <input
              placeholder="Search anything..."
              className="peer w-full rounded-full pl-[52px] pr-5 py-3 text-[14px] text-[var(--ltrt-text)] placeholder-[var(--ltrt-text-secondary)]/70 outline-none transition-all duration-[280ms]"
              style={{
                background: 'rgba(255,255,255,0.55)',
                WebkitBackdropFilter: 'blur(16px)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(21,42,70,0.18)',
                boxShadow: 'inset 0 1px 2px rgba(21,42,70,0.04)',
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 4px rgba(212,0,63,0.09), 0 6px 20px rgba(212,0,63,0.10)'
                e.target.style.background = 'rgba(255,255,255,0.85)'
                e.target.style.borderColor = 'rgba(212,0,63,0.4)'
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'inset 0 1px 2px rgba(21,42,70,0.04)'
                e.target.style.background = 'rgba(255,255,255,0.55)'
                e.target.style.borderColor = 'rgba(21,42,70,0.18)'
              }}
            />
          </div>

          <div className="flex-1 sm:hidden" />

          <div className="flex items-center gap-1 sm:gap-2 ml-auto shrink-0">
            <div className="flex items-center gap-2.5 pl-1 pr-2 sm:pr-3 py-1">
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
                style={{
                  background: 'linear-gradient(140deg, #F5C55A 0%, #D9A72A 55%, #B8871A 100%)',
                  boxShadow: '0 4px 12px rgba(217,167,42,0.35), inset 0 1px 0 rgba(255,255,255,0.5)',
                }}
              >
                <User size={17} strokeWidth={2} />
              </span>
              <span className="text-[14px] text-[var(--ltrt-text)] hidden sm:inline">
                Hi, <span className="font-semibold">{user?.name || 'Guest'}</span>
              </span>
            </div>

            <div className="hidden md:block w-px h-7 mx-1" style={{ background: 'rgba(21,42,70,0.10)' }} />

            <button
              onClick={handleLogout}
              aria-label="Sign Out"
              className="flex items-center gap-2 text-[14px] text-[var(--ltrt-text-secondary)] hover:text-[var(--ltrt-red)] font-medium px-2.5 py-2.5 sm:px-3 rounded-[12px] hover:bg-[rgba(212,0,63,0.06)] transition-all duration-200 active:scale-95"
            >
              <LogOut size={17} strokeWidth={1.9} />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-7 sm:py-7">
          <div key={location.pathname} className="animate-[pageIn_0.32s_cubic-bezier(0.16,1,0.3,1)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
