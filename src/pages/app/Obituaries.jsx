import { useState } from 'react'
import { PageHeader, Card, Button } from '../../components/ui'

export default function Obituaries() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <div>
      <PageHeader title="Report Obituary" subtitle="Submit an obituary notice for the parish community" />
      <Card className="p-5 max-w-lg">
        {submitted ? (
          <p className="text-sm text-emerald-600">Thank you — the obituary notice has been submitted for review.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[var(--ltrt-text-secondary)] mb-1">Name of Deceased</label>
              <input required className="w-full border border-[rgba(21,42,70,0.18)] rounded-[14px] px-3.5 py-2.5 text-sm text-[var(--ltrt-text)] outline-none transition-all duration-150 focus:border-rose-300 focus:ring-2 focus:ring-rose-100" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--ltrt-text-secondary)] mb-1">Date of Passing</label>
              <input type="date" required className="w-full border border-[rgba(21,42,70,0.18)] rounded-[14px] px-3.5 py-2.5 text-sm text-[var(--ltrt-text)] outline-none transition-all duration-150 focus:border-rose-300 focus:ring-2 focus:ring-rose-100" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--ltrt-text-secondary)] mb-1">Message</label>
              <textarea rows={3} className="w-full border border-[rgba(21,42,70,0.18)] rounded-[14px] px-3.5 py-2.5 text-sm text-[var(--ltrt-text)] outline-none transition-all duration-150 focus:border-rose-300 focus:ring-2 focus:ring-rose-100" />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        )}
      </Card>
    </div>
  )
}
