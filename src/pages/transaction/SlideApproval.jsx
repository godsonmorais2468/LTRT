import { useState } from 'react'
import { mockSlideApprovals } from '../../data/mock'
import { PageHeader, Card, Button, Badge } from '../../components/ui'

const SEED = mockSlideApprovals

const REMARKS = ['Please correct the font size', 'Add chapter logo', 'Approved without changes']

export default function SlideApproval() {
  const [rows, setRows] = useState(SEED)
  const [remark, setRemark] = useState({})

  function act(id, status) {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)))
  }

  return (
    <div>
      <PageHeader title="Slide Approval" subtitle="Review and approve/reject submitted slides" />
      <Card className="p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left ltrt-champagne">
              <th className="py-2 pr-3">Title</th><th className="py-2 pr-3">Submitted By</th><th className="py-2 pr-3">Remark</th><th className="py-2 pr-3">Status</th><th className="py-2 pr-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-[rgba(21,42,70,0.18)]">
                <td className="py-2 pr-3">{r.title}</td>
                <td className="py-2 pr-3 text-[var(--ltrt-text-secondary)]">{r.submittedBy}</td>
                <td className="py-2 pr-3">
                  <select
                    className="border border-[rgba(21,42,70,0.18)] rounded-[12px] px-2 py-1 text-xs"
                    value={remark[r.id] || ''}
                    onChange={(e) => setRemark({ ...remark, [r.id]: e.target.value })}
                  >
                    <option value="">Select remark...</option>
                    {REMARKS.map((rm) => <option key={rm} value={rm}>{rm}</option>)}
                  </select>
                </td>
                <td className="py-2 pr-3">
                  <Badge tone={r.status === 'Pending' ? 'amber' : r.status === 'Approved' ? 'green' : 'red'}>{r.status}</Badge>
                </td>
                <td className="py-2 pr-3 text-right whitespace-nowrap">
                  {r.status === 'Pending' ? (
                    <>
                      <button onClick={() => act(r.id, 'Approved')} className="text-emerald-600 hover:underline text-xs font-medium mr-3">Approve</button>
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
