import FinancialStatement from '../../components/FinancialStatement'

export default function ReceiptPayment() {
  return (
    <FinancialStatement
      title="Receipt & Payment"
      subtitle="For the month of August 2026"
      leftLabel="Receipts"
      rightLabel="Payments"
      left={[]}
      right={[]}
    />
  )
}
