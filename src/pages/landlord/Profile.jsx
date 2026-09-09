import SettingsForm from '../../components/SettingsForm'

export default function Profile() {
  return (
    <SettingsForm
      title="Profile"
      subtitle="Landlord account details"
      fields={[
        { key: 'name', label: 'Full Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'address', label: 'Address', full: true },
      ]}
      initial={{ name: 'Demo Landlord', email: 'landlord@example.com', phone: '9847099999', address: '' }}
    />
  )
}
