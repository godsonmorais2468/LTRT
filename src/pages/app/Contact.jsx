import { PageHeader, Card } from '../../components/ui'

export default function Contact() {
  return (
    <div>
      <PageHeader title="Contact" subtitle="Reach your chapter office" />
      <Card className="p-5 max-w-md text-sm text-[var(--ltrt-text-secondary)] space-y-2">
        <p><strong>Chapter:</strong> -</p>
        <p><strong>Phone:</strong> -</p>
        <p><strong>Email:</strong> -</p>
        <p><strong>Address:</strong> -</p>
      </Card>
    </div>
  )
}
