import { useState } from 'react'
import { PageHeader, Card, Button, Badge } from '../../components/ui'

const SEED = [
  { id: 1, name: 'Dr Majinu G. Sarath', type: 'Member', time: '6:02:14 PM' },
  { id: 2, name: 'Aneesh', type: 'Member', time: '6:05:41 PM' },
  { id: 3, name: 'Sauparnika Puthur', type: 'Member', time: '6:01:09 PM' },
  { id: 4, name: 'Faisal A', type: 'Substitute', time: '6:11:33 PM' },
  { id: 5, name: 'Rahul Menon', type: 'Visitor', time: '6:14:52 PM' },
]

export default function Attendance() {
  const [rows, setRows] = useState(SEED)
  const [name, setName] = useState('')
  const [type, setType] = useState('Member')

  function punch(e) {
    e.preventDefault()
    if (!name.trim()) return
    setRows((r) => [{ id: Date.now(), name, type, time: new Date().toLocaleTimeString() }, ...r])
    setName('')
  }

  return (
    <div>
      <PageHeader title="Attendance" subtitle="Mark attendance for members and visitors" />
      <Card className="p-4 mb-4">
        <form onSubmit={punch} className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-xs font-medium text-[var(--ltrt-text-secondary)] mb-1">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="border border-[rgba(21,42,70,0.18)] rounded-[12px] px-3 py-2 text-sm w-56" placeholder="Search or type name" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--ltrt-text-secondary)] mb-1">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="border border-[rgba(21,42,70,0.18)] rounded-[12px] px-3 py-2 text-sm">
              <option>Member</option>
              <option>Visitor</option>
            </select>
          </div>
          <Button type="submit">Punch In</Button>
        </form>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-[var(--ltrt-text)] mb-3">Today's Attendance ({rows.length})</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left ltrt-champagne">
              <th className="py-2 pr-3">#</th><th className="py-2 pr-3">Name</th><th className="py-2 pr-3">Type</th><th className="py-2 pr-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} className="border-b border-[rgba(21,42,70,0.18)]">
                <td className="py-2 pr-3 text-[var(--ltrt-text-secondary)]/70">{i + 1}</td>
                <td className="py-2 pr-3">{r.name}</td>
                <td className="py-2 pr-3"><Badge tone={r.type === 'Member' ? 'blue' : 'amber'}>{r.type}</Badge></td>
                <td className="py-2 pr-3 text-[var(--ltrt-text-secondary)]">{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
