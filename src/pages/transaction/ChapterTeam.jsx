import { useMemo, useState } from 'react'
import { mockTeamRows } from '../../data/mock'
import { FileText, FileSpreadsheet, Pencil, Trash2, Users, ListChecks, User } from 'lucide-react'
import {
  PageHeader, SectionCard, Input, Select, FileUpload, Toggle, Button,
  IconButton, Modal, EmptyState, TableHead, TableRow, TableFrame, Pagination,
  tableHeadCellClass, tableCellClass,
} from '../../components/ui'
import { useChapters } from '../../context/ChapterContext'
import { useDesignations } from '../../context/DesignationContext'

const ENTRY_OPTIONS = [10, 25, 50, 100]
const blankForm = {
  chapter: '', designation: '', name: '', photo: '',
  organization: '', username: '', password: '', active: true,
}

let nextId = mockTeamRows.length + 1

export default function ChapterTeam() {
  const { chapters } = useChapters()
  const { designations } = useDesignations()

  const [rows, setRows] = useState(mockTeamRows)
  const [form, setForm] = useState(blankForm)
  const [editingId, setEditingId] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [chapterFilter, setChapterFilter] = useState('')
  const [query, setQuery] = useState('')
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const regionByChapter = useMemo(() => {
    const map = {}
    chapters.forEach((c) => { map[c.chapter] = c.region })
    return map
  }, [chapters])

  const filtered = useMemo(() => {
    let out = rows
    if (chapterFilter) out = out.filter((r) => r.chapter === chapterFilter)
    if (query.trim()) {
      const q = query.toLowerCase()
      out = out.filter(
        (r) => String(r.name).toLowerCase().includes(q) || String(r.username).toLowerCase().includes(q)
      )
    }
    return out
  }, [rows, chapterFilter, query])

  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  const current = Math.min(page, pages)
  const visible = filtered.slice((current - 1) * perPage, current * perPage)

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
    setForm({
      chapter: row.chapter, designation: row.designation, name: row.name, photo: row.photo,
      organization: row.organization, username: row.username, password: row.password, active: row.active,
    })
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

  function toggleActive(row) {
    setRows((r) => r.map((x) => (x.id === row.id ? { ...x, active: !x.active } : x)))
  }

  return (
    <div>
      <PageHeader title="Chapter Team" subtitle="Add office bearers and members to a chapter's team" />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,340px)_minmax(0,1fr)] gap-5 items-start">
        {/* ── Manage Chapter Team form ─────────────────────── */}
        <SectionCard icon={Users} title={editingId ? 'Edit Chapter Team' : 'Manage Chapter Team'} className="order-2 xl:order-1">
          <form onSubmit={save} className="p-5 space-y-4">
            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">
                Chapter<span style={{ color: 'var(--ltrt-red)' }}>*</span>
              </label>
              <Select required value={form.chapter} onChange={(e) => setForm({ ...form, chapter: e.target.value })}>
                <option value="">Select Chapter</option>
                {chapters.map((c) => (
                  <option key={c.id} value={c.chapter} disabled={!c.active}>
                    {c.chapter}{!c.active ? ' (inactive)' : ''}
                  </option>
                ))}
              </Select>
              {chapters.length === 0 && (
                <p className="text-[11.5px] text-[var(--ltrt-text-secondary)]/80 mt-1.5">
                  No chapters yet — create one under Master → Chapter first.
                </p>
              )}
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">
                Designation<span style={{ color: 'var(--ltrt-red)' }}>*</span>
              </label>
              <Select required value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })}>
                <option value="">Select Designation</option>
                {designations.map((d) => (
                  <option key={d.id} value={d.name} disabled={!d.active}>
                    {d.name}{!d.active ? ' (inactive)' : ''}
                  </option>
                ))}
              </Select>
              {designations.length === 0 && (
                <p className="text-[11.5px] text-[var(--ltrt-text-secondary)]/80 mt-1.5">
                  No designations yet — create one under Master → Manage Designation first.
                </p>
              )}
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">
                Name<span style={{ color: 'var(--ltrt-red)' }}>*</span>
              </label>
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">Photo (Max Size 1MB)</label>
              <FileUpload accept="image/*" value={form.photo} onChange={(name) => setForm({ ...form, photo: name })} />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">Organization</label>
              <Input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">
                Username<span style={{ color: 'var(--ltrt-red)' }}>*</span>
              </label>
              <Input required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">
                Password<span style={{ color: 'var(--ltrt-red)' }}>*</span>
              </label>
              <p className="text-[11.5px] text-[var(--ltrt-text-secondary)]/80 mb-1.5">Password must be a 4-digit number</p>
              <Input
                required
                type={showPassword ? 'text' : 'password'}
                inputMode="numeric"
                pattern="[0-9]{4}"
                maxLength={4}
                placeholder="Enter a new 4-digit pin"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value.replace(/\D/g, '').slice(0, 4) })}
              />
              <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="h-[16px] w-[16px] rounded accent-[var(--ltrt-red)] cursor-pointer"
                />
                <span className="text-[12.5px] text-[var(--ltrt-text-secondary)]">Show Password</span>
              </label>
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

        {/* ── View Details table ───────────────────────────── */}
        <SectionCard icon={ListChecks} title="View Details" className="order-1 xl:order-2">
          <div className="p-5">
            <div className="mb-4">
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">Select Chapter:</label>
              <Select value={chapterFilter} onChange={(e) => { setChapterFilter(e.target.value); setPage(1) }} className="!max-w-xs">
                <option value="">All Chapters</option>
                {chapters.map((c) => (
                  <option key={c.id} value={c.chapter}>{c.chapter}</option>
                ))}
              </Select>
            </div>

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
              <table className="w-full min-w-[940px]">
                <TableHead>
                  <th className={`${tableHeadCellClass} w-16`}>SL No</th>
                  <th className={tableHeadCellClass}>Chapter</th>
                  <th className={tableHeadCellClass}>Region</th>
                  <th className={tableHeadCellClass}>Designation</th>
                  <th className={tableHeadCellClass}>Name</th>
                  <th className={`${tableHeadCellClass} text-center`}>Image</th>
                  <th className={tableHeadCellClass}>Username</th>
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
                      <td className={tableCellClass}>{row.chapter}</td>
                      <td className={tableCellClass}>{regionByChapter[row.chapter] || '—'}</td>
                      <td className={tableCellClass}>{row.designation}</td>
                      <td className={`${tableCellClass} font-semibold`}>{row.name}</td>
                      <td className={`${tableCellClass} text-center`}>
                        <div className="flex justify-center">
                          <span
                            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
                            style={{ background: 'rgba(240,0,70,0.10)', color: 'var(--ltrt-red)' }}
                          >
                            <User size={16} strokeWidth={2} />
                          </span>
                        </div>
                      </td>
                      <td className={tableCellClass}>{row.username}</td>
                      <td className={tableCellClass}>
                        <button
                          onClick={() => toggleActive(row)}
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
                  icon={Users}
                  text="No data available"
                  subtitle={query || chapterFilter ? 'No team members match the current filters.' : 'Add a team member using the form to see it listed here.'}
                />
              )}
            </TableFrame>

            <Pagination page={current} pages={pages} onChange={setPage} />
          </div>
        </SectionCard>
      </div>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirm Delete">
        <p className="text-[13.5px] text-[var(--ltrt-text-secondary)] mb-5">
          Remove <strong className="text-[var(--ltrt-navy)]">{confirmDelete?.name}</strong> from the chapter team? This can't be undone.
        </p>
        <div className="flex justify-end gap-2.5">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={remove}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
