import { useMemo, useState } from 'react'
import { FileText, FileSpreadsheet, Pencil, Trash2, Building2, Search, ListChecks } from 'lucide-react'
import {
  PageHeader, SectionCard, Input, Textarea, Select, FileUpload, Toggle, Button,
  IconButton, Modal, EmptyState, TableHead, TableRow, TableFrame, Pagination,
  tableHeadCellClass, tableCellClass,
} from '../../components/ui'
import { useRegions } from '../../context/RegionContext'
import { useChapters } from '../../context/ChapterContext'

const ENTRY_OPTIONS = [10, 25, 50, 100]
const blankForm = { code: '', chapter: '', region: '', photo: '', description: '', active: true }

/* Logo tile — initial-based mark standing in for the uploaded chapter artwork */
function ChapterLogo({ row }) {
  return (
    <div
      className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white text-[13px] font-extrabold shrink-0"
      style={{
        background: 'linear-gradient(135deg, #F0003F, #D4003F 55%, #A80027)',
        boxShadow: '0 3px 10px rgba(212,0,63,0.28)',
      }}
      title={row.photo || row.chapter}
    >
      {String(row.chapter || '?').charAt(0)}
    </div>
  )
}

function StatusBox({ active }) {
  return (
    <span
      className="inline-block w-5 h-5 rounded-[5px] shrink-0"
      title={active ? 'Active' : 'Deactive'}
      style={{
        background: active ? 'var(--ltrt-success)' : 'rgba(110,126,149,0.35)',
        border: '1px solid rgba(255,255,255,0.6)',
      }}
    />
  )
}

