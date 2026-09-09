import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import logo from '../assets/logo.png'
import personPhoto from '../assets/mock-person-image.png'
import { mockDeck, mockDeckStats } from '../data/mock'

const TOTAL_SECONDS = 180
const ALERT_AT = 30

const fmtClock = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

/* Wizard uploads only record a filename, which is not a loadable source —
   fall back to the stock portrait unless a real data/URL src is present. */
const photoSrc = (photo) =>
  typeof photo === 'string' && /^(data:|https?:|\/)/.test(photo) ? photo : personPhoto

const fmtValue = (stat, value) => {
  if (stat.unit === '₹') return `₹${Math.abs(value).toLocaleString('en-IN')}`
  if (stat.unit === '%') return `${value}%`
  return String(value)
}

/* ============================================================
   STAGE — the red / gold luxury frame every slide sits inside
   ============================================================ */
function Stage({ children, footer }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg,#FFF7F8 0%,#FDEEF1 40%,#FFFFFF 100%)',
        containerType: 'size',
      }}
    >
      {/* red ribbons, top-left and bottom-right */}
      <svg className="absolute -top-[6%] -left-[8%] w-[46%] h-auto pointer-events-none" viewBox="0 0 400 300" fill="none" aria-hidden="true">
        <path d="M-40 0 C 90 10, 150 70, 250 40 C 320 20, 360 -20, 400 -40 L400 -80 L-40 -80 Z" fill="#B3001B" />
        <path d="M-40 -10 C 80 0, 140 60, 240 30 C 310 10, 350 -30, 400 -50" stroke="#E8B65A" strokeWidth="3" fill="none" />
        <path d="M-40 24 C 70 34, 130 96, 232 66 C 300 46, 344 6, 400 -14" stroke="#E8B65A" strokeWidth="1.5" fill="none" opacity="0.7" />
      </svg>
      <svg className="absolute -bottom-[6%] -right-[8%] w-[46%] h-auto pointer-events-none rotate-180" viewBox="0 0 400 300" fill="none" aria-hidden="true">
        <path d="M-40 0 C 90 10, 150 70, 250 40 C 320 20, 360 -20, 400 -40 L400 -80 L-40 -80 Z" fill="#B3001B" />
        <path d="M-40 -10 C 80 0, 140 60, 240 30 C 310 10, 350 -30, 400 -50" stroke="#E8B65A" strokeWidth="3" fill="none" />
        <path d="M-40 24 C 70 34, 130 96, 232 66 C 300 46, 344 6, 400 -14" stroke="#E8B65A" strokeWidth="1.5" fill="none" opacity="0.7" />
      </svg>

      {/* soft pink veils */}
      <div className="absolute -right-[10%] top-[6%] w-[42%] h-[70%] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at 40% 40%, rgba(240,0,63,0.10), transparent 62%)' }} />
      <div className="absolute -left-[6%] bottom-[8%] w-[34%] h-[46%] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(240,0,63,0.07), transparent 65%)' }} />

      {/* dot grid, top right */}
      <div className="absolute top-[4%] right-[4%] grid grid-cols-3 gap-[5px] pointer-events-none" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="w-[5px] h-[5px] rounded-full" style={{ background: '#D9A72A', opacity: 0.85 }} />
        ))}
      </div>

      {/* gold slashes + rule — sits above the chapter tag so the two never collide */}
      <div
        className="absolute left-[4%] flex items-center gap-2 pointer-events-none"
        style={{ bottom: 'clamp(46px, 7.5cqh, 92px)' }}
        aria-hidden="true"
      >
        <span className="flex gap-[3px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="block w-[2px] h-[11px] -skew-x-[25deg]" style={{ background: '#D9A72A' }} />
          ))}
        </span>
        <span className="block h-px w-[clamp(40px,9cqw,150px)]" style={{ background: '#D9A72A' }} />
      </div>

      {/* frosted glass panel holding the slide content */}
      <div className="absolute inset-[5%] sm:inset-[6%] rounded-[clamp(14px,2cqw,30px)] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.72), rgba(255,255,255,0.42))',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 20px 60px rgba(179,0,27,0.10), inset 0 1px 0 rgba(255,255,255,0.95)',
          WebkitBackdropFilter: 'blur(10px)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="h-full w-full px-[5%] py-[4.5%] flex flex-col min-h-0">{children}</div>
      </div>

      {footer}
    </div>
  )
}

