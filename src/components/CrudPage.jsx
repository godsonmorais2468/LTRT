import { useMemo, useState } from 'react'
import { Pencil, Trash2, Plus, FileSearch } from 'lucide-react'
import {
  PageHeader, Card, Button, Modal, EmptyState, Badge, Input, Select,
  SearchInput, IconButton, TableHead, TableRow, TableFrame, Pagination,
  tableHeadCellClass, tableCellClass,
} from './ui'

let nextId = 10000
const PAGE_SIZE = 10

export default function CrudPage({ config }) {
  const { title, subtitle, columns, fields, seed, statusToggle } = config
  const [rows, setRows] = useState(seed)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(null) // { mode: 'add'|'edit', row }
  const [form, setForm] = useState({})
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = useMemo(() => {
    if (!query.trim()) return rows
    const q = query.toLowerCase()
    return rows.filter((r) => columns.some((c) => String(r[c.key] ?? '').toLowerCase().includes(q)))
  }, [rows, query, columns])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pages)
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  function openAdd() {
    const blank = {}
    fields.forEach((f) => (blank[f.key] = f.type === 'checkbox' ? false : ''))
    setForm(blank)
    setModal({ mode: 'add' })
  }

  function openEdit(row) {
    setForm({ ...row })
    setModal({ mode: 'edit', row })
  }

  function save(e) {
    e.preventDefault()
    if (modal.mode === 'add') {
      setRows((r) => [{ id: nextId++, ...form }, ...r])
    } else {
      setRows((r) => r.map((row) => (row.id === modal.row.id ? { ...row, ...form } : row)))
    }
    setModal(null)
  }

  function doDelete() {
    setRows((r) => r.filter((row) => row.id !== confirmDelete.id))
    setConfirmDelete(null)
  }

  function toggleStatus(row) {
    setRows((r) => r.map((x) => (x.id === row.id ? { ...x, [statusToggle]: x[statusToggle] ? 0 : 1 } : x)))
  }

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        action={
          <Button onClick={openAdd}>
            <Plus size={17} strokeWidth={2.4} /> Add New
          </Button>
        }
      />

      <Card className="p-5" hover={false}>
        <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
          <SearchInput
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1) }}
            placeholder="Search..."
            className="w-full sm:w-64"
          />
          <span className="text-[12.5px] text-[var(--ltrt-text-secondary)]">
            {filtered.length} record{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        <TableFrame>
          <table className="w-full min-w-[560px]">
            <TableHead>
              <th className={`${tableHeadCellClass} w-12`}>#</th>
              {columns.map((c) => (
                <th key={c.key} className={tableHeadCellClass}>{c.label}</th>
              ))}
              <th className={`${tableHeadCellClass} text-right`}>Actions</th>
            </TableHead>
            <tbody>
              {visible.map((row, i) => (
                <TableRow key={row.id}>
                  <td className={`${tableCellClass} text-[var(--ltrt-text-secondary)]/70`}>
                    {(current - 1) * PAGE_SIZE + i + 1}
                  </td>
                  {columns.map((c) => (
                    <td key={c.key} className={tableCellClass}>
                      {c.render ? c.render(row, () => toggleStatus(row)) : String(row[c.key] ?? '')}
                    </td>
                  ))}
                  <td className={`${tableCellClass} text-right whitespace-nowrap`}>
                    <div className="flex justify-end gap-1">
                      <IconButton icon={Pencil} tone="emerald" title="Edit" onClick={() => openEdit(row)} />
                      <IconButton icon={Trash2} tone="red" title="Delete" onClick={() => setConfirmDelete(row)} />
                    </div>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <EmptyState
              icon={FileSearch}
              text="No data available"
              subtitle={query ? 'No records match your search.' : `There are no ${title.toLowerCase()} records yet.`}
              action={!query && <Button onClick={openAdd}><Plus size={16} strokeWidth={2.4} /> Add New</Button>}
            />
          )}
        </TableFrame>

        <Pagination page={current} pages={pages} onChange={setPage} />
      </Card>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode === 'add' ? `Add ${title}` : `Edit ${title}`} wide>
        <form onSubmit={save} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.key} className={f.full ? 'sm:col-span-2' : ''}>
                <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">{f.label}</label>
                {f.type === 'select' ? (
                  <Select
                    value={form[f.key] ?? ''}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    required={f.required}
                  >
                    <option value="">Select...</option>
                    {f.options.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
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
                    required={f.required}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2.5 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModal(null)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirm Delete">
        <p className="text-[13.5px] text-[var(--ltrt-text-secondary)] mb-5">
          Delete this record? This can't be undone in a real system — here it just resets on reload.
        </p>
        <div className="flex justify-end gap-2.5">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={doDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}

export function statusBadge(row, onToggle, key = 'status') {
  const active = Number(row[key]) === 1
  return (
    <button onClick={onToggle} className="transition-transform duration-150 hover:scale-105 active:scale-95">
      <Badge tone={active ? 'active' : 'inactive'}>{active ? 'Active' : 'Inactive'}</Badge>
    </button>
  )
}
