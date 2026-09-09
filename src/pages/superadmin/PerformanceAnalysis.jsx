import { AlertTriangle, Trophy } from 'lucide-react'
import { PageHeader, TableFrame } from '../../components/ui'
import { useChapters } from '../../context/ChapterContext'

const GREEN = '#19B985'
const AMBER = '#D9A72A'
const RED = '#E8501F'

const FALLBACK = [
  { chapter: 'MAJESTIC', business: 93, businessColor: GREEN, absenteeism: 0, visitors: 100, visitorsColor: GREEN, addition: 0, drops: 0, referral: 100, referralColor: GREEN },
  { chapter: 'MONARCHS', business: 79, businessColor: AMBER, absenteeism: 0, visitors: 100, visitorsColor: GREEN, addition: 0, drops: 0, referral: 100, referralColor: GREEN },
  { chapter: 'MUSTANGS', business: 83, businessColor: GREEN, absenteeism: -795, visitors: 100, visitorsColor: GREEN, addition: 0, drops: 0, referral: 100, referralColor: GREEN },
  { chapter: 'MAGNUM', business: 70, businessColor: RED, absenteeism: -605, visitors: 70, visitorsColor: AMBER, addition: 0, drops: 0, referral: 69, referralColor: GREEN },
  { chapter: 'MYSTICS', business: 53, businessColor: RED, absenteeism: 0, visitors: 100, visitorsColor: GREEN, addition: 0, drops: 0, referral: 100, referralColor: GREEN },
  { chapter: 'MAGICIANS', business: 87, businessColor: GREEN, absenteeism: 0, visitors: 100, visitorsColor: GREEN, addition: 0, drops: 0, referral: 100, referralColor: GREEN },
  { chapter: 'MILLIONARIES', business: 47, businessColor: RED, absenteeism: -1285, visitors: 100, visitorsColor: GREEN, addition: 0, drops: 0, referral: 88, referralColor: GREEN },
  { chapter: 'MIRACLES', business: 40, businessColor: RED, absenteeism: 0, visitors: 100, visitorsColor: GREEN, addition: 0, drops: 0, referral: 48, referralColor: RED },
  { chapter: 'MAVERICKS', business: 40, businessColor: RED, absenteeism: 0, visitors: 36, visitorsColor: RED, addition: 0, drops: 0, referral: 87, referralColor: GREEN },
  { chapter: 'MARVELS', business: 95, businessColor: GREEN, absenteeism: -360, visitors: 100, visitorsColor: GREEN, addition: 0, drops: 0, referral: 100, referralColor: GREEN },
  { chapter: 'MERIDIAN', business: 26, businessColor: RED, absenteeism: 0, visitors: 100, visitorsColor: GREEN, addition: 0, drops: 0, referral: 100, referralColor: GREEN },
]

function Dot({ color }) {
  return <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: color }} />
}

function Cell({ value, color, suffix = '%' }) {
  return (
    <span className="inline-flex items-center text-[13px] font-medium text-[var(--ltrt-text)]">
      <Dot color={color} />
      {value}{suffix}
    </span>
  )
}

const COLS = ['Chapter', 'Business (TYFCB)', 'Absenteeism (In minus %)', 'Visitors Per Month', 'Member Addition', 'Member Drops (Incl. Non Renewals)', 'Referral %']

export default function PerformanceAnalysis() {
  const { chapters } = useChapters()
  const rows = chapters.length
    ? chapters.map((c, i) => ({ ...FALLBACK[i % FALLBACK.length], chapter: c.chapter }))
    : FALLBACK

  const top = [...rows].sort((a, b) => b.business - a.business)[0]

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold"
          style={{
            background: 'rgba(255,255,255,0.62)',
            border: '1px solid rgba(232,60,91,0.28)',
            color: 'var(--ltrt-red)',
          }}
        >
          <AlertTriangle size={15} strokeWidth={2.2} /> Slide Preparation Locked
        </span>
      </div>

      <PageHeader title="Performance Analysis" subtitle="Chapter-wise performance overview" />

      <div
        className="rounded-[18px] px-6 py-5 mb-5 flex items-center gap-4"
        style={{
          background: 'linear-gradient(100deg, #F5A623, #E8901A 60%, #D97F0E)',
          boxShadow: '0 10px 26px rgba(217,144,26,0.35)',
        }}
      >
        <div
          className="w-14 h-14 rounded-[16px] flex items-center justify-center shrink-0"
          style={{ background: 'rgba(255,255,255,0.22)' }}
        >
          <Trophy size={26} strokeWidth={2} className="text-white" />
        </div>
        <div>
          <p className="text-white/85 text-[13px] font-medium">Overall Top Chapter</p>
          <p className="text-white text-[24px] font-extrabold leading-tight tracking-[-0.01em]">{top.chapter}</p>
          <p className="text-white/85 text-[13px]">{top.business}% Achievement</p>
        </div>
      </div>

      <TableFrame>
        <table className="w-full min-w-[980px]">
          <thead>
            <tr
              className="text-left"
              style={{
                background: 'linear-gradient(180deg, rgba(245,223,160,0.42), rgba(217,167,42,0.16))',
                color: '#7A5A12',
                borderBottom: '1px solid rgba(122,90,18,0.22)',
              }}
            >
              {COLS.map((c) => (
                <th key={c} className="px-4 py-3.5 font-semibold text-[12px] tracking-[0.02em] uppercase border-r border-[rgba(122,90,18,0.18)] last:border-r-0 whitespace-nowrap">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(21,42,70,0.14)' }}>
                <td className="px-4 py-3.5 text-[13.5px] font-bold text-[var(--ltrt-navy)] whitespace-nowrap">{row.chapter}</td>
                <td className="px-4 py-3.5"><Cell value={row.business} color={row.businessColor} /></td>
                <td className="px-4 py-3.5"><Cell value={row.absenteeism} color={RED} /></td>
                <td className="px-4 py-3.5"><Cell value={row.visitors} color={row.visitorsColor} /></td>
                <td className="px-4 py-3.5"><Cell value={row.addition} color={RED} /></td>
                <td className="px-4 py-3.5"><Cell value={row.drops} color={RED} /></td>
                <td className="px-4 py-3.5"><Cell value={row.referral} color={row.referralColor} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableFrame>
    </div>
  )
}
