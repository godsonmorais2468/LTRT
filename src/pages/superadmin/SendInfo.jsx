import { useState } from 'react'
import { PageHeader, Card, Button } from '../../components/ui'

export default function SendInfo() {
  const [sent, setSent] = useState([
    { id: 1, message: 'Slide submission deadline is 9 PM today.', to: 'All Chapters', time: '05-09-2026 10:15' },
    { id: 2, message: 'Regional meet at Kochi on 20 September.', to: 'Kochi', time: '01-09-2026 16:40' },
    { id: 3, message: 'New performance dashboard is now live.', to: 'All Chapters', time: '25-08-2026 09:05' },
  ])
  const [message, setMessage] = useState('')
  const [to, setTo] = useState('All Organisations')

  function send(e) {
    e.preventDefault()
    if (!message.trim()) return
    setSent((s) => [{ id: Date.now(), message, to, time: new Date().toLocaleString() }, ...s])
    setMessage('')
  }

  return (
    <div>
      <PageHeader title="Send Info" subtitle="Broadcast a message to organisations or resellers" />
      <Card className="p-4 mb-4">
        <form onSubmit={send} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-[var(--ltrt-text-secondary)] mb-1">Send To</label>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="border border-[rgba(21,42,70,0.18)] rounded-[12px] px-3 py-2 text-sm">
              <option>All Organisations</option>
              <option>All Resellers</option>
              <option>Specific Diocese</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--ltrt-text-secondary)] mb-1">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="w-full border border-[rgba(21,42,70,0.18)] rounded-[14px] px-3.5 py-2.5 text-sm text-[var(--ltrt-text)] outline-none transition-all duration-150 focus:border-rose-300 focus:ring-2 focus:ring-rose-100" />
          </div>
          <Button type="submit">Send</Button>
        </form>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-[var(--ltrt-text)] mb-3">Sent History</h3>
        <ul className="space-y-2">
          {sent.map((s) => (
            <li key={s.id} className="text-sm border-b border-[rgba(21,42,70,0.18)] pb-2">
              <p className="text-[var(--ltrt-text)]">{s.message}</p>
              <p className="text-xs text-[var(--ltrt-text-secondary)]/70">To: {s.to} · {s.time}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