function SlideTitle({ children, sub }) {
  return (
    <div className="shrink-0 mb-[3%]">
      <div className="flex items-center gap-2.5">
        <span className="h-[4px] w-[clamp(22px,2.6cqw,44px)] rounded-full shrink-0" style={{ background: 'linear-gradient(90deg,#D9A72A,#F5DFA0)' }} />
        <h2 className="font-extrabold tracking-[-0.02em] leading-none text-[#B3001B]"
          style={{ fontSize: 'clamp(19px, 4.6cqw, 74px)' }}>
          {children}
        </h2>
      </div>
      {sub && (
        <p className="mt-1.5 text-[#6E7E95] font-medium" style={{ fontSize: 'clamp(11px, 1.75cqw, 28px)' }}>{sub}</p>
      )}
    </div>
  )
}

/* Portrait on top, name and role stacked underneath.
   `size` shrinks the photo for the six-up Leadership Team grid. */
const PERSON_SIZES = {
  lg: { photo: 'clamp(72px,16cqw,330px)', name: 'clamp(13px,2.3cqw,42px)', role: 'clamp(9px,1.3cqw,24px)', pad: 'clamp(9px,1.8cqw,34px)' },
  md: { photo: 'clamp(50px,8cqw,168px)', name: 'clamp(11px,1.55cqw,28px)', role: 'clamp(8px,0.95cqw,16px)', pad: 'clamp(8px,1.15cqw,22px)' },
}

function PersonCard({ person, accent = '#B3001B', size = 'lg' }) {
  const s = PERSON_SIZES[size] ?? PERSON_SIZES.lg
  return (
    <div className="rounded-[clamp(10px,1.6cqw,28px)] flex flex-col items-center text-center min-w-0"
      style={{
        padding: s.pad,
        background: 'rgba(255,255,255,0.82)',
        border: '1px solid rgba(179,0,27,0.14)',
        boxShadow: '0 6px 18px rgba(179,0,27,0.07)',
      }}
    >
      <img
        src={photoSrc(person.photo)}
        alt={person.name}
        className="rounded-full object-cover object-top shrink-0"
        style={{
          width: s.photo, height: s.photo,
          border: `clamp(3px,0.4cqw,7px) solid ${accent}`,
          boxShadow: '0 6px 20px rgba(179,0,27,0.24)',
        }}
      />
      <p className="w-full font-bold text-[#152A46] leading-tight truncate mt-[6%]" style={{ fontSize: s.name }}>
        {person.name}
      </p>
      <p className="w-full uppercase tracking-[0.12em] truncate" style={{ fontSize: s.role, color: accent }}>
        {person.designation}
      </p>
    </div>
  )
}

/* ============================================================
   CHARACTERS — celebrate / disappointed, drawn inline
   ============================================================ */
