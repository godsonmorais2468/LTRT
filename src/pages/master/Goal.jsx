import { useMemo, useState } from 'react'
import { mockGoals } from '../../data/mock'
import { Target, Pencil, Trash2, ListChecks } from 'lucide-react'
import {
  PageHeader, SectionCard, Input, Select, Button,
  IconButton, Modal, EmptyState, TableHead, TableRow, TableFrame, Pagination,
  tableHeadCellClass, tableCellClass,
} from '../../components/ui'

const ENTRY_OPTIONS = [10, 25, 50, 100]

const STAT_ROWS = [
  { key: 'business', label: 'Business (TYFCB)', locked: false },
  { key: 'absenteeism', label: 'Absenteeism (In minus %)', locked: true },
  { key: 'visitors', label: 'Visitors Per Month', locked: false },
  { key: 'memberAddition', label: 'Member Addition', locked: true },
  { key: 'memberDrops', label: 'Member Drops (Incl. Non Renewals)', locked: true },
  { key: 'referrals', label: 'Referrals', locked: false },
]

const blankStats = { business: '', absenteeism: '0', visitors: '', memberAddition: '0', memberDrops: '0', referrals: '' }
const blankForm = { fromMonth: '', toMonth: '', currentStrength: '', setGoal: '', stats: blankStats }

