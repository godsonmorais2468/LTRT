import FinancialStatement from '../../components/FinancialStatement'

export default function ProfitLoss() {
  return (
    <FinancialStatement
      title="Profit & Loss"
      subtitle="For financial year 2025-26"
      leftLabel="Expenditure"
      rightLabel="Income"
      left={[]}
      right={[]}
    />
  )
}