function HappyCharacter() {
  return (
    <svg viewBox="0 0 160 180" className="w-full h-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="ltrtShirtWin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22CE96" /><stop offset="100%" stopColor="#0E8A60" />
        </linearGradient>
        <radialGradient id="ltrtGlowWin" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#19B985" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#19B985" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="80" cy="96" r="72" fill="url(#ltrtGlowWin)" />

      <g className="ltrt-cheer">
        {/* raised arms */}
        <path d="M52 104 L22 66" stroke="#F2C9A0" strokeWidth="13" strokeLinecap="round" />
        <path d="M108 104 L138 66" stroke="#F2C9A0" strokeWidth="13" strokeLinecap="round" />
        <circle cx="20" cy="62" r="9" fill="#F2C9A0" />
        <circle cx="140" cy="62" r="9" fill="#F2C9A0" />

        {/* body */}
        <path d="M52 98 Q80 88 108 98 L114 148 Q80 156 46 148 Z" fill="url(#ltrtShirtWin)" />
        <path d="M74 92 L80 112 L86 92" fill="#FFFFFF" opacity="0.9" />
        <rect x="58" y="148" width="16" height="26" rx="7" fill="#2E5A94" />
        <rect x="86" y="148" width="16" height="26" rx="7" fill="#2E5A94" />
        <rect x="54" y="170" width="22" height="9" rx="4.5" fill="#25405F" />
        <rect x="84" y="170" width="22" height="9" rx="4.5" fill="#25405F" />

        {/* head */}
        <ellipse cx="80" cy="56" rx="34" ry="35" fill="#F7D4B0" />
        <path d="M46 50 Q52 14 80 14 Q108 14 114 50 Q106 30 80 27 Q54 30 46 50 Z" fill="#3A2416" />
        <ellipse cx="46" cy="60" rx="6" ry="8" fill="#F2C9A0" />
        <ellipse cx="114" cy="60" rx="6" ry="8" fill="#F2C9A0" />
        <circle cx="67" cy="55" r="4.6" fill="#2B2B2B" />
        <circle cx="93" cy="55" r="4.6" fill="#2B2B2B" />
        <circle cx="68.6" cy="53.2" r="1.7" fill="#FFF" />
        <circle cx="94.6" cy="53.2" r="1.7" fill="#FFF" />
        <path d="M59 44 Q67 39 75 44" stroke="#3A2416" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M85 44 Q93 39 101 44" stroke="#3A2416" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M64 68 Q80 84 96 68 Z" fill="#7A0013" />
        <path d="M67 70 Q80 74 93 70 Z" fill="#FF7A8F" />
        <circle cx="56" cy="68" r="6" fill="#FF9BAF" opacity="0.55" />
        <circle cx="104" cy="68" r="6" fill="#FF9BAF" opacity="0.55" />
      </g>

      {/* confetti */}
      {[[14,40,'#F0003F'],[136,34,'#D9A72A'],[30,128,'#19B985'],[132,120,'#7C3AED'],[80,6,'#F0003F'],[52,20,'#D9A72A'],[112,16,'#19B985']].map(([x, y, c], i) => (
        <rect key={i} x={x} y={y} width="9" height="9" rx="2" fill={c} className="ltrt-confetti" style={{ animationDelay: `${i * 0.19}s` }} />
      ))}
    </svg>
  )
}

function SadCharacter() {
  return (
    <svg viewBox="0 0 160 180" className="w-full h-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="ltrtShirtLose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B97A8" /><stop offset="100%" stopColor="#5C6878" />
        </linearGradient>
        <radialGradient id="ltrtGlowLose" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6E7E95" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#6E7E95" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="80" cy="100" r="72" fill="url(#ltrtGlowLose)" />

      {/* rain cloud */}
      <g className="ltrt-cloud">
        <ellipse cx="80" cy="18" rx="34" ry="13" fill="#AEB9C8" />
        <ellipse cx="58" cy="21" rx="16" ry="11" fill="#C4CDDA" />
        <ellipse cx="102" cy="21" rx="16" ry="11" fill="#C4CDDA" />
        {[[62, 0], [80, 0.5], [98, 1]].map(([x, d], i) => (
          <ellipse key={i} cx={x} cy="34" rx="2.6" ry="5" fill="#7FB8E8" className="ltrt-tear" style={{ animationDelay: `${d}s` }} />
        ))}
      </g>

      <g className="ltrt-slump">
        {/* body first, then arms on top so they stay visible */}
        <path d="M52 106 Q80 98 108 106 L112 152 Q80 160 48 152 Z" fill="url(#ltrtShirtLose)" />
        <rect x="58" y="152" width="16" height="24" rx="7" fill="#3F4A5A" />
        <rect x="86" y="152" width="16" height="24" rx="7" fill="#3F4A5A" />

        {/* drooping arms, swung clear of the torso */}
        <path d="M53 108 Q34 128 26 156" stroke="#F2C9A0" strokeWidth="13" fill="none" strokeLinecap="round" />
        <path d="M107 108 Q126 128 134 156" stroke="#F2C9A0" strokeWidth="13" fill="none" strokeLinecap="round" />
        <circle cx="25" cy="160" r="9.5" fill="#F2C9A0" />
        <circle cx="135" cy="160" r="9.5" fill="#F2C9A0" />

        {/* head, tilted down */}
        <g transform="rotate(-7 80 66)">
          <ellipse cx="80" cy="66" rx="34" ry="35" fill="#F7D4B0" />
          <path d="M46 60 Q52 24 80 24 Q108 24 114 60 Q106 40 80 37 Q54 40 46 60 Z" fill="#3A2416" />
          <ellipse cx="46" cy="70" rx="6" ry="8" fill="#F2C9A0" />
          <ellipse cx="114" cy="70" rx="6" ry="8" fill="#F2C9A0" />
          <path d="M58 56 Q67 52 76 58" stroke="#3A2416" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M102 56 Q93 52 84 58" stroke="#3A2416" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="67" cy="68" r="4.4" fill="#2B2B2B" />
          <circle cx="93" cy="68" r="4.4" fill="#2B2B2B" />
          <circle cx="68.4" cy="66.4" r="1.6" fill="#FFF" />
          <circle cx="94.4" cy="66.4" r="1.6" fill="#FFF" />
          <ellipse cx="66" cy="76" rx="3" ry="5" fill="#7FB8E8" className="ltrt-tear" />
          <path d="M66 88 Q80 79 94 88" stroke="#2B2B2B" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}

/* ============================================================
   SLIDES
   ============================================================ */
function TitleSlide({ deck }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center min-h-0">
      <img src={logo} alt="BNI" className="object-contain" style={{ height: 'clamp(96px, 34cqh, 460px)' }} />
      <p className="font-extrabold text-[#152A46] tracking-[-0.01em] mt-[3%]" style={{ fontSize: 'clamp(20px, 5cqw, 84px)' }}>
        {deck.chapter}
      </p>
      <p className="font-extrabold text-[#B3001B] tracking-[0.06em] mt-[1.5%]" style={{ fontSize: 'clamp(15px, 3.2cqw, 54px)' }}>
        LTRT REPORT
      </p>
      <span className="block h-px my-[2.5%]" style={{ width: 'clamp(80px,18cqw,320px)', background: '#D9A72A' }} />
      <p className="font-semibold text-[#6E7E95]" style={{ fontSize: 'clamp(12px, 2.2cqw, 38px)' }}>
        {deck.month} {deck.year}
      </p>
      <p className="font-bold text-[#B3001B] tracking-[0.28em] uppercase mt-[2%]" style={{ fontSize: 'clamp(10px, 1.5cqw, 26px)' }}>
        {deck.region} REGION
      </p>
    </div>
  )
}

