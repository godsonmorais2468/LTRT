import SettingsForm from '../../components/SettingsForm'

export default function Profile() {
  return (
    <SettingsForm
      title="My Profile"
      subtitle="Your member details"
      fields={[
        { key: 'name', label: 'Full Name' },
        { key: 'family', label: 'Family Name' },
        { key: 'phone', label: 'Phone' },
        { key: 'dob', label: 'Date of Birth', type: 'date' },
        { key: 'address', label: 'Address', full: true },
      ]}
      initial={{ name: '', family: '', phone: '', dob: '', address: '' }}
    />
  )
}
