import FinancialStatement from '../../components/FinancialStatement'

export default function BalanceSheet() {
  return (
    <FinancialStatement
      title="Balance Sheet"
      subtitle="For financial year 2025-26"
      leftLabel="Liabilities"
      rightLabel="Assets"
      left={[]}
      right={[]}
    />
  )
}
