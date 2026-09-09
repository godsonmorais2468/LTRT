import CrudPage from '../../components/CrudPage'
import SettingsForm from '../../components/SettingsForm'
import * as cfg from '../../data/crudConfigs'

export { default as CommonSettings } from './CommonSettings'

export const ModeOfPay = () => <CrudPage config={cfg.modeOfPayConfig} />
export const TaxMaster = () => <CrudPage config={cfg.taxMasterConfig} />
export const User = () => <CrudPage config={cfg.userConfig} />
export const UserRoll = () => <CrudPage config={cfg.userRollConfig} />

export const FinancialYearSettings = () => (
  <SettingsForm
    title="Financial Year Settings"
    subtitle="Set the current accounting period"
    fields={[
      { key: 'startDate', label: 'Start Date', type: 'date' },
      { key: 'endDate', label: 'End Date', type: 'date' },
      { key: 'locked', label: 'Lock previous year entries', type: 'checkbox' },
    ]}
    initial={{ startDate: '', endDate: '', locked: false }}
  />
)

export const FunctionalSetting = () => (
  <SettingsForm
    title="Functional Setting"
    subtitle="Toggle optional modules for this organisation"
    fields={[
      { key: 'qrAttendance', label: 'Enable QR Attendance', type: 'checkbox' },
      { key: 'slideWorkflow', label: 'Enable Slide Approval Workflow', type: 'checkbox' },
      { key: 'smsAlerts', label: 'Enable SMS Alerts', type: 'checkbox' },
      { key: 'memberApp', label: 'Enable Member Mobile App', type: 'checkbox' },
    ]}
    initial={{ qrAttendance: false, slideWorkflow: false, smsAlerts: false, memberApp: false }}
  />
)

export const ProfileSettings = () => (
  <SettingsForm
    title="Profile"
    subtitle="Your organisation's account profile"
    fields={[
      { key: 'company_name', label: 'Company / Organisation Name' },
      { key: 'email', label: 'Email' },
      { key: 'mobile', label: 'Mobile' },
      { key: 'diocese', label: 'Diocese' },
      { key: 'expiry_date', label: 'Licence Expiry Date', type: 'date' },
    ]}
    initial={{ company_name: '', email: '', mobile: '', diocese: '', expiry_date: '' }}
  />
)
