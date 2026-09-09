import { useState } from 'react'
import { Play, Filter, Lock } from 'lucide-react'
import { PageHeader, Button, TableFrame } from '../../components/ui'
import { useChapters } from '../../context/ChapterContext'
import { mockHeadTables, mockPresentations } from '../../data/mock'

/* Colour logic:
   played    → green   (slide show already run)
   approved  → black   (approved, waiting to be played)
   pending   → grey    (not approved yet — no play button) */
const TONES = {
  played: { chapter: '#0E9A6C', label: '#0E9A6C', text: '#0E9A6C', muted: '#0E9A6C', caption: 'Played' },
  approved: { chapter: '#111827', label: '#111827', text: '#111827', muted: '#374151', caption: 'Approved' },
  pending: { chapter: '#9AA3AF', label: '#9AA3AF', text: '#9AA3AF', muted: '#9AA3AF', caption: 'Not Approved' },
}

const HEAD_ROLES = [
  ['PRESIDENT', 'president'],
  ['VICE-PRESIDENT', 'vicePresident'],
  ['SECRETARY /TREASURER', 'secretary'],
]

function PlayCell({ row, tone, onPlay }) {
  if (row.status === 'pending') {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div
          className="w-14 h-14 sm:w-[68px] sm:h-[68px] rounded-full flex items-center justify-center"
          style={{ background: 'rgba(154,163,175,0.22)', border: '1px dashed rgba(154,163,175,0.6)' }}
        >
          <Play size={26} strokeWidth={2.2} style={{ color: '#9AA3AF' }} />
        </div>
        <span className="text-[14px] sm:text-[16px] font-bold" style={{ color: tone.caption ? tone.label : undefined }}>
          {tone.caption}
        </span>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        onClick={onPlay}
        title="Play slide show"
        className="w-14 h-14 sm:w-[68px] sm:h-[68px] rounded-full flex items-center justify-center text-white transition-transform duration-150 hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #F0003F, #D4003F 55%, #A80027)',
          boxShadow: '0 6px 18px rgba(212,0,63,0.42)',
        }}
      >
        <Play size={28} strokeWidth={2.4} fill="white" />
      </button>
      <span className="text-[14px] sm:text-[16px] font-bold" style={{ color: tone.label }}>
        {tone.caption}
      </span>
    </div>
  )
}

function HeadTable({ head, tone, nowrap }) {
  return (
    <div className="text-[15px] sm:text-[18px] leading-relaxed">
      {HEAD_ROLES.map(([label, key]) => (
        <p key={key} className={nowrap ? 'whitespace-nowrap' : undefined}>
          <span className="font-bold" style={{ color: tone.text }}>{label}:</span>{' '}
          <span style={{ color: tone.muted }}>{head[key]}</span>
        </p>
      ))}
    </div>
  )
}

function ApprovedBy({ row, tone, nowrap }) {
  if (row.status === 'pending') return <span style={{ color: tone.muted }}>—</span>
  return (
    <div>
      <p className={`font-bold text-[16px] sm:text-[19px] ${nowrap ? 'whitespace-nowrap' : ''}`} style={{ color: tone.text }}>{row.approvedBy}</p>
      <p className="text-[14px] sm:text-[16px]" style={{ color: tone.muted }}>{row.approvedDesignation}</p>
    </div>
  )
}

