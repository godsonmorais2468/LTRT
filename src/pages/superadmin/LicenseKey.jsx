import { useState } from 'react'
import { PageHeader, Card, Button, Badge } from '../../components/ui'

const POOL = []

export default function LicenseKey() {
  const [active, setActive] = useState('')
  const [used, setUsed] = useState([])
  const [log, setLog] = useState([])

  function sync() {
    const available = POOL.find((k) => k !== active && !used.includes(k))
    if (!available) {
      setLog((l) => [`${new Date().toLocaleTimeString()} — no unused key found in pool`, ...l])
      return
    }
    setUsed((u) => [...u, available])
    setActive(available)
    setLog((l) => [`${new Date().toLocaleTimeString()} — common_settings.key_value updated to ${available}`, ...l])
  }

  return (
    <div>
      <PageHeader title="License Key" subtitle="Mirrors Update_key controller: pulls an unused key from api_keys into common_settings" />
      <Card className="p-5 max-w-lg mb-4">
        <p className="text-xs text-[var(--ltrt-text-secondary)] mb-1">Active Key (common_settings.key_value)</p>
        <p className="font-mono text-lg text-[var(--ltrt-text)] mb-4">{active}</p>
        <Button onClick={sync}>Sync Next Available Key</Button>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-[var(--ltrt-text)] mb-3">Key Pool</h3>
        <table className="w-full text-sm">
          <thead><tr className="text-left ltrt-champagne"><th className="py-2 pr-3">Key</th><th className="py-2 pr-3">Status</th></tr></thead>
          <tbody>
            <tr className="border-b border-[rgba(21,42,70,0.18)]"><td className="py-2 pr-3 font-mono">{active}</td><td className="py-2 pr-3"><Badge tone="green">Active</Badge></td></tr>
            {POOL.map((k) => (
              <tr key={k} className="border-b border-[rgba(21,42,70,0.18)]">
                <td className="py-2 pr-3 font-mono">{k}</td>
                <td className="py-2 pr-3"><Badge tone={used.includes(k) ? 'blue' : 'gray'}>{used.includes(k) ? 'Used' : 'Unused'}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {log.length > 0 && (
        <Card className="p-4 mt-4">
          <h3 className="text-sm font-semibold text-[var(--ltrt-text)] mb-2">Sync Log</h3>
          <ul className="text-xs text-[var(--ltrt-text-secondary)] space-y-1 font-mono">
            {log.map((l, i) => <li key={i}>{l}</li>)}
          </ul>
        </Card>
      )}
    </div>
  )
}
