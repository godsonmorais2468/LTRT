import { useMemo, useState } from 'react'
import { FileText, FileSpreadsheet, Pencil, Trash2, ScrollText, ListChecks } from 'lucide-react'
import {
  PageHeader, SectionCard, Input, Textarea, Select, Toggle, Button,
  IconButton, Modal, EmptyState, TableHead, TableRow, TableFrame, Pagination,
  tableHeadCellClass, tableCellClass,
} from '../../components/ui'
import { useDesignations } from '../../context/DesignationContext'

const ENTRY_OPTIONS = [10, 25, 50, 100]
const blankForm = {
  order: '', name: '', description: '',
  headTable: false, approvalPrivilege: false, active: true,
}

function CheckField({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-[18px] w-[18px] rounded accent-[var(--ltrt-red)] cursor-pointer"
      />
      <span className="text-[13px] font-medium text-[var(--ltrt-text)]">{label}</span>
    </label>
  )
}

export default function ManageDesignation() {
  const { designations: rows, addDesignation, updateDesignation, deleteDesignation, toggleDesignationActive } = useDesignations()
  const [form, setForm] = useState(blankForm)
  const [editingId, setEditingId] = useState(null)
  const [query, setQuery] = useState('')
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = useMemo(() => {
    if (!query.trim()) return rows
    const q = query.toLowerCase()
    return rows.filter((r) => String(r.name).toLowerCase().includes(q))
  }, [rows, query])

  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  const current = Math.min(page, pages)
  const visible = filtered.slice((current - 1) * perPage, current * perPage)

  function save(e) {
    e.preventDefault()
    if (editingId) {
      updateDesignation(editingId, form)
    } else {
      addDesignation(form)
    }
    setForm(blankForm)
    setEditingId(null)
  }

  function edit(row) {
    setForm({
      order: row.order, name: row.name, description: row.description,
      headTable: row.headTable, approvalPrivilege: row.approvalPrivilege, active: row.active,
    })
    setEditingId(row.id)
  }

  function remove() {
    deleteDesignation(confirmDelete.id)
    if (editingId === confirmDelete.id) {
      setForm(blankForm)
      setEditingId(null)
    }
    setConfirmDelete(null)
  }

  return (
    <div>
      <PageHeader title="Manage Designation" subtitle="Designations available for chapter members" />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,340px)_minmax(0,1fr)] gap-5 items-start">
        {/* ── Manage Designation form ──────────────────────── */}
        <SectionCard icon={ScrollText} title={editingId ? 'Edit Designation' : 'Manage Designation'} className="order-2 xl:order-1">
          <form onSubmit={save} className="p-5 space-y-4">
            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">
                Order Number<span style={{ color: 'var(--ltrt-red)' }}>*</span>
              </label>
              <Input type="number" required value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">
                Name<span style={{ color: 'var(--ltrt-red)' }}>*</span>
              </label>
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">Description</label>
              <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <CheckField label="Head Table" checked={form.headTable} onChange={(v) => setForm({ ...form, headTable: v })} />
              <CheckField label="Approval Privilege" checked={form.approvalPrivilege} onChange={(v) => setForm({ ...form, approvalPrivilege: v })} />
              <div className="flex items-center gap-2">
                <Toggle checked={form.active} onChange={(v) => setForm({ ...form, active: v })} />
                <span className="text-[13px] font-medium text-[var(--ltrt-text)]">Active/Deactive</span>
              </div>
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

        {/* ── View Details table ───────────────────────────── */}
        <SectionCard icon={ListChecks} title="View Details" className="order-1 xl:order-2">
          <div className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap items-center gap-3">
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

                <div className="flex gap-2">
                  <Button variant="secondary" className="!h-[36px] !px-3 !text-[12.5px]">
                    <FileText size={14} strokeWidth={2} /> PDF
                  </Button>
                  <Button variant="secondary" className="!h-[36px] !px-3 !text-[12.5px]">
                    <FileSpreadsheet size={14} strokeWidth={2} /> Excel
                  </Button>
                </div>
              </div>

              <Input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1) }}
                placeholder="Search..."
                className="!w-full sm:!w-56"
              />
            </div>

            <TableFrame>
              <table className="w-full min-w-[760px]">
                <TableHead>
                  <th className={`${tableHeadCellClass} w-16`}>SL No</th>
                  <th className={tableHeadCellClass}>Order No</th>
                  <th className={tableHeadCellClass}>Name</th>
                  <th className={`${tableHeadCellClass} text-center`}>Head Table</th>
                  <th className={`${tableHeadCellClass} text-center`}>Approval Privilege</th>
                  <th className={tableHeadCellClass}>A/D</th>
                  <th className={`${tableHeadCellClass} text-center`}>Edit</th>
                  <th className={`${tableHeadCellClass} text-center`}>Delete</th>
                </TableHead>
                <tbody>
                  {visible.map((row, i) => (
                    <TableRow key={row.id}>
                      <td className={`${tableCellClass} text-[var(--ltrt-text-secondary)]/70`}>
                        {(current - 1) * perPage + i + 1}
                      </td>
                      <td className={tableCellClass}>{row.order}</td>
                      <td className={`${tableCellClass} font-semibold`}>{row.name}</td>
                      <td className={`${tableCellClass} text-center`}>{row.headTable ? 'Yes' : 'No'}</td>
                      <td className={`${tableCellClass} text-center`}>{row.approvalPrivilege ? 'Yes' : 'No'}</td>
                      <td className={tableCellClass}>
                        <button
                          onClick={() => toggleDesignationActive(row.id)}
                          className="text-[12.5px] font-semibold transition-transform duration-150 hover:scale-105 active:scale-95"
                          style={{ color: row.active ? 'var(--ltrt-success)' : 'var(--ltrt-text-secondary)' }}
                        >
                          {row.active ? 'Active' : 'Deactive'}
                        </button>
                      </td>
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
                  icon={ScrollText}
                  text="No data available"
                  subtitle={query ? 'No designations match your search.' : 'Add a designation using the form to see it listed here.'}
                />
              )}
            </TableFrame>

            <Pagination page={current} pages={pages} onChange={setPage} />
          </div>
        </SectionCard>
      </div>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirm Delete">
        <p className="text-[13.5px] text-[var(--ltrt-text-secondary)] mb-5">
          Delete designation <strong className="text-[var(--ltrt-navy)]">{confirmDelete?.name}</strong>? This can't be undone.
        </p>
        <div className="flex justify-end gap-2.5">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={remove}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
