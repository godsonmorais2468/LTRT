import { useMemo, useState } from 'react'
import { Pencil, Trash2, MapPin, ListChecks } from 'lucide-react'
import {
  PageHeader, SectionCard, Input, Toggle, Button,
  IconButton, Modal, EmptyState, TableHead, TableRow, TableFrame,
  tableHeadCellClass, tableCellClass,
} from '../../components/ui'
import { useRegions } from '../../context/RegionContext'

const blankForm = { code: '', name: '', active: true }

export default function Region() {
  const { regions, addRegion, updateRegion, deleteRegion, toggleRegionActive } = useRegions()
  const [form, setForm] = useState(blankForm)
  const [editingId, setEditingId] = useState(null)
  const [query, setQuery] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = useMemo(() => {
    if (!query.trim()) return regions
    const q = query.toLowerCase()
    return regions.filter((r) => String(r.code).toLowerCase().includes(q) || String(r.name).toLowerCase().includes(q))
  }, [regions, query])

  function save(e) {
    e.preventDefault()
    if (editingId) {
      updateRegion(editingId, form)
    } else {
      addRegion(form)
    }
    setForm(blankForm)
    setEditingId(null)
  }

  function edit(row) {
    setForm({ code: row.code, name: row.name, active: row.active })
    setEditingId(row.id)
  }

  function remove() {
    deleteRegion(confirmDelete.id)
    if (editingId === confirmDelete.id) {
      setForm(blankForm)
      setEditingId(null)
    }
    setConfirmDelete(null)
  }

  return (
    <div>
      <PageHeader title="Region" subtitle="Create regions that chapters can be grouped under" />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,340px)_minmax(0,1fr)] gap-5 items-start">
        <SectionCard icon={MapPin} title={editingId ? 'Edit Region' : 'Manage Region'} className="order-2 xl:order-1">
          <form onSubmit={save} className="p-5 space-y-4">
            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">
                Code<span style={{ color: 'var(--ltrt-red)' }}>*</span>
              </label>
              <Input required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">
                Region Name<span style={{ color: 'var(--ltrt-red)' }}>*</span>
              </label>
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)]">Active/Deactive</span>
              <Toggle checked={form.active} onChange={(v) => setForm({ ...form, active: v })} />
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
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="!w-full sm:!w-56"
              />
              <span className="text-[12.5px] text-[var(--ltrt-text-secondary)]">
                {filtered.length} record{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>

            <TableFrame>
              <table className="w-full min-w-[420px]">
                <TableHead>
                  <th className={`${tableHeadCellClass} w-16`}>SL No</th>
                  <th className={tableHeadCellClass}>Code</th>
                  <th className={tableHeadCellClass}>Region Name</th>
                  <th className={`${tableHeadCellClass} text-center`}>Edit</th>
                  <th className={`${tableHeadCellClass} text-center`}>Delete</th>
                  <th className={`${tableHeadCellClass} text-center`}>Status</th>
                </TableHead>
                <tbody>
                  {filtered.map((row, i) => (
                    <TableRow key={row.id}>
                      <td className={`${tableCellClass} text-[var(--ltrt-text-secondary)]/70`}>{i + 1}</td>
                      <td className={`${tableCellClass} font-semibold`}>{row.code}</td>
                      <td className={`${tableCellClass} font-semibold`}>{row.name}</td>
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
                      <td className={`${tableCellClass} text-center`}>
                        <div className="flex justify-center">
                          <Toggle checked={row.active} onChange={() => toggleRegionActive(row.id)} title="Toggle status" />
                        </div>
                      </td>
                    </TableRow>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <EmptyState
                  icon={MapPin}
                  text="No data available"
                  subtitle={query ? 'No regions match your search.' : 'Add a region using the form to see it listed here.'}
                />
              )}
            </TableFrame>
          </div>
        </SectionCard>
      </div>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirm Delete">
        <p className="text-[13.5px] text-[var(--ltrt-text-secondary)] mb-5">
          Delete region <strong className="text-[var(--ltrt-navy)]">{confirmDelete?.name}</strong>? This can't be undone.
        </p>
        <div className="flex justify-end gap-2.5">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={remove}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
