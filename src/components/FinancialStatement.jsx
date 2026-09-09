import { PageHeader, Card, TableRow, tableCellClass } from './ui'

export default function FinancialStatement({ title, subtitle, leftLabel, rightLabel, left, right }) {
  const leftTotal = left.reduce((s, r) => s + r.amount, 0)
  const rightTotal = right.reduce((s, r) => s + r.amount, 0)

  const Side = ({ label, rows, total }) => (
    <Card className="overflow-hidden flex-1">
      <div className="glass-red px-5 py-4" style={{ borderRadius: 0, border: 0 }}>
        <h3 className="font-semibold text-white text-[15px] tracking-[-0.01em]">{label}</h3>
      </div>
      <table className="w-full">
        <tbody>
          {rows.map((r, i) => (
            <TableRow key={i}>
              <td className={`${tableCellClass} text-[var(--ltrt-text-secondary)]`}>{r.name}</td>
              <td className={`${tableCellClass} text-right font-semibold tabular-nums`}>
                {r.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </td>
            </TableRow>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ background: 'linear-gradient(180deg, rgba(245,223,160,0.42), rgba(217,167,42,0.16))' }}>
            <td className="px-4 py-3.5 font-bold text-[13.5px]" style={{ color: '#7A5A12' }}>Total</td>
            <td className="px-4 py-3.5 text-right font-bold text-[13.5px] tabular-nums" style={{ color: '#7A5A12' }}>
              {total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </td>
          </tr>
        </tfoot>
      </table>
    </Card>
  )

  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} />
      <div className="flex flex-col md:flex-row gap-5">
        <Side label={leftLabel} rows={left} total={leftTotal} />
        <Side label={rightLabel} rows={right} total={rightTotal} />
      </div>
      {leftTotal !== rightTotal && (
        <p className="text-[12.5px] mt-4" style={{ color: 'var(--ltrt-warning)' }}>
          Difference: {Math.abs(leftTotal - rightTotal).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </p>
      )}
    </div>
  )
}