function PeopleSlide({ title, sub, people, cols, size = 'lg' }) {
  return (
    <>
      <SlideTitle sub={sub}>{title}</SlideTitle>
      <div className={`flex-1 min-h-0 grid ${cols} gap-[2%] content-center overflow-hidden`}>
        {people.map((p) => <PersonCard key={p.id} person={p} size={size} />)}
      </div>
    </>
  )
}

function StatsSlide({ deck, mode }) {
  const gains = mockDeckStats.filter((s) => s.current > s.previous)
  const losses = mockDeckStats.filter((s) => s.current <= s.previous)
  const highlighted = mode === 'gain' ? gains : mode === 'loss' ? losses : []

  const sub = mode === 'gain'
    ? 'Where the chapter grew this month'
    : mode === 'loss'
      ? 'Where the chapter needs attention'
      : `Current Strength ${deck.currentStrength}  ·  Set Goal ${deck.setGoal}`

  return (
    <>
      <SlideTitle sub={sub}>Chapter Stats</SlideTitle>

      <div className="flex-1 min-h-0 flex items-center gap-[3%]">
        <div className="flex-1 min-w-0 grid grid-cols-3 gap-[2%] content-center">
          {mockDeckStats.map((s) => {
            const delta = s.current - s.previous
            const up = delta > 0
            const on = highlighted.includes(s)
            const dim = mode !== 'plain' && !on
            return (
              <div
                key={s.key}
                className="rounded-[clamp(10px,1.5cqw,26px)] min-w-0 transition-all duration-500"
                style={{
                  padding: 'clamp(8px,1.6cqw,30px)',
                  background: on ? (up ? 'rgba(25,185,133,0.16)' : 'rgba(232,60,91,0.14)') : 'rgba(255,255,255,0.82)',
                  border: `1px solid ${on ? (up ? 'rgba(25,185,133,0.55)' : 'rgba(232,60,91,0.5)') : 'rgba(179,0,27,0.14)'}`,
                  boxShadow: on ? `0 10px 26px ${up ? 'rgba(25,185,133,0.24)' : 'rgba(232,60,91,0.22)'}` : '0 6px 18px rgba(179,0,27,0.06)',
                  opacity: dim ? 0.32 : 1,
                  transform: on ? 'scale(1.03)' : 'scale(1)',
                }}
              >
                <p className="uppercase tracking-[0.1em] text-[#6E7E95] truncate" style={{ fontSize: 'clamp(8px,1.15cqw,20px)' }}>
                  {s.label}
                </p>
                <p className="font-extrabold text-[#152A46] leading-none tabular-nums truncate mt-1"
                  style={{ fontSize: 'clamp(14px,2.25cqw,42px)' }}>
                  {fmtValue(s, s.current)}
                </p>
                <p className="font-bold tabular-nums mt-1"
                  style={{ fontSize: 'clamp(9px,1.4cqw,24px)', color: up ? '#0E8A60' : '#C42846' }}>
                  {up ? '▲' : '▼'} {fmtValue(s, Math.abs(delta))}
                </p>
              </div>
            )
          })}
        </div>

        {mode !== 'plain' && (
          <div className="shrink-0 flex flex-col items-center" style={{ width: 'clamp(120px,24cqw,460px)' }}>
            <div className="w-full aspect-[12/13]">
              {mode === 'gain' ? <HappyCharacter /> : <SadCharacter />}
            </div>
            <p className="font-extrabold text-center leading-tight mt-1"
              style={{ fontSize: 'clamp(15px,2.8cqw,50px)', color: mode === 'gain' ? '#0E8A60' : '#C42846' }}>
              {mode === 'gain' ? 'Hurray!' : 'Needs work'}
            </p>
          </div>
        )}
      </div>
    </>
  )
}

