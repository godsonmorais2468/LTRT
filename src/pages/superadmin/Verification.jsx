import { useState } from 'react'
import { PageHeader, Card, Badge } from '../../components/ui'

const SEED = [
  { id: 1, name: 'BNI Trivandrum', diocese: 'Trivandrum', email: 'admin@bnitvm.in', status: 'Pending' },
  { id: 2, name: 'BNI Kochi', diocese: 'Ernakulam', email: 'admin@bnikochi.in', status: 'Verified' },
  { id: 3, name: 'BNI Calicut', diocese: 'Kozhikode', email: 'admin@bniclt.in', status: 'Verified' },
  { id: 4, name: 'BNI Thrissur', diocese: 'Thrissur', email: 'admin@bnitcr.in', status: 'Pending' },
]

export default function Verification() {
  const [rows, setRows] = useState(SEED)
  function act(id, status) {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)))
  }
  return (
    <div>
      <PageHeader title="Verification" subtitle="Approve or reject newly self-registered organisations" />
      <Card className="p-4">
        <table className="w-full text-sm">
          <thead><tr className="text-left ltrt-champagne"><th className="py-2 pr-3">Organisation</th><th className="py-2 pr-3">Diocese</th><th className="py-2 pr-3">Email</th><th className="py-2 pr-3">Status</th><th className="py-2 pr-3 text-right">Action</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-[rgba(21,42,70,0.18)]">
                <td className="py-2 pr-3">{r.name}</td>
                <td className="py-2 pr-3 text-[var(--ltrt-text-secondary)]">{r.diocese}</td>
                <td className="py-2 pr-3 text-[var(--ltrt-text-secondary)]">{r.email}</td>
                <td className="py-2 pr-3"><Badge tone={r.status === 'Pending' ? 'amber' : r.status === 'Verified' ? 'green' : 'red'}>{r.status}</Badge></td>
                <td className="py-2 pr-3 text-right whitespace-nowrap">
                  {r.status === 'Pending' ? (
                    <>
                      <button onClick={() => act(r.id, 'Verified')} className="text-emerald-600 hover:underline text-xs font-medium mr-3">Verify</button>
                      <button onClick={() => act(r.id, 'Rejected')} className="text-red-500 hover:underline text-xs font-medium">Reject</button>
                    </>
                  ) : <span className="text-xs text-[var(--ltrt-text-secondary)]/70">Done</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
