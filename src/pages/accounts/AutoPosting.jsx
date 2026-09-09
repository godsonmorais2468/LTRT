import SettingsForm from '../../components/SettingsForm'

export default function AutoPosting() {
  return (
    <SettingsForm
      title="Auto Posting"
      subtitle="Automatically post recurring transactions to the ledger"
      fields={[
        { key: 'autoDonations', label: 'Auto-post Sunday collections', type: 'checkbox' },
        { key: 'autoUtility', label: 'Auto-post recurring utility bills', type: 'checkbox' },
        { key: 'autoSalary', label: 'Auto-post staff salaries', type: 'checkbox' },
        { key: 'postDay', label: 'Posting Day of Month', type: 'number' },
      ]}
      initial={{ autoDonations: true, autoUtility: false, autoSalary: true, postDay: 1 }}
    />
  )
}
