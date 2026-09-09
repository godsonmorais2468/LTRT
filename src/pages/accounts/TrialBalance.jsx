import FinancialStatement from '../../components/FinancialStatement'

export default function TrialBalance() {
  return (
    <FinancialStatement
      title="Trial Balance"
      subtitle="As on 2026-09-07"
      leftLabel="Debit"
      rightLabel="Credit"
      left={[]}
      right={[]}
    />
  )
}
