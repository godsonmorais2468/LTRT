import { PageHeader, Card } from '../../components/ui'

export default function Parish() {
  return (
    <div>
      <PageHeader title="Parish" subtitle="Your parish details" />
      <Card className="p-5 max-w-md text-sm text-[var(--ltrt-text-secondary)] space-y-2">
        <p><strong>Name:</strong> -</p>
        <p><strong>Vicar:</strong> -</p>
        <p><strong>Diocese:</strong> -</p>
        <p><strong>Members:</strong> -</p>
        <p><strong>Established:</strong> -</p>
      </Card>
    </div>
  )
}
