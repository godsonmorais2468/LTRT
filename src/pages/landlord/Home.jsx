import { StatCard, PageHeader, Card } from '../../components/ui'

export default function Home() {
  return (
    <div>
      <PageHeader title="Landlord Home" subtitle="Overview of your rental portfolio" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <StatCard label="Properties" value={2} icon="🏢" accent="emerald" />
        <StatCard label="Total Units" value={34} icon="🏠" accent="sky" />
        <StatCard label="Occupied Units" value={28} icon="✔️" accent="rose" />
        <StatCard label="Rent Due This Month" value="₹ 1,26,000" icon="💳" accent="amber" />
      </div>
      <Card className="p-5 text-sm text-gray-500">Use the sidebar to manage Properties, Tenants, Payments and upcoming lease Expiry.</Card>
    </div>
  )
}
