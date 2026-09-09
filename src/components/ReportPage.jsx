import { useMemo, useState } from 'react'
import { Download, Printer, FileSearch } from 'lucide-react'
import {
  PageHeader, Card, EmptyState, Button, SearchInput, Input,
  TableHead, TableRow, TableFrame, Pagination, tableHeadCellClass, tableCellClass,
} from './ui'

const PAGE_SIZE = 12

export default function ReportPage({ title, subtitle, columns, rows, filters, summary }) {
  const [query, setQuery] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let out = rows
    if (query.trim()) {
      const q = query.toLowerCase()
      out = out.filter((r) => columns.some((c) => String(r[c.key] ?? '').toLowerCase().includes(q)))
    }
    if (filters?.dateKey && from) out = out.filter((r) => r[filters.dateKey] >= from)
    if (filters?.dateKey && to) out = out.filter((r) => r[filters.dateKey] <= to)
    return out
  }, [rows, query, from, to, columns, filters])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pages)
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} />

      {summary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          {summary.map((s) => (
            <Card key={s.label} className="p-4">
              <p className="text-[12.5px] text-[var(--ltrt-text-secondary)]">{s.label}</p>
              <p className="text-[24px] font-extrabold text-[var(--ltrt-navy)] mt-1 tabular-nums leading-none">{s.value}</p>
            </Card>
          ))}
        </div>
      )}

      <Card className="p-5" hover={false}>
        <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
          <div className="flex flex-wrap gap-2.5 items-center">
            <SearchInput
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1) }}
              placeholder="Search..."
              className="w-full sm:w-56"
            />
            {filters?.dateKey && (
              <>
                <Input type="date" value={from} onChange={(e) => { setFrom(e.target.value); setPage(1) }} className="!w-auto !py-2.5" />
                <span className="text-[var(--ltrt-text-secondary)]/70 text-[12.5px]">to</span>
                <Input type="date" value={to} onChange={(e) => { setTo(e.target.value); setPage(1) }} className="!w-auto !py-2.5" />
              </>
            )}
          </div>
          <div className="flex gap-2.5">
            <Button variant="secondary" className="!h-[38px] !px-3.5 !text-[12.5px]">
              <Download size={15} strokeWidth={2} /> Export CSV
            </Button>
            <Button variant="secondary" className="!h-[38px] !px-3.5 !text-[12.5px]">
              <Printer size={15} strokeWidth={2} /> Print
            </Button>
          </div>
        </div>

        <TableFrame>
          <table className="w-full min-w-[560px]">
            <TableHead>
              <th className={`${tableHeadCellClass} w-12`}>#</th>
              {columns.map((c) => (
                <th key={c.key} className={tableHeadCellClass}>{c.label}</th>
              ))}
            </TableHead>
            <tbody>
              {visible.map((row, i) => (
                <TableRow key={row.id ?? i}>
                  <td className={`${tableCellClass} text-[var(--ltrt-text-secondary)]/70`}>
                    {(current - 1) * PAGE_SIZE + i + 1}
                  </td>
                  {columns.map((c) => (
                    <td key={c.key} className={tableCellClass}>
                      {c.render ? c.render(row) : String(row[c.key] ?? '')}
                    </td>
                  ))}
                </TableRow>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <EmptyState
              icon={FileSearch}
              text="No data available"
              subtitle={query || from || to ? 'No records match the current filters.' : 'There are no records to display at the moment.'}
            />
          )}
        </TableFrame>

        <Pagination page={current} pages={pages} onChange={setPage} />
      </Card>
    </div>
  )
}
