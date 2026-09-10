import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import logo from '../assets/logo.png'
import personPhoto from '../assets/mock-person-image.png'
import { mockDeck, mockDeckStats } from '../data/mock'

const TOTAL_SECONDS = 180
const ALERT_AT = 30
const EXTRA_SECONDS = 10

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
function Stage({ children, footer, chapter }) {
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

      {/* BNI + chapter mark — fixed top-right on every slide, clear of the close button */}
      {chapter && (
        <div
          className="absolute z-10 flex flex-col items-center pointer-events-none"
          style={{ top: 'clamp(8px,2.2cqh,28px)', right: 'clamp(10px,2.2cqw,34px)' }}
        >
          <img src={logo} alt="BNI" className="object-contain" style={{ height: 'clamp(30px,6cqh,90px)' }} />
          <span
            className="font-extrabold uppercase tracking-[0.1em] leading-tight mt-1"
            style={{ fontSize: 'clamp(11px,1.7cqw,28px)', color: '#B3001B' }}
          >
            {chapter}
          </span>
        </div>
      )}

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

      {/* frosted glass panel holding the slide content — bottom inset is larger than the
          sides so the footer band (slash + chapter tag) always has clearance beneath it */}
      <div
        className="absolute left-[5%] right-[5%] top-[5%] sm:left-[6%] sm:right-[6%] sm:top-[6%] rounded-[clamp(14px,2cqw,30px)] overflow-hidden"
        style={{
          bottom: 'clamp(76px, 13cqh, 150px)',
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
          style={{ fontSize: 'clamp(12px, 2.2cqw, 32px)' }}>
          {children}
        </h2>
      </div>
      {sub && (
        <p className="mt-1.5 text-[#6E7E95] font-medium" style={{ fontSize: 'clamp(9px, 1.3cqw, 20px)' }}>{sub}</p>
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
      <p className="w-full font-bold text-[#152A46] leading-tight mt-[6%]" style={{ fontSize: s.name }}>
        {person.name}
      </p>
      <p className="w-full uppercase tracking-[0.12em] leading-snug" style={{ fontSize: s.role, color: accent }}>
        {person.designation}
      </p>
    </div>
  )
}

/* ============================================================
   CHARACTERS — big animated emoji, celebrate / disappointed
   ============================================================ */
const HAPPY_SPARKLES = [
  { emoji: '🎉', top: '2%', left: '4%', delay: '0s' },
  { emoji: '✨', top: '0%', right: '6%', delay: '0.3s' },
  { emoji: '🎊', bottom: '4%', left: '0%', delay: '0.6s' },
  { emoji: '⭐', bottom: '2%', right: '2%', delay: '0.9s' },
]

const SAD_DROPS = [
  { left: '20%', delay: '0s' },
  { left: '50%', delay: '0.5s' },
  { left: '78%', delay: '1s' },
]

function HappyCharacter() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <span
        className="ltrt-emoji-bounce select-none"
        style={{ fontSize: 'clamp(44px,13cqw,170px)', lineHeight: 1 }}
        role="img"
        aria-label="Happy"
      >
        😄
      </span>
      {HAPPY_SPARKLES.map((p, i) => (
        <span
          key={i}
          className="absolute ltrt-emoji-pop select-none"
          style={{ fontSize: 'clamp(13px,3.2cqw,38px)', top: p.top, left: p.left, right: p.right, bottom: p.bottom, animationDelay: p.delay }}
          role="img"
          aria-hidden="true"
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

function SadCharacter() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <span
        className="ltrt-emoji-sad select-none"
        style={{ fontSize: 'clamp(44px,13cqw,170px)', lineHeight: 1 }}
        role="img"
        aria-label="Sad"
      >
        😢
      </span>
      {SAD_DROPS.map((p, i) => (
        <span
          key={i}
          className="absolute ltrt-emoji-drop select-none"
          style={{ fontSize: 'clamp(10px,2.3cqw,24px)', top: '56%', left: p.left, animationDelay: p.delay }}
          role="img"
          aria-hidden="true"
        >
          💧
        </span>
      ))}
    </div>
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

/* Columns follow the headcount (capped at 3 per row) instead of a fixed
   3-column grid — with fewer people the row would otherwise stay sparse
   and the cards would look undersized against all that leftover space. */
function PeopleSlide({ title, sub, people, size = 'lg' }) {
  const perRow = Math.min(people.length, 3) || 1
  return (
    <>
      <SlideTitle sub={sub}>{title}</SlideTitle>
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center overflow-hidden">
        <div
          className="grid gap-[3%]"
          style={{
            gridTemplateColumns: `repeat(${perRow}, minmax(0, 1fr))`,
            width: `${(perRow / 3) * 100}%`,
            minWidth: perRow < 3 ? '46%' : undefined,
          }}
        >
          {people.map((p) => <PersonCard key={p.id} person={p} size={size} />)}
        </div>
      </div>
    </>
  )
}

/* Chapter Stats: a performance table (this month vs previous vs running total
   against goal), a membership summary row, and two progress bars — same
   red/gold theme as the rest of the deck. Pressing Next while on this slide
   steps `phase` 0 → 1 → 2, popping the growth/attention character callout
   in over the same table instead of switching to a separate slide. */
function StatsOverviewSlide({ deck, phase = 0 }) {
  const business = mockDeckStats.find((s) => s.key === 'business')
  const memberAddition = mockDeckStats.find((s) => s.key === 'memberAddition')
  const memberDrops = mockDeckStats.find((s) => s.key === 'memberDrops')

  const newInducted = memberAddition.total
  const membershipDrop = memberDrops.total
  const netGrowth = newInducted + membershipDrop
  const currentMembership = deck.currentStrength
  const targetMembership = deck.setGoal
  const openingMembership = currentMembership - netGrowth

  const businessPct = Math.min(Math.round((business.total / business.goal) * 100), 100)
  const membershipPct = Math.min(Math.round((currentMembership / targetMembership) * 100), 100)

  const membershipCards = [
    { label: 'Opening Membership', value: openingMembership },
    { label: 'New Members Inducted', value: newInducted },
    { label: 'Membership Drop', value: membershipDrop },
    { label: 'Current Membership', value: currentMembership, accent: true },
    { label: 'Target Membership', value: targetMembership },
    { label: 'Net Growth', value: netGrowth, growth: true },
  ]

  const businessUp = business.current > business.previous
  const businessCards = [
    { label: 'Previous', value: fmtValue(business, business.previous) },
    { label: 'Current', value: fmtValue(business, business.current), accent: true },
    { label: 'Goal', value: fmtValue(business, business.goal) },
    { label: 'Comparison', value: businessUp ? 'Increased' : 'Decreased', color: businessUp ? '#0E8A60' : '#C42846' },
    { label: 'Total', value: fmtValue(business, business.total) },
  ]

  const cellStyle = {
    fontSize: 'clamp(6px,0.78cqw,12px)',
    padding: 'clamp(2px,0.45cqh,6px) clamp(4px,0.8cqw,12px)',
  }

  const sub = phase === 1
    ? 'Where the chapter grew this month'
    : phase === 2
      ? 'Where the chapter needs attention'
      : `Current Strength ${currentMembership}  ·  Set Goal ${targetMembership}`

  return (
    <div className="relative flex-1 min-h-0 flex flex-col">
      <SlideTitle sub={sub}>Chapter Stats</SlideTitle>

      <div className="flex-1 min-h-0 flex flex-col justify-center gap-[0.9%] overflow-hidden">
        <div
          className="w-full rounded-[clamp(8px,1.2cqw,18px)] overflow-hidden"
          style={{ border: '1px solid rgba(179,0,27,0.16)', boxShadow: '0 8px 24px rgba(179,0,27,0.08)' }}
        >
          <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                {['Stat', 'Goal', `${deck.month.slice(0, 3)} ${deck.year}`, 'Previous Month', 'Comparison', 'Total', 'Action Plan'].map((h, i) => (
                  <th
                    key={h}
                    className="font-bold text-white text-left uppercase tracking-[0.03em]"
                    style={{ ...cellStyle, background: i === 2 ? '#0E8A60' : 'linear-gradient(135deg, #B3001B, #7A0013)', overflowWrap: 'break-word', wordBreak: 'break-word' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockDeckStats.map((s, i) => {
                const up = s.current - s.previous > 0
                const on = (phase === 1 && up) || (phase === 2 && !up)
                const dim = phase > 0 && !on
                return (
                  <tr
                    key={s.key}
                    className="transition-all duration-500"
                    style={{
                      background: on ? (up ? 'rgba(25,185,133,0.14)' : 'rgba(232,60,91,0.12)') : i % 2 ? 'rgba(179,0,27,0.03)' : '#fff',
                      boxShadow: on ? `inset 0 0 0 1px ${up ? 'rgba(25,185,133,0.5)' : 'rgba(232,60,91,0.45)'}` : 'none',
                      opacity: dim ? 0.4 : 1,
                    }}
                  >
                    <td className="font-semibold text-[#152A46] truncate" style={cellStyle}>{s.label}</td>
                    <td className="text-[#6E7E95] truncate" style={cellStyle}>{fmtValue(s, s.goal)}</td>
                    <td className="font-extrabold text-white truncate" style={{ ...cellStyle, background: 'rgba(14,138,96,0.88)' }}>{fmtValue(s, s.current)}</td>
                    <td className="text-[#6E7E95] truncate" style={cellStyle}>{fmtValue(s, s.previous)}</td>
                    <td className="font-bold truncate" style={{ ...cellStyle, color: up ? '#0E8A60' : '#C42846' }}>{up ? 'Increased' : 'Decreased'}</td>
                    <td className="text-[#152A46] font-semibold truncate" style={cellStyle}>{fmtValue(s, s.total)}</td>
                    <td className="text-[#6E7E95] truncate" style={cellStyle}>—</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="flex gap-[2%] items-stretch mt-[1.6%]">
          {/* Sad callout blurs this column; happy phase highlights it instead. */}
          <div className="relative w-[58%] min-w-0">
            <div
              className="flex flex-col gap-[1%] rounded-[clamp(8px,1cqw,16px)] transition-all duration-500"
              style={{
                filter: phase === 2 ? 'blur(5px)' : 'none',
                opacity: phase === 2 ? 0.4 : 1,
                boxShadow: phase === 1 ? 'inset 0 0 0 2px rgba(25,185,133,0.55), 0 10px 26px rgba(25,185,133,0.22)' : 'none',
                transform: phase === 1 ? 'scale(1.015)' : 'scale(1)',
              }}
            >
              <div className="grid grid-cols-3 gap-[0.8%]">
                {membershipCards.map((c) => <StatBox key={c.label} c={c} />)}
              </div>
              <ProgressCard
                label="Membership Target"
                pct={membershipPct}
                caption={`Total: ${currentMembership} / Target: ${targetMembership}`}
              />
            </div>
            {phase === 2 && <CharacterCallout key={phase} kind="sad" />}
          </div>

          {/* Happy callout blurs this column; sad phase highlights it instead. */}
          <div className="relative flex-1 min-w-0">
            <div
              className="flex flex-col gap-[1%] rounded-[clamp(8px,1cqw,16px)] transition-all duration-500"
              style={{
                filter: phase === 1 ? 'blur(5px)' : 'none',
                opacity: phase === 1 ? 0.4 : 1,
                boxShadow: phase === 2 ? 'inset 0 0 0 2px rgba(232,60,91,0.5), 0 10px 26px rgba(232,60,91,0.2)' : 'none',
                transform: phase === 2 ? 'scale(1.015)' : 'scale(1)',
              }}
            >
              <div className="grid grid-cols-3 gap-[0.8%]">
                {businessCards.map((c) => <StatBox key={c.label} c={c} />)}
              </div>
              <ProgressCard
                label="Business Target"
                pct={businessPct}
                caption={`Achieved: ${fmtValue(business, business.total)} / Target: ${fmtValue(business, business.goal)}`}
              />
            </div>
            {phase === 1 && <CharacterCallout key={phase} kind="happy" />}
          </div>
        </div>
      </div>
    </div>
  )
}

/* A solid backdrop panel (not just the character) so the callout fully covers
   the blurred content behind it — on a narrow-but-tall mobile column, a bare
   emoji floating over blurred boxes still let their text show through around it. */
function CharacterCallout({ kind }) {
  const tint = kind === 'happy' ? 'rgba(25,185,133,0.4)' : 'rgba(232,60,91,0.35)'
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none animate-[fadeIn_0.35s_ease-out]">
      <div
        className="flex flex-col items-center justify-center rounded-[clamp(10px,1.4cqw,22px)]"
        style={{ width: '92%', height: '92%', background: 'rgba(255,255,255,0.94)', border: `2px solid ${tint}`, boxShadow: '0 10px 30px rgba(21,42,70,0.14)' }}
      >
        <div style={{ width: 'min(65%, clamp(56px,16cqw,220px))' }}>
          <div className="w-full aspect-[12/13]">
            {kind === 'happy' ? <HappyCharacter /> : <SadCharacter />}
          </div>
          <p className="font-extrabold text-center leading-tight mt-1" style={{ fontSize: 'clamp(11px,1.6cqw,28px)', color: kind === 'happy' ? '#0E8A60' : '#C42846' }}>
            {kind === 'happy' ? 'Hurray!' : 'Needs work'}
          </p>
        </div>
      </div>
    </div>
  )
}

/* Shared by the membership and business detail rows. */
function StatBox({ c }) {
  return (
    <div
      className="rounded-[clamp(7px,0.9cqw,14px)] text-center min-w-0"
      style={{
        padding: 'clamp(3px,0.65cqh,9px) clamp(3px,0.7cqw,9px)',
        background: c.accent ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.85)',
        border: `1px solid ${c.accent ? 'rgba(124,58,237,0.35)' : 'rgba(179,0,27,0.14)'}`,
      }}
    >
      <p className="uppercase tracking-[0.04em] text-[#6E7E95] truncate" style={{ fontSize: 'clamp(5.5px,0.64cqw,10px)' }}>
        {c.label}
      </p>
      <p
        className="font-extrabold leading-tight mt-1"
        style={{ fontSize: 'clamp(8.5px,1.1cqw,17px)', color: c.color || (c.growth ? '#0E8A60' : '#152A46'), overflowWrap: 'break-word', wordBreak: 'break-word' }}
      >
        {c.value}{c.growth && c.value > 0 ? ' ▲' : ''}
      </p>
    </div>
  )
}

function ProgressCard({ label, pct, caption }) {
  return (
    <div
      className="h-full flex flex-col justify-center rounded-[clamp(8px,1cqw,16px)] min-w-0"
      style={{ padding: 'clamp(4px,0.75cqh,11px) clamp(7px,1.1cqw,16px)', background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(179,0,27,0.14)' }}
    >
      <p className="font-bold text-[#152A46] truncate mb-1" style={{ fontSize: 'clamp(7.5px,0.95cqw,14px)' }}>{label}</p>
      <div className="w-full rounded-full overflow-hidden" style={{ height: 'clamp(4px,0.65cqh,8px)', background: 'rgba(179,0,27,0.12)' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#19B985,#0E8A60)' }} />
      </div>
      <div className="flex justify-between mt-1">
        <span className="font-bold" style={{ fontSize: 'clamp(6.5px,0.82cqw,12px)', color: '#0E8A60' }}>{pct}% Achieved</span>
        <span className="text-[#6E7E95]" style={{ fontSize: 'clamp(6px,0.75cqw,11px)' }}>{100 - pct}% Remaining</span>
      </div>
      <p className="text-center font-extrabold mt-1 truncate" style={{ fontSize: 'clamp(8px,1.05cqw,16px)', color: '#B3001B' }}>{caption}</p>
    </div>
  )
}

/* One activity per slide: title, a single photo/collage, and a caption line
   underneath it — matches the reference gallery-style activity slides. */
function ActivitySlide({ activity }) {
  return (
    <>
      <SlideTitle>{activity.title}</SlideTitle>
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          className="object-contain shrink"
          style={{
            maxHeight: activity.description ? '86%' : '99%',
            maxWidth: '100%',
            borderRadius: 'clamp(6px,1cqw,16px)',
            border: '1px solid rgba(179,0,27,0.14)',
            boxShadow: '0 10px 30px rgba(179,0,27,0.12)',
          }}
        />
        {activity.description && (
          <p
            className="text-center text-[#6E7E95] mt-[1.2%] px-[2%] shrink-0"
            style={{ fontSize: 'clamp(9px,1.25cqw,19px)' }}
          >
            {activity.description}
          </p>
        )}
      </div>
    </>
  )
}

/* Numbered event list — each row gets a red number tag and a light step-in
   indent so the list reads with the same energy as the reference deck,
   without literally copying its uneven hand-typed spacing. */
function UpcomingEventsSlide({ deck }) {
  const events = deck.upcomingEvents || []
  return (
    <>
      <SlideTitle sub="Mark your calendars">Upcoming Events</SlideTitle>
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-[2.4%] overflow-hidden">
        {events.map((event, i) => (
          <div key={i} className="flex items-center gap-[2.2%] min-w-0">
            <span
              className="shrink-0 flex items-center justify-center font-extrabold text-white"
              style={{
                width: 'clamp(20px,2.8cqw,42px)', height: 'clamp(20px,2.8cqw,42px)',
                fontSize: 'clamp(10px,1.4cqw,22px)',
                borderRadius: 'clamp(5px,0.7cqw,10px)',
                background: 'linear-gradient(135deg, #F0003F, #A80027)',
                boxShadow: '0 4px 12px rgba(179,0,27,0.28)',
              }}
            >
              {i + 1}
            </span>
            <p
              className="italic font-bold text-[#152A46] truncate"
              style={{ fontSize: 'clamp(11px,1.9cqw,29px)' }}
            >
              {event}
            </p>
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
    case 'headTable': return <PeopleSlide title="Head Table" sub={`${deck.chapter} leadership`} people={deck.headTable} />
    case 'leadershipTeam': return <PeopleSlide title="Leadership Team" sub="Committee and coordinators" people={deck.leadershipTeam} />
    case 'chapterStats': return <StatsSlide deck={deck} mode="plain" />
    case 'activities': return <ActivitySlide activity={deck.activities[0]} />
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
        chapter={deck.chapter}
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
  /* Chapter Stats is one slide, not three — pressing Next while on it steps
     through 0 (plain) → 1 (growth callout) → 2 (attention callout) before
     Next actually advances to the following slide. */
  const [statsPhase, setStatsPhase] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS)
  const [extraTime, setExtraTime] = useState(false)
  const [extraSecondsLeft, setExtraSecondsLeft] = useState(EXTRA_SECONDS)
  const shellRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const slides = useMemo(() => [
    { key: 'title', render: () => <TitleSlide deck={deck} /> },
    { key: 'headTable', render: () => <PeopleSlide title="Head Table" sub={`${deck.chapter} leadership`} people={deck.headTable} /> },
    { key: 'leadershipTeam', render: () => <PeopleSlide title="Leadership Team" sub="Committee and coordinators" people={deck.leadershipTeam} /> },
    { key: 'stats', render: () => <StatsOverviewSlide deck={deck} phase={0} /> },
    ...deck.activities.map((a) => ({ key: `activity-${a.id}`, render: () => <ActivitySlide activity={a} /> })),
    { key: 'upcomingEvents', render: () => <UpcomingEventsSlide deck={deck} /> },
    { key: 'inductions', render: () => <InductionsSlide deck={deck} /> },
    { key: 'conclusion', render: () => <ConclusionSlide deck={deck} /> },
  ], [deck])

  const next = useCallback(() => {
    if (slides[index]?.key === 'stats' && statsPhase < 2) {
      setStatsPhase((p) => p + 1)
      return
    }
    setStatsPhase(0)
    setIndex((i) => Math.min(i + 1, slides.length - 1))
  }, [slides, index, statsPhase])

  const prev = useCallback(() => {
    if (slides[index]?.key === 'stats' && statsPhase > 0) {
      setStatsPhase((p) => p - 1)
      return
    }
    const ni = Math.max(index - 1, 0)
    if (slides[ni]?.key === 'stats') setStatsPhase(2)
    setIndex(ni)
  }, [slides, index, statsPhase])

  /* Reset, go full screen, and drive the whole countdown from one interval keyed
     off local elapsed time. A previous run can leave secondsLeft/extraTime/
     extraSecondsLeft at their finished values (0 / true / 0); splitting the
     countdown across several effects meant those stale values were briefly
     visible to each other on the very next open and closed the show instantly.
     A single effect with its own local `elapsed` counter has no such race —
     it always starts counting from zero exactly when `open` becomes true. */
  useEffect(() => {
    if (!open) return
    setIndex(0)
    setStatsPhase(0)
    setSecondsLeft(TOTAL_SECONDS)
    setExtraTime(false)
    setExtraSecondsLeft(EXTRA_SECONDS)
    shellRef.current?.requestFullscreen?.().catch(() => {})

    let elapsed = 0
    const id = setInterval(() => {
      elapsed += 1
      if (elapsed <= TOTAL_SECONDS) {
        setSecondsLeft(TOTAL_SECONDS - elapsed)
      } else {
        const remaining = Math.max(EXTRA_SECONDS - (elapsed - TOTAL_SECONDS), 0)
        setExtraTime(true)
        setExtraSecondsLeft(remaining)
        if (remaining === 0) {
          clearInterval(id)
          onCloseRef.current?.()
        }
      }
    }, 1000)

    return () => {
      clearInterval(id)
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
    }
  }, [open])

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
        chapter={deck.chapter}
        footer={
          <>
            {/* Extra Time — once the main clock runs out, a red 10s countdown takes over. */}
            {extraTime && (
              <div
                className="absolute z-30 flex flex-col items-center pointer-events-none ltrt-blink"
                style={{ top: 'clamp(8px,2cqh,26px)', left: '50%', transform: 'translateX(-50%)' }}
              >
                <span
                  className="font-extrabold uppercase tracking-[0.12em] leading-none"
                  style={{ fontSize: 'clamp(12px,2.4cqw,30px)', color: '#F0003F' }}
                >
                  Extra Time!
                </span>
                <span
                  className="font-extrabold tabular-nums leading-none mt-1"
                  style={{ fontSize: 'clamp(28px,5.6cqw,78px)', color: '#F0003F', textShadow: '0 4px 18px rgba(240,0,63,0.35)' }}
                >
                  {fmtClock(extraSecondsLeft)}
                </span>
              </div>
            )}

            {/* Under 30s of the main clock, the timer leaves the bar, jumps to centre-top and blinks. */}
            {!extraTime && alert && (
              <div
                className="absolute z-30 font-extrabold tabular-nums pointer-events-none ltrt-blink"
                style={{
                  top: 'clamp(8px,2cqh,26px)', left: '50%', transform: 'translateX(-50%)',
                  fontSize: 'clamp(30px,6cqw,84px)', color: '#F2A900',
                  textShadow: '0 4px 18px rgba(242,169,0,0.35)',
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
                className="flex-1 min-w-0 text-right font-extrabold tabular-nums"
                style={{ fontSize: 'clamp(14px,2.6cqw,40px)', color: '#F2A900', visibility: (alert || extraTime) ? 'hidden' : 'visible' }}
              >
                {fmtClock(secondsLeft)}
              </p>
            </div>

            <button
              onClick={onClose}
              className="absolute z-30 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              style={{
                top: 'clamp(8px,2cqh,26px)', left: 'clamp(10px,2.2cqw,34px)',
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
          {slides[index].key === 'stats' ? <StatsOverviewSlide deck={deck} phase={statsPhase} /> : slides[index].render()}
        </div>
      </Stage>
    </div>,
    document.body
  )
}
