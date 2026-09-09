import SettingsForm from '../../components/SettingsForm'

export default function ControlRoom() {
  return (
    <SettingsForm
      title="Control Room"
      subtitle="Platform-wide feature switches"
      fields={[
        { key: 'maintenanceMode', label: 'Maintenance Mode', type: 'checkbox' },
        { key: 'newRegistrations', label: 'Allow New Registrations', type: 'checkbox' },
        { key: 'trialDays', label: 'Default Trial Period (days)', type: 'number' },
        { key: 'broadcastBanner', label: 'Broadcast Banner Text', full: true },
      ]}
      initial={{ maintenanceMode: false, newRegistrations: true, trialDays: 365, broadcastBanner: '' }}
    />
  )
}
