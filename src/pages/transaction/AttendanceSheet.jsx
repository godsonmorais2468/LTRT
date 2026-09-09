import ReportPage from '../../components/ReportPage'

const rows = []

export default function AttendanceSheet() {
  return (
    <ReportPage
      title="Attendance Sheet"
      subtitle="Monthly attendance grid by Sunday"
      columns={[
        { key: 'name', label: 'Member' },
        { key: 'w1', label: 'Week 1' },
        { key: 'w2', label: 'Week 2' },
        { key: 'w3', label: 'Week 3' },
        { key: 'w4', label: 'Week 4' },
        { key: 'pct', label: '% Attendance' },
      ]}
      rows={rows}
      summary={[
        { label: 'Members Tracked', value: rows.length },
        { label: 'Avg. Attendance', value: '-' },
      ]}
    />
  )
}
