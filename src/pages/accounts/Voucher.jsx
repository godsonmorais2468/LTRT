import { useState } from 'react'
import { PageHeader, Card, Button, Badge } from '../../components/ui'

const LEDGERS = ['Cash in Hand', 'SBI Current A/c', 'Sunday Collection', 'Electricity Charges', 'Building Fund']
const TYPES = ['Payment', 'Receipt', 'Journal', 'Contra']

const SEED = [
  { id: 1, no: 'V-0004', type: 'Payment', date: '2026-09-08', ledger: 'Electricity Charges', amount: 6400 },
  { id: 2, no: 'V-0003', type: 'Receipt', date: '2026-09-07', ledger: 'Sunday Collection', amount: 132000 },
  { id: 3, no: 'V-0002', type: 'Payment', date: '2026-09-06', ledger: 'Building Fund', amount: 18000 },
  { id: 4, no: 'V-0001', type: 'Receipt', date: '2026-09-05', ledger: 'Cash in Hand', amount: 45000 },
]

export default function Voucher() {
  const [rows, setRows] = useState(SEED)
  const [type, setType] = useState('Payment')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [lines, setLines] = useState([{ ledger: '', amount: '' }])

  function updateLine(i, key, val) {
    setLines((ls) => ls.map((l, idx) => (idx === i ? { ...l, [key]: val } : l)))
  }
  function addLine() {
    setLines((ls) => [...ls, { ledger: '', amount: '' }])
  }
  function removeLine(i) {
    setLines((ls) => ls.filter((_, idx) => idx !== i))
  }

  const total = lines.reduce((s, l) => s + (Number(l.amount) || 0), 0)

  function save(e) {
    e.preventDefault()
    const first = lines[0] || {}
    setRows((r) => [{ id: Date.now(), no: `V-${String(r.length + 1).padStart(4, '0')}`, type, date, ledger: first.ledger || '-', amount: total }, ...r])
    setLines([{ ledger: '', amount: '' }])
  }

  return (
    <div>
      <PageHeader title="Voucher" subtitle="Create Payment / Receipt / Journal / Contra vouchers" />
      <Card className="p-4 mb-4">
        <form onSubmit={save} className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <div>
              <label className="block text-xs font-medium text-[var(--ltrt-text-secondary)] mb-1">Voucher Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="border border-[rgba(21,42,70,0.18)] rounded-[12px] px-3 py-2 text-sm">
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--ltrt-text-secondary)] mb-1">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-[rgba(21,42,70,0.18)] rounded-[12px] px-3 py-2 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--ltrt-text-secondary)] mb-1">Ledger Lines</label>
            <div className="space-y-2">
              {lines.map((l, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <select value={l.ledger} onChange={(e) => updateLine(i, 'ledger', e.target.value)} className="border border-[rgba(21,42,70,0.18)] rounded-[12px] px-3 py-2 text-sm flex-1">
                    <option value="">Select ledger...</option>
                    {LEDGERS.map((lg) => <option key={lg}>{lg}</option>)}
                  </select>
                  <input type="number" placeholder="Amount" value={l.amount} onChange={(e) => updateLine(i, 'amount', e.target.value)} className="border border-[rgba(21,42,70,0.18)] rounded-[12px] px-3 py-2 text-sm w-36" />
                  {lines.length > 1 && <button type="button" onClick={() => removeLine(i)} className="text-red-500 text-xs">Remove</button>}
                </div>
              ))}
            </div>
            <button type="button" onClick={addLine} className="text-rose-600 text-xs font-medium mt-2">+ Add Line</button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[rgba(21,42,70,0.18)]">
            <span className="text-sm font-semibold text-[var(--ltrt-text)]">Total: ₹{total.toLocaleString('en-IN')}</span>
            <Button type="submit">Save Voucher</Button>
          </div>
        </form>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold text-[var(--ltrt-text)] mb-3">Recent Vouchers</h3>
        <table className="w-full text-sm">
          <thead><tr className="text-left ltrt-champagne"><th className="py-2 pr-3">No.</th><th className="py-2 pr-3">Type</th><th className="py-2 pr-3">Date</th><th className="py-2 pr-3">Ledger</th><th className="py-2 pr-3">Amount</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-[rgba(21,42,70,0.18)]">
                <td className="py-2 pr-3">{r.no}</td>
                <td className="py-2 pr-3"><Badge tone={r.type === 'Receipt' ? 'green' : r.type === 'Payment' ? 'red' : 'blue'}>{r.type}</Badge></td>
                <td className="py-2 pr-3 text-[var(--ltrt-text-secondary)]">{r.date}</td>
                <td className="py-2 pr-3">{r.ledger}</td>
                <td className="py-2 pr-3 font-medium">₹{r.amount.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
