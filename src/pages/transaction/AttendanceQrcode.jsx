import { useState } from 'react'
import { PageHeader, Card, Button } from '../../components/ui'

export default function AttendanceQrcode() {
  const [scanned, setScanned] = useState([])

  function simulateScan() {
    setScanned((s) => [{ id: Date.now(), name: '', time: new Date().toLocaleTimeString() }, ...s])
  }

  return (
    <div>
      <PageHeader title="Attendance QR Code" subtitle="Members scan this code to self check-in" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 flex flex-col items-center justify-center">
          <div className="w-48 h-48 bg-white border-4 border-gray-800 grid grid-cols-6 grid-rows-6 gap-0.5 p-2">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className={(i * 7) % 5 === 0 ? 'bg-gray-900' : 'bg-white'} />
            ))}
          </div>
          <p className="text-xs text-[var(--ltrt-text-secondary)]/70 mt-3">Chapter QR — refreshes every session</p>
          <Button className="mt-4" onClick={simulateScan}>Simulate a Scan</Button>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-[var(--ltrt-text)] mb-3">Scanned Just Now ({scanned.length})</h3>
          <table className="w-full text-sm">
            <thead><tr className="text-left ltrt-champagne"><th className="py-2 pr-3">Name</th><th className="py-2 pr-3">Time</th></tr></thead>
            <tbody>
              {scanned.map((s) => (
                <tr key={s.id} className="border-b border-[rgba(21,42,70,0.18)]"><td className="py-2 pr-3">{s.name}</td><td className="py-2 pr-3 text-[var(--ltrt-text-secondary)]">{s.time}</td></tr>
              ))}
            </tbody>
          </table>
          {scanned.length === 0 && <p className="text-sm text-[var(--ltrt-text-secondary)]/70 py-6 text-center">No scans yet — click "Simulate a Scan"</p>}
        </Card>
      </div>
    </div>
  )
}
