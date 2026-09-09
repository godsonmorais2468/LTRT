import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockDashboard } from '../../data/mock'
import { StatCard, SectionCard, IllustratedEmpty, ActionPill, PageHeader, TableHead, TableRow, tableHeadCellClass, tableCellClass } from '../../components/ui'
import {
  BriefcaseBusiness, FileText, CircleCheck, Clock3, Presentation, Power,
  ClipboardCheck, BarChart3, FileSearch,
} from 'lucide-react'

const recent = mockDashboard.statRows

const actions = [
  { label: 'Show Presentation', icon: Presentation, to: '/superadmin/transaction/show-presentation' },
  { label: 'Chapter Activation Status', icon: Power, to: '/superadmin/master/chapter' },
  { label: 'Approval', icon: ClipboardCheck, to: '/superadmin/transaction/slide-approval' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div>
      <PageHeader
        title="Region Dashboard"
        meta="(Ver. 2 - 50)"
        subtitle={`Welcome back${user?.name ? `, ${user.name}` : ''}! Here's what's happening with your platform today.`}
      />

      <div className="flex flex-wrap gap-3 mb-6">
        {actions.map((a) => (
          <ActionPill key={a.label} icon={a.icon} label={a.label} onClick={() => navigate(a.to)} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard label="No. of Chapters" value={mockDashboard.superadmin.chapters} icon={BriefcaseBusiness} accent="rose" />
        <StatCard label="Files Submitted" value={mockDashboard.superadmin.submitted} icon={FileText} accent="amber" />
        <StatCard label="Files Approved" value={mockDashboard.superadmin.approved} icon={CircleCheck} accent="emerald" />
        <StatCard label="Files Pending" value={mockDashboard.superadmin.pending} icon={Clock3} accent="orange" />
      </div>

      <div className="grid grid-cols-1 gap-5 mt-5">
        <SectionCard icon={BarChart3} title="Stat Statistics" onViewAll={() => navigate('/superadmin/master/stat')}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px]">
              <TableHead>
                <th className={`${tableHeadCellClass} w-12`}>#</th>
                <th className={tableHeadCellClass}>Chapter</th>
                <th className={tableHeadCellClass}>Stat</th>
                <th className={tableHeadCellClass}>Goal</th>
                <th className={tableHeadCellClass}>Current</th>
              </TableHead>
              <tbody>
                {recent.map((r, i) => (
                  <TableRow key={i}>
                    <td className={`${tableCellClass} text-[var(--ltrt-text-secondary)]/70`}>{i + 1}</td>
                    <td className={`${tableCellClass} font-semibold`}>{r.chapter}</td>
                    <td className={tableCellClass}>{r.stat}</td>
                    <td className={tableCellClass}>{r.goal}</td>
                    <td className={tableCellClass}>{r.current}</td>
                  </TableRow>
                ))}
              </tbody>
            </table>
          </div>
          {recent.length === 0 && (
            <IllustratedEmpty
              icon={FileSearch}
              title="No data available"
              subtitle="There are no statistics to display at the moment."
            />
          )}
        </SectionCard>
      </div>
    </div>
  )
}