export default function ShowPresentation() {
  const { chapters } = useChapters()
  const [played, setPlayed] = useState({})

  const rows = mockPresentations.map((p) => {
    const match = chapters.find((c) => c.chapter === p.chapter)
    return {
      ...p,
      chapter: match?.chapter ?? p.chapter,
      head: mockHeadTables[p.chapter] ?? { president: '—', vicePresident: '—', secretary: '—' },
    }
  })

  function play(id) {
    setPlayed((p) => ({ ...p, [id]: true }))
  }

  const toneFor = (row) => TONES[played[row.id] ? 'played' : row.status] ?? TONES.pending

  return (
    <div>
      <PageHeader
        title="Show Presentation"
        action={
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #F0003F, #D4003F 55%, #A80027)' }}
          >
            <Lock size={12} strokeWidth={2.4} /> Slide Preparation Locked
          </span>
        }
      />

      <div className="flex items-center justify-between gap-3 mb-4">
        <Button className="!h-[38px] !px-4 !text-[13px]">Show Presentation</Button>
        <Button className="!h-[38px] !px-4 !text-[13px]">
          <Filter size={14} strokeWidth={2.2} /> Filter
        </Button>
      </div>

      {/* ── Desktop / tablet: full table ─────────────────── */}
      <TableFrame className="hidden md:block">
        <table className="w-full min-w-[1300px]">
          <thead>
            <tr
              className="text-left text-white"
              style={{ background: 'linear-gradient(135deg, #F0003F, #D4003F 55%, #A80027)' }}
            >
              <th className="px-3 py-4 font-bold text-[15px] tracking-[0.02em] uppercase w-14">SL No</th>
              <th className="px-3 py-4 font-bold text-[15px] tracking-[0.02em] uppercase w-36 text-center">Slide Show</th>
              <th className="px-3 py-4 font-bold text-[15px] tracking-[0.02em] uppercase">Chapter</th>
              <th className="px-3 py-4 font-bold text-[15px] tracking-[0.02em] uppercase">Head Table</th>
              <th className="px-3 py-4 font-bold text-[15px] tracking-[0.02em] uppercase">Approved By</th>
              <th className="px-3 py-4 font-bold text-[15px] tracking-[0.02em] uppercase">Approved Date &amp; Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const tone = toneFor(row)
              return (
                <tr
                  key={row.id}
                  style={{
                    background: i % 2 === 0 ? 'rgba(250,240,196,0.55)' : 'rgba(250,240,196,0.32)',
                    borderBottom: '1px solid rgba(21,42,70,0.14)',
                  }}
                >
                  <td className="px-3 py-6 text-[19px] font-bold" style={{ color: tone.muted }}>{i + 1}</td>
                  <td className="px-3 py-6 text-center">
                    <PlayCell row={row} tone={tone} onPlay={() => play(row.id)} />
                  </td>
                  <td className="px-3 py-6">
                    <span className="text-[34px] lg:text-[42px] font-extrabold tracking-[-0.01em] whitespace-nowrap" style={{ color: tone.chapter }}>
                      {row.chapter}
                    </span>
                  </td>
                  <td className="px-3 py-6"><HeadTable head={row.head} tone={tone} nowrap /></td>
                  <td className="px-3 py-6"><ApprovedBy row={row} tone={tone} nowrap /></td>
                  <td className="px-3 py-6 text-[17px] font-semibold" style={{ color: tone.muted }}>
                    {row.approvedAt
                      ? <><span className="whitespace-nowrap">{row.approvedAt.split(' ')[0]}</span><br /><span className="whitespace-nowrap">{row.approvedAt.split(' ')[1]}</span></>
                      : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </TableFrame>

      {/* ── Mobile: one card per chapter, no sideways scrolling ── */}
      <div className="md:hidden space-y-3">
        {rows.map((row, i) => {
          const tone = toneFor(row)
          return (
            <div
              key={row.id}
              className="rounded-[16px] p-4"
              style={{ background: 'rgba(250,240,196,0.55)', border: '1px solid rgba(21,42,70,0.14)' }}
            >
              <div className="flex items-start gap-4">
                <PlayCell row={row} tone={tone} onPlay={() => play(row.id)} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold" style={{ color: tone.muted }}>SL No {i + 1}</p>
                  <p
                    className="text-[20px] min-[360px]:text-[24px] min-[400px]:text-[28px] font-extrabold leading-tight"
                    style={{ color: tone.chapter, overflowWrap: 'anywhere' }}
                  >
                    {row.chapter}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-[rgba(21,42,70,0.12)]">
                <HeadTable head={row.head} tone={tone} />
              </div>

              <div className="mt-3 pt-3 border-t border-[rgba(21,42,70,0.12)] grid grid-cols-2 gap-3">
                <div className="min-w-0">
                  <p className="text-[12px] font-bold uppercase tracking-wide mb-0.5" style={{ color: tone.muted }}>Approved By</p>
                  <ApprovedBy row={row} tone={tone} />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-bold uppercase tracking-wide mb-0.5" style={{ color: tone.muted }}>Approved Date &amp; Time</p>
                  <p className="text-[14.5px] font-semibold break-words" style={{ color: tone.muted }}>{row.approvedAt || '—'}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
