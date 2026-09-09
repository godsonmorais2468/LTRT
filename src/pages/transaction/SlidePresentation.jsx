import ReportPage from '../../components/ReportPage'

const rows = []

export default function SlidePresentation() {
  return (
    <ReportPage
      title="Slide Presentation"
      subtitle="Approved slides scheduled for presentation"
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'chapter', label: 'Chapter' },
        { key: 'scheduledDate', label: 'Scheduled Date' },
      ]}
      filters={{ dateKey: 'scheduledDate' }}
      rows={rows}
    />
  )
}
