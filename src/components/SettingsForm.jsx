import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { PageHeader, Card, Button, Input, Select } from './ui'

export default function SettingsForm({ title, subtitle, fields, initial }) {
  const [form, setForm] = useState(initial)
  const [saved, setSaved] = useState(false)

  function submit(e) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} />
      <Card className="p-6 max-w-3xl" hover={false}>
        <form onSubmit={submit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {fields.map((f) => (
              <div key={f.key} className={f.full ? 'sm:col-span-2' : ''}>
                <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">{f.label}</label>
                {f.type === 'select' ? (
                  <Select value={form[f.key] ?? ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}>
                    {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </Select>
                ) : f.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    checked={!!form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })}
                    className="h-[18px] w-[18px] rounded accent-[var(--ltrt-red)] cursor-pointer"
                  />
                ) : (
                  <Input
                    type={f.type || 'text'}
                    value={form[f.key] ?? ''}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 pt-1">
            <Button type="submit">Save Changes</Button>
            {saved && (
              <span
                className="flex items-center gap-2 text-[13.5px] font-semibold animate-[fadeIn_0.2s_ease-out]"
                style={{ color: 'var(--ltrt-success)' }}
              >
                <CheckCircle2 size={17} strokeWidth={2.2} /> Saved
              </span>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}
