import CrudPage from '../../components/CrudPage'
import { statusBadge } from '../../components/CrudPage'

const config = {
  title: 'Billing', subtitle: 'Subscription invoices raised to organisations',
  columns: [
    { key: 'org', label: 'Organisation' }, { key: 'plan', label: 'Plan' },
    { key: 'amount', label: 'Amount' }, { key: 'dueDate', label: 'Due Date' },
    { key: 'paid', label: 'Paid', render: (row, toggle) => statusBadge(row, toggle, 'paid') },
  ],
  fields: [
    { key: 'org', label: 'Organisation', required: true },
    { key: 'plan', label: 'Plan', type: 'select', options: ['Annual', 'Monthly', 'Trial'] },
    { key: 'amount', label: 'Amount', type: 'number' },
    { key: 'dueDate', label: 'Due Date', type: 'date' },
    { key: 'paid', label: 'Paid', type: 'checkbox' },
  ],
  seed: [],
}

export default function Billing() {
  return <CrudPage config={config} />
}