export default function ManageChapter() {
  const { regions } = useRegions()
  const { chapters: rows, addChapter, updateChapter, deleteChapter, toggleChapterActive } = useChapters()
  const [form, setForm] = useState(blankForm)
  const [editingId, setEditingId] = useState(null)
  const [query, setQuery] = useState('')
  const [perPage, setPerPage] = useState(50)
  const [page, setPage] = useState(1)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = useMemo(() => {
    if (!query.trim()) return rows
    const q = query.toLowerCase()
    return rows.filter(
      (r) => String(r.code).toLowerCase().includes(q) || String(r.chapter).toLowerCase().includes(q)
    )
  }, [rows, query])

  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  const current = Math.min(page, pages)
  const visible = filtered.slice((current - 1) * perPage, current * perPage)

  function save(e) {
    e.preventDefault()
    if (editingId) {
      updateChapter(editingId, form)
    } else {
      addChapter(form)
    }
    setForm(blankForm)
    setEditingId(null)
  }

  function edit(row) {
    setForm({ code: row.code, chapter: row.chapter, region: row.region, photo: row.photo, description: row.description, active: row.active })
    setEditingId(row.id)
  }

  function remove() {
    deleteChapter(confirmDelete.id)
    if (editingId === confirmDelete.id) {
      setForm(blankForm)
      setEditingId(null)
    }
    setConfirmDelete(null)
  }

  return (
    <div>
      <PageHeader title="Chapter" subtitle="Create and manage chapters across the platform" />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,340px)_minmax(0,1fr)] gap-5 items-start">
        {/* ── Manage Chapter form ───────────────────────────── */}
        {/* On narrow screens the grid stacks; the entries table matters more than the form, so it goes first there */}
        <SectionCard icon={Building2} title={editingId ? 'Edit Chapter' : 'Manage Chapter'} className="order-2 xl:order-1">
          <form onSubmit={save} className="p-5 space-y-4">
            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">
                Code<span style={{ color: 'var(--ltrt-red)' }}>*</span>
              </label>
              <Input required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">
                Chapter<span style={{ color: 'var(--ltrt-red)' }}>*</span>
              </label>
              <Input required value={form.chapter} onChange={(e) => setForm({ ...form, chapter: e.target.value })} />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">
                Region<span style={{ color: 'var(--ltrt-red)' }}>*</span>
              </label>
              <Select required value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })}>
                <option value="">Select region...</option>
                {regions.map((r) => (
                  <option key={r.id} value={r.name} disabled={!r.active}>
                    {r.name}{!r.active ? ' (inactive)' : ''}
                  </option>
                ))}
              </Select>
              {regions.length === 0 && (
                <p className="text-[11.5px] text-[var(--ltrt-text-secondary)]/80 mt-1.5">
                  No regions yet — create one under Master → Region first.
                </p>
              )}
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">Photo</label>
              <FileUpload accept="image/*" value={form.photo} onChange={(name) => setForm({ ...form, photo: name })} />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-[var(--ltrt-text-secondary)] mb-1.5">Description</label>
              <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
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

        {/* ── View Details table ────────────────────────────── */}
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

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-[13px] text-[var(--ltrt-text-secondary)]">Search:</span>
                <div className="relative flex-1 sm:flex-none">
                  <Search size={14} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ltrt-text-secondary)]/70 pointer-events-none z-10" />
                  <Input
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setPage(1) }}
                    className="!w-full sm:!w-52 !py-2 !pl-9"
                  />
                </div>
              </div>
            </div>

            <TableFrame className="hidden sm:block">
              <table className="w-full min-w-[760px]">
                <TableHead>
                  <th className={`${tableHeadCellClass} w-16`}>SL No</th>
                  <th className={`${tableHeadCellClass} text-center w-28`}>Action</th>
                  <th className={tableHeadCellClass}>Code</th>
                  <th className={`${tableHeadCellClass} text-center w-20`}>Logo</th>
                  <th className={tableHeadCellClass}>Chapter</th>
                  <th className={tableHeadCellClass}>Region</th>
                  <th className={tableHeadCellClass}>A/D</th>
                  <th className={`${tableHeadCellClass} text-center`}>Status</th>
                </TableHead>
                <tbody>
                  {visible.map((row, i) => (
                    <TableRow key={row.id}>
                      <td className={`${tableCellClass} text-[var(--ltrt-text-secondary)]/70`}>
                        {(current - 1) * perPage + i + 1}
                      </td>
                      <td className={`${tableCellClass} text-center`}>
                        <div className="flex justify-center">
                          <IconButton icon={Pencil} tone="emerald" title="Edit" onClick={() => edit(row)} />
                          <IconButton icon={Trash2} tone="red" title="Delete" onClick={() => setConfirmDelete(row)} />
                        </div>
                      </td>
                      <td className={`${tableCellClass} font-semibold`}>{row.code}</td>
                      <td className={`${tableCellClass} text-center`}>
                        <div className="flex justify-center"><ChapterLogo row={row} /></div>
                      </td>
                      <td className={`${tableCellClass} font-semibold`}>{row.chapter}</td>
                      <td className={tableCellClass}>{row.region || '—'}</td>
                      <td className={tableCellClass}>{row.active ? 'Active' : 'Deactive'}</td>
                      <td className={`${tableCellClass} text-center`}>
                        <div className="flex justify-center"><StatusBox active={row.active} /></div>
                      </td>
                    </TableRow>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <EmptyState
                  icon={Building2}
                  text="No data available"
                  subtitle={query ? 'No chapters match your search.' : 'Add a chapter using the form to see it listed here.'}
                />
              )}
            </TableFrame>

            {/* Mobile: card per chapter so the page never scrolls sideways */}
            <div className="sm:hidden space-y-2.5">
              {visible.map((row, i) => (
                <div
                  key={row.id}
                  className="rounded-[14px] p-3.5"
                  style={{ background: 'rgba(255,255,255,0.62)', border: '1px solid rgba(21,42,70,0.14)' }}
                >
                  <div className="flex items-center gap-2.5">
                    <ChapterLogo row={row} />
                    <p className="min-w-0 flex-1 text-[14.5px] font-bold text-[var(--ltrt-navy)] break-words">{row.chapter}</p>
                    <StatusBox active={row.active} />
                  </div>
                  <div className="flex items-end justify-between gap-2 mt-2.5 pt-2.5 border-t border-[rgba(21,42,70,0.10)]">
                    <div className="min-w-0 text-[12px] leading-snug text-[var(--ltrt-text-secondary)]">
                      <p className="font-semibold text-[var(--ltrt-text)]">{row.code}</p>
                      <p className="break-words">{row.region || '—'} · {row.active ? 'Active' : 'Deactive'}</p>
                    </div>
                    <div className="flex items-center shrink-0">
                      <IconButton icon={Pencil} tone="emerald" title="Edit" onClick={() => edit(row)} />
                      <IconButton icon={Trash2} tone="red" title="Delete" onClick={() => setConfirmDelete(row)} />
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <EmptyState
                  icon={Building2}
                  text="No data available"
                  subtitle={query ? 'No chapters match your search.' : 'Add a chapter using the form to see it listed here.'}
                />
              )}
            </div>

            <Pagination page={current} pages={pages} onChange={setPage} />
          </div>
        </SectionCard>
      </div>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirm Delete">
        <p className="text-[13.5px] text-[var(--ltrt-text-secondary)] mb-5">
          Delete chapter <strong className="text-[var(--ltrt-navy)]">{confirmDelete?.chapter}</strong>? This can't be undone.
        </p>
        <div className="flex justify-end gap-2.5">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={remove}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
