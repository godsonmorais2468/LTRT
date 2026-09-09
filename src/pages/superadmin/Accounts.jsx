import { StatCard, PageHeader } from '../../components/ui'
import { Wallet, Clock, Handshake, Undo2 } from 'lucide-react'

export default function Accounts() {
  return (
    <div>
      <PageHeader title="Accounts" subtitle="Platform revenue overview" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Revenue (FY)" value="-" icon={Wallet} accent="emerald" />
        <StatCard label="Outstanding" value="-" icon={Clock} accent="amber" />
        <StatCard label="Reseller Commission" value="-" icon={Handshake} accent="sky" />
        <StatCard label="Refunds" value="-" icon={Undo2} accent="rose" />
      </div>
    </div>
  )
}