const fmtMonth = (v) => {
  if (!v) return ''
  const [y, m] = v.split('-')
  const d = new Date(Number(y), Number(m) - 1, 1)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

let nextId = mockGoals.length + 1

export default function Goal() {
  const [rows, setRows] = useState(mockGoals)
  const [form, setForm] = useState(blankForm)
  const [editingId, setEditingId] = useState(null)
  const [query, setQuery] = useState('')
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = useMemo(() => {
    if (!query.trim()) return rows
    const q = query.toLowerCase()
    return rows.filter((r) => fmtMonth(r.fromMonth).toLowerCase().includes(q) || fmtMonth(r.toMonth).toLowerCase().includes(q))
  }, [rows, query])

  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  const current = Math.min(page, pages)
  const visible = filtered.slice((current - 1) * perPage, current * perPage)

  const setStat = (key) => (e) => setForm({ ...form, stats: { ...form.stats, [key]: e.target.value } })

  function save(e) {
    e.preventDefault()
    if (editingId) {
      setRows((r) => r.map((row) => (row.id === editingId ? { ...row, ...form } : row)))
    } else {
      setRows((r) => [...r, { id: nextId++, ...form }])
    }
    setForm(blankForm)
    setEditingId(null)
  }

  function edit(row) {
    setForm({ fromMonth: row.fromMonth, toMonth: row.toMonth, currentStrength: row.currentStrength, setGoal: row.setGoal, stats: row.stats })
    setEditingId(row.id)
  }

  function remove() {
    setRows((r) => r.filter((row) => row.id !== confirmDelete.id))
    if (editingId === confirmDelete.id) {
      setForm(blankForm)
      setEditingId(null)
    }
    setConfirmDelete(null)
  }

  return (
    <div>
      <PageHeader title="Set Goal" subtitle="Chapter targets for the year" />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)] gap-5 items-start">
        <SectionCard icon={Target} title={editingId ? 'Edit Goal' : 'Set Goal'} className="order-2 xl:order-1">
          <form onSubmit={save} className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">
                  From Month<span style={{ color: 'var(--ltrt-red)' }}>*</span>
                </label>
                <Input type="month" required value={form.fromMonth} onChange={(e) => setForm({ ...form, fromMonth: e.target.value })} />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">
                  To Month<span style={{ color: 'var(--ltrt-red)' }}>*</span>
                </label>
                <Input type="month" required value={form.toMonth} onChange={(e) => setForm({ ...form, toMonth: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">
                  Current Member Strength<span style={{ color: 'var(--ltrt-red)' }}>*</span>
                </label>
                <Input type="number" min="0" required value={form.currentStrength} onChange={(e) => setForm({ ...form, currentStrength: e.target.value })} />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">
                  Set Goal<span style={{ color: 'var(--ltrt-red)' }}>*</span>
                </label>
                <Input type="number" min="0" required value={form.setGoal} onChange={(e) => setForm({ ...form, setGoal: e.target.value })} />
              </div>
            </div>

            <div className="rounded-[14px] overflow-hidden border border-[rgba(21,42,70,0.10)]">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left text-[13px] font-bold text-[#7A5A12] py-2.5 px-3.5" style={{ background: 'var(--ltrt-gold)' }}>Stat</th>
                    <th className="text-left text-[13px] font-bold text-[#7A5A12] py-2.5 px-3.5" style={{ background: 'var(--ltrt-gold)' }}>Goal</th>
                  </tr>
                </thead>
                <tbody>
                  {STAT_ROWS.map((s, i) => (
                    <tr key={s.key} style={{ background: i % 2 === 0 ? 'rgba(217,167,42,0.10)' : 'transparent' }}>
                      <td className="py-2.5 px-3.5 text-[13.5px] font-medium text-[var(--ltrt-text)] border-t border-[rgba(21,42,70,0.08)]">{s.label}</td>
                      <td className="py-2 px-3.5 border-t border-[rgba(21,42,70,0.08)]">
                        <Input
                          type="number"
                          min="0"
                          disabled={s.locked}
                          value={form.stats[s.key]}
                          onChange={setStat(s.key)}
                          className={s.locked ? '!bg-[rgba(21,42,70,0.10)] !text-[var(--ltrt-text-secondary)]' : ''}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-2.5 pt-1">
              <Button type="submit">{editingId ? 'Update' : 'Save'}</Button>
              {editingId && (
                <Button type="button" variant="secondary" onClick={() => { setForm(blankForm); setEditingId(null) }}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </SectionCard>

        <SectionCard icon={ListChecks} title="View Details" className="order-1 xl:order-2">
          <div className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[var(--ltrt-text-secondary)]">Show</span>
                <Select
                  value={perPage}
                  onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1) }}
                  className="!w-auto !py-2 !px-3"
                >
                  {ENTRY_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                </Select>
                <span className="text-[13px] text-[var(--ltrt-text-secondary)]">entries</span>
              </div>

              <Input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1) }}
                placeholder="Search..."
                className="!w-full sm:!w-56"
              />
            </div>

            <TableFrame>
              <table className="w-full min-w-[520px]">
                <TableHead>
                  <th className={`${tableHeadCellClass} w-16`}>SL No</th>
                  <th className={tableHeadCellClass}>From Month</th>
                  <th className={tableHeadCellClass}>To Month</th>
                  <th className={`${tableHeadCellClass} text-center`}>Edit</th>
                  <th className={`${tableHeadCellClass} text-center`}>Delete</th>
                </TableHead>
                <tbody>
                  {visible.map((row, i) => (
                    <TableRow key={row.id}>
                      <td className={`${tableCellClass} text-[var(--ltrt-text-secondary)]/70`}>
                        {(current - 1) * perPage + i + 1}
                      </td>
                      <td className={`${tableCellClass} font-semibold`}>{fmtMonth(row.fromMonth)}</td>
                      <td className={`${tableCellClass} font-semibold`}>{fmtMonth(row.toMonth)}</td>
                      <td className={`${tableCellClass} text-center`}>
                        <div className="flex justify-center">
                          <IconButton icon={Pencil} tone="emerald" title="Edit" onClick={() => edit(row)} />
                        </div>
                      </td>
                      <td className={`${tableCellClass} text-center`}>
                        <div className="flex justify-center">
                          <IconButton icon={Trash2} tone="red" title="Delete" onClick={() => setConfirmDelete(row)} />
                        </div>
                      </td>
                    </TableRow>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <EmptyState
                  icon={Target}
                  text="No data available"
                  subtitle={query ? 'No goals match your search.' : 'Set a goal using the form to see it listed here.'}
                />
              )}
            </TableFrame>

            <Pagination page={current} pages={pages} onChange={setPage} />
          </div>
        </SectionCard>
      </div>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirm Delete">
        <p className="text-[13.5px] text-[var(--ltrt-text-secondary)] mb-5">
          Delete goal <strong className="text-[var(--ltrt-navy)]">{fmtMonth(confirmDelete?.fromMonth)} – {fmtMonth(confirmDelete?.toMonth)}</strong>? This can't be undone.
        </p>
        <div className="flex justify-end gap-2.5">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={remove}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
