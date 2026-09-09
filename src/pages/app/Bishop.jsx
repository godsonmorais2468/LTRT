import { PageHeader, Card } from '../../components/ui'

export default function Bishop() {
  return (
    <div>
      <PageHeader title="Bishop" subtitle="Diocesan bishop details" />
      <Card className="p-5 max-w-md text-sm text-[var(--ltrt-text-secondary)] space-y-2">
        <p><strong>Name:</strong> -</p>
        <p><strong>Diocese:</strong> -</p>
        <p><strong>Consecrated:</strong> -</p>
        <p><strong>Office:</strong> -</p>
      </Card>
    </div>
  )
}
