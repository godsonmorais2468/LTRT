import { StatCard, PageHeader, Card } from '../../components/ui'

const orgs = [
  { id: 1, name: 'DEMO TVM', diocese: 'Thiruvananthapuram Diocese', joined: '2026-08-05' },
  { id: 2, name: 'Emmanuel Chapter Trust', diocese: 'Kottayam Diocese', joined: '2026-05-20' },
]

export default function Dashboard() {
  return (
    <div>
      <PageHeader title="Reseller Dashboard" subtitle="Your onboarded organisations & earnings" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <StatCard label="Organisations Onboarded" value={14} icon="⛪" accent="sky" />
        <StatCard label="Commission Earned" value="₹ 42,000" icon="💰" accent="emerald" />
        <StatCard label="Pending KYC" value={2} icon="⏰" accent="amber" />
        <StatCard label="Active Licences" value={12} icon="✔️" accent="rose" />
      </div>
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Onboarded Organisations</h3>
        <table className="w-full text-sm">
          <thead><tr className="text-left text-gray-500 border-b border-gray-100"><th className="py-2 pr-3">Organisation</th><th className="py-2 pr-3">Diocese</th><th className="py-2 pr-3">Joined</th></tr></thead>
          <tbody>
            {orgs.map((o) => (
              <tr key={o.id} className="border-b border-gray-50"><td className="py-2 pr-3">{o.name}</td><td className="py-2 pr-3 text-gray-500">{o.diocese}</td><td className="py-2 pr-3 text-gray-500">{o.joined}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
