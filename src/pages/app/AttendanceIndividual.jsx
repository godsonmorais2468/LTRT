import ReportPage from '../../components/ReportPage'

const rows = []

export default function AttendanceIndividual() {
  return (
    <ReportPage
      title="My Attendance History"
      subtitle="Your individual attendance record"
      columns={[
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
        { key: 'markedBy', label: 'Marked Via' },
      ]}
      filters={{ dateKey: 'date' }}
      rows={rows}
      summary={[
        { label: 'Present', value: 0 },
        { label: 'Absent', value: 0 },
        { label: 'Attendance %', value: '-' },
      ]}
    />
  )
}