function ActivitiesSlide({ deck }) {
  return (
    <>
      <SlideTitle sub="What the chapter did this month">Activities</SlideTitle>
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-[2%] content-center overflow-hidden">
        {deck.activities.map((a, i) => (
          <div key={a.id} className="flex gap-[3%] min-w-0 rounded-[clamp(10px,1.5cqw,26px)]"
            style={{ padding: 'clamp(8px,1.6cqw,30px)', background: 'rgba(255,255,255,0.82)', border: '1px solid rgba(179,0,27,0.14)' }}>
            <span className="font-extrabold leading-none tabular-nums shrink-0"
              style={{ fontSize: 'clamp(18px,3.4cqw,60px)', color: 'rgba(179,0,27,0.35)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <p className="font-bold text-[#152A46] leading-snug truncate" style={{ fontSize: 'clamp(13px,2.1cqw,36px)' }}>{a.title}</p>
              <p className="text-[#6E7E95] leading-snug line-clamp-2" style={{ fontSize: 'clamp(9.5px,1.45cqw,25px)' }}>{a.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function InductionsSlide({ deck }) {
  return (
    <>
      <SlideTitle sub="Welcome to the chapter">New Inductions</SlideTitle>
      <div className="flex-1 min-h-0 grid grid-cols-3 gap-[2%] content-center overflow-hidden">
        {deck.inductions.map((e) => (
          <div key={e.id} className="rounded-[clamp(10px,1.5cqw,26px)] min-w-0 text-center"
            style={{
              padding: 'clamp(9px,1.8cqw,34px)',
              background: 'linear-gradient(160deg, rgba(255,255,255,0.92), rgba(255,236,240,0.85))',
              border: '1px solid rgba(179,0,27,0.18)',
              boxShadow: '0 10px 26px rgba(179,0,27,0.08)',
            }}
          >
            <img
              src={photoSrc(e.photo)}
              alt={e.name}
              className="rounded-full mx-auto object-cover object-top block"
              style={{
                width: 'clamp(58px,11cqw,230px)', height: 'clamp(58px,11cqw,230px)',
                border: 'clamp(3px,0.4cqw,7px) solid #F0003F',
                boxShadow: '0 6px 20px rgba(240,0,63,0.26)',
              }}
            />
            <p className="font-bold text-[#152A46] mt-2 truncate" style={{ fontSize: 'clamp(13px,2.1cqw,36px)' }}>{e.name}</p>
            <p className="text-[#6E7E95] truncate" style={{ fontSize: 'clamp(9.5px,1.45cqw,25px)' }}>{e.organization}</p>
            <p className="uppercase tracking-[0.12em] text-[#B3001B] truncate mt-1" style={{ fontSize: 'clamp(8.5px,1.2cqw,21px)' }}>{e.category}</p>
          </div>
        ))}
      </div>
    </>
  )
}

function ConclusionSlide({ deck }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center min-h-0">
      <p className="font-extrabold text-[#B3001B] tracking-[-0.02em] leading-none" style={{ fontSize: 'clamp(30px,8cqw,150px)' }}>
        {deck.conclusion.mainHeading}
      </p>
      <span className="block h-px my-[3%]" style={{ width: 'clamp(80px,18cqw,320px)', background: '#D9A72A' }} />
      <p className="font-semibold text-[#152A46]" style={{ fontSize: 'clamp(13px,2.6cqw,44px)' }}>{deck.conclusion.line1}</p>
      <p className="text-[#6E7E95] mt-1" style={{ fontSize: 'clamp(11px,2cqw,34px)' }}>{deck.conclusion.line2}</p>
      <img src={logo} alt="BNI" className="object-contain mt-[4%]" style={{ height: 'clamp(44px,12cqh,180px)' }} />
    </div>
  )
}

function RichSlide({ title, sub, html, empty }) {
  const hasContent = html && html.replace(/<[^>]*>/g, '').trim()
  return (
    <>
      <SlideTitle sub={sub}>{title}</SlideTitle>
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col justify-center">
        {hasContent ? (
          <div
            className="text-[#152A46] leading-relaxed [&_img]:max-h-[46%] [&_img]:rounded-[10px] [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-7 [&_ol]:pl-7"
            style={{ fontSize: 'clamp(13px,2.3cqw,42px)' }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <p className="italic text-[#9AA3AF]" style={{ fontSize: 'clamp(11px,1.8cqw,30px)' }}>{empty}</p>
        )}
      </div>
    </>
  )
}

/* Maps a Slide Preparation tab to the slide the audience will actually see. */
export function renderSection(tabKey, deck) {
  switch (tabKey) {
    case 'intro': return <TitleSlide deck={deck} />
    case 'headTable': return <PeopleSlide title="Head Table" sub={`${deck.chapter} leadership`} people={deck.headTable} cols="grid-cols-3" />
    case 'leadershipTeam': return <PeopleSlide title="Leadership Team" sub="Committee and coordinators" people={deck.leadershipTeam} cols="grid-cols-3" size="md" />
    case 'chapterStats': return <StatsSlide deck={deck} mode="plain" />
    case 'activities': return <ActivitiesSlide deck={deck} />
    case 'newInductions': return <InductionsSlide deck={deck} />
    case 'upcoming': return <RichSlide title="Upcoming" sub="Planned events and programs" html={deck.upcomingHtml} empty="Add planned events in the Upcoming editor." />
    default: return <ConclusionSlide deck={deck} />
  }
}

/* One slide rendered at 16:9 inside a modal — same theme as the live show. */
export function PreviewSlide({ tabKey, deck }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[14px]" style={{ aspectRatio: '16 / 9' }}>
      <Stage
        footer={
          <p
            className="absolute z-20 font-extrabold tracking-[0.14em] uppercase pointer-events-none text-[#B3001B] truncate"
            style={{ bottom: 'clamp(6px,1.6cqh,24px)', left: 'clamp(8px,2cqw,32px)', right: 'clamp(8px,2cqw,32px)', fontSize: 'clamp(8px,1.2cqw,20px)' }}
          >
            {deck.chapter} · {deck.region}
          </p>
        }
      >
        <div className="h-full min-h-0 flex flex-col">{renderSection(tabKey, deck)}</div>
      </Stage>
    </div>
  )
}

/* ============================================================
   PLAYER
   ============================================================ */
export default function SlidePlayer({ open, onClose, deck = mockDeck }) {
  const [index, setIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS)
  const shellRef = useRef(null)

  const slides = useMemo(() => [
    { key: 'title', render: () => <TitleSlide deck={deck} /> },
    { key: 'headTable', render: () => <PeopleSlide title="Head Table" sub={`${deck.chapter} leadership`} people={deck.headTable} cols="grid-cols-3" /> },
    { key: 'leadershipTeam', render: () => <PeopleSlide title="Leadership Team" sub="Committee and coordinators" people={deck.leadershipTeam} cols="grid-cols-3" size="md" /> },
    { key: 'stats', render: () => <StatsSlide deck={deck} mode="plain" /> },
    { key: 'statsGain', render: () => <StatsSlide deck={deck} mode="gain" /> },
    { key: 'statsLoss', render: () => <StatsSlide deck={deck} mode="loss" /> },
    { key: 'activities', render: () => <ActivitiesSlide deck={deck} /> },
    { key: 'inductions', render: () => <InductionsSlide deck={deck} /> },
    { key: 'conclusion', render: () => <ConclusionSlide deck={deck} /> },
  ], [deck])

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, slides.length - 1)), [slides.length])
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), [])

  /* reset + go full screen when the show starts */
  useEffect(() => {
    if (!open) return
    setIndex(0)
    setSecondsLeft(TOTAL_SECONDS)
    shellRef.current?.requestFullscreen?.().catch(() => {})
    return () => { if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {}) }
  }, [open])

  /* countdown — tick only; the updater must stay free of side effects */
  useEffect(() => {
    if (!open) return
    const id = setInterval(() => setSecondsLeft((s) => (s <= 0 ? 0 : s - 1)), 1000)
    return () => clearInterval(id)
  }, [open])

  /* the show closes itself once the clock runs out */
  useEffect(() => {
    if (open && secondsLeft === 0) onClose?.()
  }, [open, secondsLeft, onClose])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
      else if (['ArrowRight', ' ', 'PageDown', 'Enter'].includes(e.key)) { e.preventDefault(); next() }
      else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); prev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, next, prev, onClose])

  if (!open) return null

  const alert = secondsLeft <= ALERT_AT
  const isLast = index === slides.length - 1

  return createPortal(
    <div ref={shellRef} className="fixed inset-0 z-[9999] select-none" style={{ fontFamily: 'var(--ltrt-font-display)' }}>
      <Stage
        footer={
          <>
            {/* Under 30s the clock leaves the bar, jumps to centre-top and blinks. */}
            {alert && (
              <div
                className="absolute z-30 font-extrabold tabular-nums pointer-events-none ltrt-blink"
                style={{
                  top: 'clamp(8px,2cqh,26px)', left: '50%', transform: 'translateX(-50%)',
                  fontSize: 'clamp(30px,6cqw,84px)', color: '#F0003F',
                  textShadow: '0 4px 18px rgba(240,0,63,0.35)',
                }}
              >
                {fmtClock(secondsLeft)}
              </div>
            )}

            {/* one flex bar — left tag, centre controls, right clock; nothing can collide */}
            <div
              className="absolute z-20 flex items-center gap-2 sm:gap-4"
              style={{
                bottom: 'clamp(6px,1.6cqh,24px)',
                left: 'clamp(8px,2cqw,32px)',
                right: 'clamp(8px,2cqw,32px)',
              }}
            >
              <p
                className="flex-1 min-w-0 truncate font-extrabold tracking-[0.14em] uppercase text-[#B3001B]"
                style={{ fontSize: 'clamp(8px,1.2cqw,20px)' }}
              >
                {deck.chapter} · {deck.region}
              </p>

              <div className="shrink-0 flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={prev}
                  disabled={index === 0}
                  className="rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                  style={{ width: 'clamp(28px,3.4cqw,48px)', height: 'clamp(28px,3.4cqw,48px)', background: 'linear-gradient(135deg,#F0003F,#A80027)' }}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} strokeWidth={2.6} />
                </button>
                <span className="font-bold tabular-nums text-[#B3001B] whitespace-nowrap" style={{ fontSize: 'clamp(9px,1.2cqw,16px)' }}>
                  {index + 1} / {slides.length}
                </span>
                <button
                  onClick={isLast ? onClose : next}
                  className="rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95"
                  style={{ width: 'clamp(28px,3.4cqw,48px)', height: 'clamp(28px,3.4cqw,48px)', background: 'linear-gradient(135deg,#F0003F,#A80027)' }}
                  aria-label={isLast ? 'Finish' : 'Next slide'}
                >
                  <ChevronRight size={16} strokeWidth={2.6} />
                </button>
              </div>

              <p
                className="flex-1 min-w-0 text-right font-extrabold tabular-nums text-[#B3001B]"
                style={{ fontSize: 'clamp(14px,2.6cqw,40px)', visibility: alert ? 'hidden' : 'visible' }}
              >
                {fmtClock(secondsLeft)}
              </p>
            </div>

            <button
              onClick={onClose}
              className="absolute z-30 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              style={{
                top: 'clamp(8px,2cqh,26px)', right: 'clamp(10px,2cqw,32px)',
                width: 'clamp(28px,3cqw,42px)', height: 'clamp(28px,3cqw,42px)',
                background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(179,0,27,0.25)', color: '#B3001B',
              }}
              aria-label="Close presentation"
            >
              <X size={16} strokeWidth={2.6} />
            </button>
          </>
        }
      >
        <div key={slides[index].key} className="h-full min-h-0 flex flex-col animate-[slideIn_0.42s_cubic-bezier(0.16,1,0.3,1)]">
          {slides[index].render()}
        </div>
      </Stage>
    </div>,
    document.body
  )
}
