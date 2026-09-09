import { ArrowRight, ChevronRight, ChevronLeft, TrendingUp, Construction, Sparkles, Search, X, CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react'

/* ============================================================
   PAGE HEADER — gold rule + navy title + muted description.
   Identical on every page; only the words change.
   ============================================================ */
export function PageHeader({ title, subtitle, meta, action }) {
  return (
    <div className="mb-6">
      <div
        className="h-[3px] w-11 rounded-full mb-3.5"
        style={{ background: 'linear-gradient(90deg, #D9A72A, #F5DFA0)' }}
      />
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[var(--ltrt-navy)] tracking-[-0.02em] leading-tight">
            {title}
            {meta && <span className="ml-2.5 text-[15px] font-normal text-[var(--ltrt-text-secondary)]/80">{meta}</span>}
          </h1>
          {subtitle && <p className="text-[14.5px] text-[var(--ltrt-text-secondary)] mt-1.5">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  )
}

/* ============================================================
   CARD — the base frosted glass surface
   ============================================================ */
export function Card({ children, className = '', hover = true }) {
  return (
    <div className={`glass ${hover ? 'glass-hover' : ''} rounded-[20px] ${className}`}>
      {children}
    </div>
  )
}

/* ============================================================
   STAT CARD — glass KPI with pastel icon + integrated curve
   ============================================================ */
const ACCENTS = {
  rose: { tint: 'rgba(240,0,70,0.10)', icon: '#D4003F', wave: '#F0003F' },
  amber: { tint: 'rgba(217,167,42,0.14)', icon: '#C08F16', wave: '#D9A72A' },
  emerald: { tint: 'rgba(25,185,133,0.12)', icon: '#0E9A6C', wave: '#19B985' },
  orange: { tint: 'rgba(242,169,0,0.13)', icon: '#E08A00', wave: '#F2A900' },
  sky: { tint: 'rgba(16,35,63,0.09)', icon: '#2E5A94', wave: '#3D6FB0' },
}

export function StatCard({ label, value, icon: Icon, accent = 'rose', trend }) {
  const a = ACCENTS[accent] || ACCENTS.rose
  return (
    <div className="group glass glass-hover rounded-[20px] overflow-hidden">
      {/* translucent curve fused into the lower edge of the glass */}
      <svg
        className="absolute bottom-0 right-0 w-[62%] h-[46%] pointer-events-none transition-opacity duration-[280ms] group-hover:opacity-100"
        viewBox="0 0 200 100"
        fill="none"
        preserveAspectRatio="none"
        style={{ opacity: 0.62 }}
      >
        <path d="M0 72 C 46 30, 92 92, 138 52 S 186 20, 200 34 L200 100 L0 100 Z" fill={`url(#w-${accent})`} />
        <defs>
          <linearGradient id={`w-${accent}`} x1="0" y1="0" x2="120" y2="100">
            <stop offset="0%" stopColor={a.wave} stopOpacity="0.05" />
            <stop offset="100%" stopColor={a.wave} stopOpacity="0.24" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative p-5 sm:p-[22px]">
        <div className="flex items-start justify-between">
          {Icon && (
            <div
              className="w-[54px] h-[54px] rounded-[17px] flex items-center justify-center shrink-0 transition-transform duration-[280ms] group-hover:scale-105"
              style={{
                background: a.tint,
                color: a.icon,
                border: '1px solid rgba(255,255,255,0.75)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              <Icon size={24} strokeWidth={1.9} />
            </div>
          )}
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--ltrt-text-secondary)]/70
              transition-all duration-[240ms] hover:scale-110 hover:text-[var(--ltrt-red)] active:scale-95"
            style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.8)' }}
          >
            <ChevronRight size={15} strokeWidth={2.2} />
          </button>
        </div>

        <p className="text-[14px] text-[var(--ltrt-text-secondary)] mt-4">{label}</p>
        <p className="text-[34px] font-extrabold text-[var(--ltrt-navy)] mt-0.5 tabular-nums leading-none tracking-[-0.02em]">{value}</p>

        <div className="flex items-center gap-1.5 mt-4 text-[12.5px]">
          <TrendingUp size={14} strokeWidth={2.2} style={{ color: 'var(--ltrt-success)' }} />
          <span className="text-[var(--ltrt-text-secondary)]/85">{trend || '—'}</span>
          <span className="text-[var(--ltrt-text-secondary)]/70">vs. last month</span>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   ACTION PILL — crimson glass quick action
   ============================================================ */
export function ActionPill({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group glass-red flex items-center gap-2.5 text-white text-[13.5px] font-semibold
        pl-4 pr-3.5 py-3 rounded-full whitespace-nowrap
        transition-all duration-[280ms] ease-out hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0"
      style={{ '--tw-shadow': 'none' }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 12px 30px rgba(180,0,45,0.38)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'var(--ltrt-shadow-red)')}
    >
      {Icon && <Icon size={17} strokeWidth={2} />}
      <span>{label}</span>
      <ArrowRight size={15} strokeWidth={2.2} className="text-white/75 transition-transform duration-[280ms] group-hover:translate-x-1" />
    </button>
  )
}

/* ============================================================
   SECTION CARD — glass panel with crimson header
   ============================================================ */
export function SectionCard({ icon: Icon, title, onViewAll, children, className = '' }) {
  return (
    <div className={`glass glass-hover rounded-[20px] overflow-hidden flex flex-col ${className}`}>
      <div className="glass-red px-5 py-4 flex items-center justify-between gap-3" style={{ borderRadius: 0, border: 0 }}>
        <h3 className="text-white font-semibold text-[15.5px] flex items-center gap-2.5 tracking-[-0.01em]">
          {Icon && <Icon size={18} strokeWidth={2} style={{ color: 'var(--ltrt-gold-light)' }} />}
          {title}
        </h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="group flex items-center gap-1.5 text-white text-[12.5px] font-medium px-3.5 py-1.5 rounded-full shrink-0
              transition-all duration-200 active:scale-95"
            style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
          >
            View All
            <ArrowRight size={13} strokeWidth={2.2} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

/* ============================================================
   EMPTY STATE — circular glass illustration container
   ============================================================ */
export function IllustratedEmpty({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="py-12 px-6 flex flex-col items-center justify-center text-center">
      <div className="relative w-[86px] h-[86px] mb-5">
        <Sparkles size={14} className="absolute top-0 -left-1 z-10" style={{ color: 'var(--ltrt-gold)', animation: 'sparkle 2s ease-in-out infinite' }} />
        <Sparkles size={10} className="absolute top-3 -right-1 z-10" style={{ color: 'var(--ltrt-red)', opacity: 0.5, animation: 'sparkle 2.4s ease-in-out infinite 0.3s' }} />
        <Sparkles size={11} className="absolute -bottom-1 left-3 z-10" style={{ color: 'var(--ltrt-gold)', animation: 'sparkle 2.2s ease-in-out infinite 0.6s' }} />
        <div
          className="w-[86px] h-[86px] rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), rgba(240,0,70,0.09) 70%)',
            border: '1px solid rgba(255,255,255,0.8)',
            boxShadow: '0 10px 28px rgba(212,0,63,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
            color: 'var(--ltrt-red)',
            animation: 'floatY 3.2s ease-in-out infinite',
          }}
        >
          <Icon size={34} strokeWidth={1.4} />
        </div>
      </div>
      <p className="font-semibold text-[15.5px] text-[var(--ltrt-navy)]">{title}</p>
      {subtitle && <p className="text-[13px] text-[var(--ltrt-text-secondary)] mt-1.5 max-w-xs">{subtitle}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function EmptyState({ text = 'No data available', subtitle, icon = Search, action }) {
  return <IllustratedEmpty icon={icon} title={text} subtitle={subtitle} action={action} />
}

/* ============================================================
   BUTTON — one system, seven variants
   ============================================================ */
const BUTTON_VARIANTS = {
  primary: {
    className: 'glass-red text-white',
    hoverShadow: '0 12px 28px rgba(180,0,45,0.36)',
    restShadow: 'var(--ltrt-shadow-red)',
  },
  secondary: {
    className: 'glass text-[var(--ltrt-text)]',
    hoverShadow: 'var(--ltrt-shadow-md)',
    restShadow: 'var(--ltrt-shadow-sm)',
  },
  outline: {
    className: 'text-[var(--ltrt-red)] bg-white/50 backdrop-blur-md',
    style: { border: '1px solid rgba(212,0,63,0.35)' },
    hoverShadow: '0 6px 18px rgba(212,0,63,0.14)',
    restShadow: 'none',
  },
  ghost: {
    className: 'text-[var(--ltrt-text-secondary)] bg-transparent hover:bg-white/60',
    hoverShadow: 'none',
    restShadow: 'none',
  },
  gold: {
    className: 'text-white',
    style: {
      background: 'linear-gradient(135deg, #F5C55A, #D9A72A 55%, #B8871A)',
      border: '1px solid rgba(255,255,255,0.25)',
    },
    hoverShadow: '0 12px 28px rgba(217,167,42,0.38)',
    restShadow: '0 6px 18px rgba(217,167,42,0.26)',
  },
  danger: {
    className: 'text-[var(--ltrt-danger)] bg-white/60 backdrop-blur-md',
    style: { border: '1px solid rgba(232,60,91,0.3)' },
    hoverShadow: '0 6px 18px rgba(232,60,91,0.16)',
    restShadow: 'none',
  },
  success: {
    className: 'text-white',
    style: { background: 'linear-gradient(135deg, #22CE96, #19B985 60%, #0E9A6C)', border: '1px solid rgba(255,255,255,0.22)' },
    hoverShadow: '0 12px 28px rgba(25,185,133,0.34)',
    restShadow: '0 6px 18px rgba(25,185,133,0.24)',
  },
}

export function Button({ children, variant = 'primary', loading = false, className = '', style, ...props }) {
  const v = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 h-[42px] px-[18px] rounded-[14px] text-[13.5px] font-semibold
        transition-all duration-[240ms] ease-out hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0
        disabled:opacity-50 disabled:pointer-events-none ${v.className} ${className}`}
      style={{ boxShadow: v.restShadow, ...v.style, ...style }}
      onMouseEnter={(e) => { if (v.hoverShadow !== 'none') e.currentTarget.style.boxShadow = v.hoverShadow }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = v.restShadow === 'none' ? '' : v.restShadow }}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Spinner size={15} />}
      {children}
    </button>
  )
}

/* ============================================================
   INPUTS — glass fields with crimson focus glow
   ============================================================ */
export const inputClass =
  'w-full rounded-[14px] px-4 py-3 text-[14px] text-[var(--ltrt-text)] placeholder-[var(--ltrt-text-secondary)]/65 outline-none transition-all duration-[240ms] ltrt-field'

const fieldStyle = {
  background: 'rgba(255,255,255,0.62)',
  WebkitBackdropFilter: 'blur(14px)',
  backdropFilter: 'blur(14px)',
  border: '1px solid rgba(21,42,70,0.18)',
  boxShadow: 'inset 0 1px 2px rgba(21,42,70,0.04)',
}

function focusOn(e) {
  e.target.style.boxShadow = '0 0 0 4px rgba(212,0,63,0.09)'
  e.target.style.borderColor = 'rgba(212,0,63,0.4)'
  e.target.style.background = 'rgba(255,255,255,0.9)'
}
function focusOff(e) {
  e.target.style.boxShadow = fieldStyle.boxShadow
  e.target.style.borderColor = 'rgba(21,42,70,0.18)'
  e.target.style.background = fieldStyle.background
}

export function Input({ className = '', style, ...props }) {
  return <input {...props} className={`${inputClass} ${className}`} style={{ ...fieldStyle, ...style }} onFocus={focusOn} onBlur={focusOff} />
}

export function Textarea({ className = '', style, ...props }) {
  return <textarea {...props} className={`${inputClass} ${className}`} style={{ ...fieldStyle, ...style }} onFocus={focusOn} onBlur={focusOff} />
}

export function Select({ children, className = '', style, ...props }) {
  return (
    <select {...props} className={`${inputClass} ${className}`} style={{ ...fieldStyle, ...style }} onFocus={focusOn} onBlur={focusOff}>
      {children}
    </select>
  )
}

export function SearchInput({ className = '', ...props }) {
  return (
    <div className={`relative ${className}`}>
      <Search size={15} strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ltrt-text-secondary)]/70 pointer-events-none z-10" />
      <input
        {...props}
        className="w-full rounded-full pl-[42px] pr-4 py-2.5 text-[13.5px] text-[var(--ltrt-text)] placeholder-[var(--ltrt-text-secondary)]/65 outline-none transition-all duration-[240ms]"
        style={fieldStyle}
        onFocus={focusOn}
        onBlur={focusOff}
      />
    </div>
  )
}

export function Toggle({ checked, onChange, title }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={!!checked}
      title={title}
      onClick={() => onChange?.(!checked)}
      className="w-[42px] h-[23px] rounded-full relative shrink-0 transition-all duration-[280ms] active:scale-95"
      style={{
        background: checked
          ? 'linear-gradient(135deg, #22CE96, #19B985 60%, #0E9A6C)'
          : 'rgba(110,126,149,0.28)',
        border: '1px solid rgba(255,255,255,0.5)',
        boxShadow: checked ? '0 3px 10px rgba(25,185,133,0.32)' : 'inset 0 1px 2px rgba(21,42,70,0.08)',
      }}
    >
      <span
        className="absolute top-[2px] w-[17px] h-[17px] rounded-full bg-white transition-all duration-[280ms] ease-out"
        style={{ left: checked ? '22px' : '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.22)' }}
      />
    </button>
  )
}

export function FileUpload({ label = 'Choose File', value, onChange, accept }) {
  return (
    <label
      className="flex items-center gap-3 rounded-[14px] px-2 py-2 cursor-pointer transition-all duration-[240ms] hover:-translate-y-0.5"
      style={{
        background: 'rgba(255,255,255,0.62)',
        WebkitBackdropFilter: 'blur(14px)',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(21,42,70,0.18)',
        boxShadow: 'inset 0 1px 2px rgba(21,42,70,0.04)',
      }}
    >
      <span
        className="shrink-0 px-3.5 py-2 rounded-[10px] text-[12.5px] font-semibold text-white"
        style={{
          background: 'linear-gradient(135deg, #F0003F, #D4003F 55%, #A80027)',
          boxShadow: '0 4px 12px rgba(212,0,63,0.26)',
        }}
      >
        {label}
      </span>
      <span className="text-[13px] text-[var(--ltrt-text-secondary)] truncate">
        {value || 'No file chosen'}
      </span>
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange?.(e.target.files?.[0]?.name ?? '')}
      />
    </label>
  )
}

/* ============================================================
   ICON BUTTON
   ============================================================ */
export function IconButton({ icon: Icon, tone = 'gray', onClick, title, size = 16, type = 'button' }) {
  const tones = {
    gray: { color: 'var(--ltrt-text-secondary)', hover: 'rgba(21,42,70,0.07)' },
    rose: { color: 'var(--ltrt-red)', hover: 'rgba(212,0,63,0.09)' },
    emerald: { color: 'var(--ltrt-success)', hover: 'rgba(25,185,133,0.12)' },
    red: { color: 'var(--ltrt-danger)', hover: 'rgba(232,60,91,0.11)' },
    gold: { color: 'var(--ltrt-gold)', hover: 'rgba(217,167,42,0.14)' },
  }
  const t = tones[tone] || tones.gray
  return (
    <button
      type={type}
      onClick={onClick}
      title={title}
      className="w-9 h-9 rounded-[11px] flex items-center justify-center transition-all duration-[200ms] hover:scale-110 active:scale-90"
      style={{ color: t.color }}
      onMouseEnter={(e) => (e.currentTarget.style.background = t.hover)}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <Icon size={size} strokeWidth={2} />
    </button>
  )
}

/* ============================================================
   TABLE PRIMITIVES — champagne glass header, soft separators
   ============================================================ */
export const tableHeadRowClass = 'text-left ltrt-thead'
export const tableHeadCellClass =
  'px-4 py-3.5 font-semibold text-[12.5px] tracking-[0.02em] uppercase border-r border-[rgba(122,90,18,0.18)] last:border-r-0'
export const tableRowClass = 'ltrt-row transition-colors duration-150'
export const tableCellClass =
  'px-4 py-3.5 text-[13.5px] text-[var(--ltrt-text)] border-r border-[rgba(21,42,70,0.16)] last:border-r-0'

/** Wraps a table so its outer edge and header rule are always visible. Use instead of a bare overflow-x-auto div. */
export function TableFrame({ children, className = '' }) {
  return (
    <div
      className={`overflow-x-auto rounded-[14px] ${className}`}
      style={{ border: '1px solid rgba(21,42,70,0.16)' }}
    >
      {children}
    </div>
  )
}

export function TableHead({ children }) {
  return (
    <thead>
      <tr
        className={tableHeadRowClass}
        style={{
          background: 'linear-gradient(180deg, rgba(245,223,160,0.42), rgba(217,167,42,0.16))',
          color: '#7A5A12',
          borderBottom: '1px solid rgba(122,90,18,0.22)',
        }}
      >
        {children}
      </tr>
    </thead>
  )
}

export function TableRow({ children, ...props }) {
  return (
    <tr
      className="transition-colors duration-150"
      style={{ borderBottom: '1px solid rgba(21,42,70,0.16)' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.55)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      {...props}
    >
      {children}
    </tr>
  )
}

/* ============================================================
   PAGINATION
   ============================================================ */
export function Pagination({ page = 1, pages = 1, onChange }) {
  if (pages <= 1) return null
  const nums = Array.from({ length: pages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === pages || Math.abs(n - page) <= 1
  )
  return (
    <div className="flex items-center justify-end gap-1.5 mt-4">
      <PageBtn disabled={page === 1} onClick={() => onChange?.(page - 1)}><ChevronLeft size={15} strokeWidth={2.2} /></PageBtn>
      {nums.map((n, i) => (
        <span key={n} className="flex items-center gap-1.5">
          {i > 0 && n - nums[i - 1] > 1 && <span className="text-[var(--ltrt-text-secondary)]/60 px-0.5">…</span>}
          <PageBtn active={n === page} onClick={() => onChange?.(n)}>{n}</PageBtn>
        </span>
      ))}
      <PageBtn disabled={page === pages} onClick={() => onChange?.(page + 1)}><ChevronRight size={15} strokeWidth={2.2} /></PageBtn>
    </div>
  )
}

function PageBtn({ children, active, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="min-w-[34px] h-[34px] px-2 rounded-[11px] text-[13px] font-semibold flex items-center justify-center
        transition-all duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
      style={
        active
          ? {
              background: 'linear-gradient(135deg, #F0003F, #D4003F 55%, #A80027)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 6px 16px rgba(212,0,63,0.30)',
            }
          : {
              background: 'rgba(255,255,255,0.62)',
              color: 'var(--ltrt-text-secondary)',
              border: '1px solid rgba(255,255,255,0.8)',
              WebkitBackdropFilter: 'blur(12px)',
              backdropFilter: 'blur(12px)',
            }
      }
    >
      {children}
    </button>
  )
}

/* ============================================================
   BADGE
   ============================================================ */
const BADGE_TONES = {
  gray: { bg: 'rgba(110,126,149,0.12)', fg: '#5A6B85' },
  inactive: { bg: 'rgba(110,126,149,0.12)', fg: '#5A6B85' },
  green: { bg: 'rgba(25,185,133,0.14)', fg: '#0E8A60' },
  active: { bg: 'rgba(25,185,133,0.14)', fg: '#0E8A60' },
  approved: { bg: 'rgba(25,185,133,0.14)', fg: '#0E8A60' },
  completed: { bg: 'rgba(25,185,133,0.14)', fg: '#0E8A60' },
  red: { bg: 'rgba(232,60,91,0.13)', fg: '#C42846' },
  rejected: { bg: 'rgba(232,60,91,0.13)', fg: '#C42846' },
  amber: { bg: 'rgba(242,169,0,0.16)', fg: '#9A6D00' },
  pending: { bg: 'rgba(242,169,0,0.16)', fg: '#9A6D00' },
  blue: { bg: 'rgba(46,90,148,0.12)', fg: '#2E5A94' },
  processing: { bg: 'rgba(46,90,148,0.12)', fg: '#2E5A94' },
}

export function Badge({ children, tone = 'gray' }) {
  const t = BADGE_TONES[tone] || BADGE_TONES.gray
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11.5px] font-semibold whitespace-nowrap"
      style={{
        background: t.bg,
        color: t.fg,
        border: '1px solid rgba(255,255,255,0.6)',
        WebkitBackdropFilter: 'blur(8px)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {children}
    </span>
  )
}

/* ============================================================
   MODAL — deep glass over blurred backdrop
   ============================================================ */
export function Modal({ open, onClose, title, children, wide, stage }) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 animate-[fadeIn_0.2s_ease-out]"
      style={{ background: 'rgba(10,15,30,0.35)', WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)' }}
      onMouseDown={onClose}
    >
      <div
        className={`glass-strong w-full ${stage ? 'sm:max-w-5xl' : wide ? 'sm:max-w-2xl' : 'sm:max-w-md'} max-h-[90vh] sm:max-h-[85vh] overflow-y-auto
          rounded-t-[24px] sm:rounded-[24px] animate-[modalPop_0.26s_cubic-bezier(0.16,1,0.3,1)]`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-6 py-4.5 sticky top-0 z-10"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.7)',
            background: 'rgba(255,255,255,0.6)',
            WebkitBackdropFilter: 'blur(20px)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <h3 className="font-bold text-[16px] text-[var(--ltrt-navy)] tracking-[-0.01em]">{title}</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-[11px] flex items-center justify-center text-[var(--ltrt-text-secondary)]
              transition-all duration-200 hover:rotate-90 hover:text-[var(--ltrt-red)] active:scale-90"
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(212,0,63,0.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

/* ============================================================
   LOADING
   ============================================================ */
export function Spinner({ size = 18 }) {
  return (
    <span
      className="inline-block rounded-full animate-spin shrink-0"
      style={{
        width: size,
        height: size,
        border: `2px solid rgba(255,255,255,0.35)`,
        borderTopColor: 'currentColor',
      }}
    />
  )
}

export function Skeleton({ className = '', rounded = '12px' }) {
  return <div className={`ltrt-skeleton ${className}`} style={{ borderRadius: rounded }} />
}

export function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div className="p-4 space-y-3">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-3">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-9 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

/* ============================================================
   TOAST
   ============================================================ */
const TOAST_TONES = {
  success: { icon: CheckCircle2, color: 'var(--ltrt-success)', tint: 'rgba(25,185,133,0.12)' },
  error: { icon: XCircle, color: 'var(--ltrt-danger)', tint: 'rgba(232,60,91,0.12)' },
  warning: { icon: AlertTriangle, color: 'var(--ltrt-warning)', tint: 'rgba(242,169,0,0.14)' },
  info: { icon: Info, color: '#2E5A94', tint: 'rgba(46,90,148,0.12)' },
}

export function Toast({ tone = 'success', title, message, onClose }) {
  const t = TOAST_TONES[tone] || TOAST_TONES.success
  const Icon = t.icon
  return (
    <div className="glass-strong rounded-[16px] px-4 py-3.5 flex items-start gap-3 min-w-[280px] max-w-sm animate-[toastIn_0.3s_cubic-bezier(0.16,1,0.3,1)]">
      <span
        className="w-9 h-9 rounded-[11px] flex items-center justify-center shrink-0"
        style={{ background: t.tint, color: t.color }}
      >
        <Icon size={18} strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] font-semibold text-[var(--ltrt-navy)]">{title}</p>
        {message && <p className="text-[12.5px] text-[var(--ltrt-text-secondary)] mt-0.5">{message}</p>}
      </div>
      {onClose && <IconButton icon={X} onClick={onClose} size={15} />}
    </div>
  )
}

export function ToastStack({ children }) {
  return <div className="fixed top-[88px] right-5 z-[60] flex flex-col gap-2.5 pointer-events-none [&>*]:pointer-events-auto">{children}</div>
}

/* ============================================================
   MISC
   ============================================================ */
export function Placeholder({ title }) {
  return (
    <Card className="p-12 text-center">
      <IllustratedEmpty
        icon={Construction}
        title={title}
        subtitle="Prototype screen — structure in place, detailed UI coming soon."
      />
    </Card>
  )
}
