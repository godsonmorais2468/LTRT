import { useAuth } from '../../context/AuthContext'
import { PageHeader, Card, StatCard, EmptyState } from '../../components/ui'
import { CheckCircle2, CalendarDays, Bell } from 'lucide-react'

export default function Home() {
  const { user } = useAuth()
  return (
    <div>
      <PageHeader title={`Welcome, ${user?.name || 'Member'}`} subtitle="Your parish at a glance" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <StatCard label="My Attendance %" value="-" icon={CheckCircle2} accent="emerald" />
        <StatCard label="Upcoming Events" value={0} icon={CalendarDays} accent="sky" />
        <StatCard label="Notifications" value={0} icon={Bell} accent="rose" />
      </div>
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-[var(--ltrt-text)] mb-3">Upcoming Events</h3>
        <EmptyState />
      </Card>
    </div>
  )
}
