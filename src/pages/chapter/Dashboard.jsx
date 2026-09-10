import { useNavigate } from 'react-router-dom'
import { mockDashboard } from '../../data/mock'
import { StatCard, SectionCard, PageHeader, TableHead, TableRow, tableHeadCellClass, tableCellClass } from '../../components/ui'
import {
  Lock, BriefcaseBusiness, FileText, CircleCheck, Clock3,
  BarChart3,
} from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div>
      <div className="mb-5">
        <span
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-[13.5px] font-semibold"
          style={{
            background: 'rgba(255,255,255,0.62)',
            WebkitBackdropFilter: 'blur(16px)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(232,60,91,0.28)',
            color: 'var(--ltrt-red)',
            boxShadow: '0 4px 16px rgba(212,0,63,0.10)',
          }}
        >
          <Lock size={15} strokeWidth={2.2} /> Slide Preparation Locked
        </span>
      </div>

      <PageHeader
        title="Chapter Dashboard"
        meta="(Ver. 2 - 50)"
        subtitle={
          <>
            Hi, Welcome <span className="font-semibold" style={{ color: 'var(--ltrt-red)' }}>MYSTICS</span>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard label="No. of Chapters" value={mockDashboard.chapter.chapters} icon={BriefcaseBusiness} accent="rose" />
        <StatCard label="Files Submitted" value={mockDashboard.chapter.submitted} icon={FileText} accent="amber" />
        <StatCard label="Files Approved" value={mockDashboard.chapter.approved} icon={CircleCheck} accent="emerald" />
        <StatCard label="Files Pending" value={mockDashboard.chapter.pending} icon={Clock3} accent="orange" />
      </div>

      <div className="grid grid-cols-1 gap-5 mt-5">
        <SectionCard icon={BarChart3} title="Stat Statistics" onViewAll={() => navigate('/master/stat')}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px]">
              <TableHead>
                <th className={`${tableHeadCellClass} w-12`}>#</th>
                <th className={tableHeadCellClass}>Stat</th>
                <th className={tableHeadCellClass}>Goal</th>
                <th className={tableHeadCellClass}>Current</th>
                <th className={tableHeadCellClass}>% Achieved</th>
              </TableHead>
              <tbody>
                {mockDashboard.statRows.map((r, i) => (
                  <TableRow key={r.chapter + r.stat}>
                    <td className={`${tableCellClass} text-[var(--ltrt-text-secondary)]/70`}>{i + 1}</td>
                    <td className={`${tableCellClass} font-semibold`}>{r.stat}</td>
                    <td className={tableCellClass}>{r.goal}</td>
                    <td className={tableCellClass}>{r.current}</td>
                    <td className={`${tableCellClass} font-semibold`} style={{ color: 'var(--ltrt-success)' }}>{r.achieved}</td>
                  </TableRow>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
