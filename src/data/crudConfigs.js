import { statusBadge } from '../components/CrudPage'
import { seeds } from './mock'

const statusCol = { key: 'status', label: 'Status', render: (row, toggle) => statusBadge(row, toggle) }
const statusField = { key: 'status', label: 'Active', type: 'checkbox' }

// ---------- Master ----------
export const chapterConfig = {
  title: 'Chapter', subtitle: 'Parishes / Edavakas under this organisation',
  columns: [
    { key: 'name', label: 'Name' }, { key: 'code', label: 'Code' },
    { key: 'district', label: 'District' }, { key: 'members', label: 'Members' }, statusCol,
  ],
  fields: [
    { key: 'name', label: 'Chapter Name', required: true },
    { key: 'code', label: 'Code', required: true },
    { key: 'district', label: 'District' },
    { key: 'members', label: 'Member Count', type: 'number' },
    statusField,
  ],
  seed: seeds.chapter,
}

export const membersConfig = {
  title: 'Members (Office Barrier)', subtitle: 'Registered members of the chapter',
  columns: [
    { key: 'name', label: 'Name' }, { key: 'family', label: 'Family Name' },
    { key: 'phone', label: 'Phone' }, { key: 'dob', label: 'DOB' }, statusCol,
  ],
  fields: [
    { key: 'name', label: 'Full Name', required: true },
    { key: 'family', label: 'Family Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'dob', label: 'Date of Birth', type: 'date' },
    { key: 'address', label: 'Address', full: true },
    statusField,
  ],
  seed: seeds.members,
}

export const familyMemberConfig = {
  title: 'Family Member', subtitle: 'Members grouped by household',
  columns: [{ key: 'family', label: 'Family' }, { key: 'name', label: 'Member Name' }, { key: 'relation', label: 'Relation' }, { key: 'age', label: 'Age' }],
  fields: [
    { key: 'family', label: 'Family Name', required: true },
    { key: 'name', label: 'Member Name', required: true },
    { key: 'relation', label: 'Relation', type: 'select', options: ['Head', 'Spouse', 'Son', 'Daughter', 'Parent'] },
    { key: 'age', label: 'Age', type: 'number' },
  ],
  seed: seeds.familyMember,
}

export const designationConfig = {
  title: 'Designation', subtitle: 'Chapter office-bearer designations',
  columns: [{ key: 'name', label: 'Designation' }, { key: 'level', label: 'Level' }, statusCol],
  fields: [
    { key: 'name', label: 'Designation', required: true },
    { key: 'level', label: 'Level', type: 'select', options: ['Chapter', 'District', 'Diocese'] },
    statusField,
  ],
  seed: seeds.designation,
}

export const bannerConfig = {
  title: 'Banner', subtitle: 'Dashboard / login banners',
  columns: [{ key: 'title', label: 'Title' }, { key: 'position', label: 'Position' }, statusCol],
  fields: [
    { key: 'title', label: 'Title', required: true },
    { key: 'position', label: 'Position', type: 'select', options: ['Login Page', 'Dashboard Top', 'Sidebar'] },
    statusField,
  ],
  seed: seeds.banner,
}

export const goalConfig = {
  title: 'Goal', subtitle: 'Chapter targets for the year',
  columns: [{ key: 'name', label: 'Goal' }, { key: 'target', label: 'Target' }, { key: 'current', label: 'Current' }],
  fields: [
    { key: 'name', label: 'Goal Name', required: true },
    { key: 'target', label: 'Target', type: 'number' },
    { key: 'current', label: 'Current', type: 'number' },
  ],
  seed: [],
}

export const slideRemarksConfig = {
  title: 'Slide Remarks', subtitle: 'Standard remarks used during slide approval',
  columns: [{ key: 'remark', label: 'Remark' }, statusCol],
  fields: [{ key: 'remark', label: 'Remark Text', required: true, full: true }, statusField],
  seed: seeds.slideRemarks,
}

export const statConfig = {
  title: 'Stat', subtitle: 'Statistic categories tracked per chapter',
  columns: [{ key: 'name', label: 'Stat Name' }, { key: 'unit', label: 'Unit' }],
  fields: [
    { key: 'name', label: 'Stat Name', required: true },
    { key: 'unit', label: 'Unit', type: 'select', options: ['Count', 'Percentage', 'Amount'] },
  ],
  seed: seeds.stat,
}

// ---------- Accounts masters ----------
export const groupheadConfig = {
  title: 'Group Head', subtitle: 'Chart of accounts group heads',
  columns: [{ key: 'name', label: 'Group Head' }, { key: 'type', label: 'Type' }, statusCol],
  fields: [
    { key: 'name', label: 'Group Head', required: true },
    { key: 'type', label: 'Type', type: 'select', options: ['Asset', 'Liability', 'Income', 'Expense', 'Capital'] },
    statusField,
  ],
  seed: seeds.grouphead,  
}

export const ledgerConfig = {
  title: 'Ledger', subtitle: 'Ledger accounts under each group head',
  columns: [
    { key: 'name', label: 'Ledger Name' }, { key: 'grouphead', label: 'Group Head' },
    { key: 'opening', label: 'Opening Balance' }, statusCol,
  ],
  fields: [
    { key: 'name', label: 'Ledger Name', required: true },
    { key: 'grouphead', label: 'Group Head', type: 'select', options: ['Cash & Bank', 'Donations', 'Building Fund', 'Maintenance Expense'] },
    { key: 'opening', label: 'Opening Balance', type: 'number' },
    statusField,
  ],
  seed: seeds.ledger,
}

export const bankConfig = {
  title: 'Bank', subtitle: 'Bank accounts held by the chapter',
  columns: [{ key: 'bank', label: 'Bank Name' }, { key: 'account', label: 'Account No.' }, { key: 'ifsc', label: 'IFSC' }, statusCol],
  fields: [
    { key: 'bank', label: 'Bank Name', required: true },
    { key: 'account', label: 'Account No.', required: true },
    { key: 'ifsc', label: 'IFSC Code' },
    { key: 'branch', label: 'Branch' },
    statusField,
  ],
  seed: seeds.bank,
}

export const expenseConfig = {
  title: 'Expense', subtitle: 'Chapter operating expenses',
  columns: [
    { key: 'date', label: 'Date' }, { key: 'category', label: 'Category' },
    { key: 'amount', label: 'Amount' }, { key: 'paidTo', label: 'Paid To' },
  ],
  fields: [
    { key: 'date', label: 'Date', type: 'date', required: true },
    { key: 'category', label: 'Category', type: 'select', options: ['Electricity', 'Maintenance', 'Salary', 'Flowers', 'Printing', 'Other'] },
    { key: 'amount', label: 'Amount', type: 'number', required: true },
    { key: 'paidTo', label: 'Paid To' },
    { key: 'remarks', label: 'Remarks', full: true },
  ],
  seed: seeds.expense,
}

export const daySettlementConfig = {
  title: 'Day Settlement', subtitle: 'Daily cash voucher settlement summary',
  columns: [
    { key: 'voucher_date', label: 'Voucher Date' }, { key: 'from_date', label: 'From' },
    { key: 'to_date', label: 'To' }, { key: 'voucher_time', label: 'Settled At' }, { key: 'total', label: 'Total' },
  ],
  fields: [
    { key: 'voucher_date', label: 'Voucher Date', type: 'date', required: true },
    { key: 'from_date', label: 'From Date', type: 'date' },
    { key: 'to_date', label: 'To Date', type: 'date' },
    { key: 'voucher_time', label: 'Settled At (time)' },
    { key: 'total', label: 'Total Amount', type: 'number', required: true },
  ],
  seed: seeds.daySettlement,
}

// ---------- Setting masters ----------
export const modeOfPayConfig = {
  title: 'Mode Of Pay', subtitle: 'Accepted payment modes',
  columns: [{ key: 'name', label: 'Mode' }, statusCol],
  fields: [{ key: 'name', label: 'Mode Name', required: true }, statusField],
  seed: seeds.modeOfPay,
}

export const taxMasterConfig = {
  title: 'Tax Master', subtitle: 'Tax rates used in billing',
  columns: [{ key: 'name', label: 'Tax Name' }, { key: 'rate', label: 'Rate (%)' }, statusCol],
  fields: [
    { key: 'name', label: 'Tax Name', required: true },
    { key: 'rate', label: 'Rate (%)', type: 'number' },
    statusField,
  ],
  seed: seeds.taxMaster,
}

export const userConfig = {
  title: 'User', subtitle: 'System users for this organisation',
  columns: [{ key: 'name', label: 'Name' }, { key: 'username', label: 'Username' }, { key: 'role', label: 'Role' }, statusCol],
  fields: [
    { key: 'name', label: 'Full Name', required: true },
    { key: 'username', label: 'Username', required: true },
    { key: 'role', label: 'Role', type: 'select', options: ['Admin', 'Accountant', 'Secretary', 'Member'] },
    { key: 'password', label: 'Password', type: 'password' },
    statusField,
  ],
  seed: seeds.user,
}

export const userRollConfig = {
  title: 'User Roll', subtitle: 'Roles and menu-level permissions',
  columns: [{ key: 'name', label: 'Role Name' }, { key: 'description', label: 'Description' }, statusCol],
  fields: [
    { key: 'name', label: 'Role Name', required: true },
    { key: 'description', label: 'Description', full: true },
    statusField,
  ],
  seed: seeds.userRoll,
}

// ---------- Superadmin masters ----------
export const resellersConfig = {
  title: 'Resellers', subtitle: 'Partners who onboard new organisations',
  columns: [
    { key: 'name', label: 'Reseller Name' }, { key: 'acno', label: 'Account No.' },
    { key: 'mobile', label: 'Mobile' }, { key: 'email', label: 'Email' }, statusCol,
  ],
  fields: [
    { key: 'name', label: 'Reseller Name', required: true },
    { key: 'mobile', label: 'Mobile', required: true },
    { key: 'email', label: 'Email' },
    { key: 'password', label: 'Password', type: 'password' },
    statusField,
  ],
  seed: seeds.resellers,
}

export const dioceseConfig = {
  title: 'Diocese', subtitle: 'Diocese master list',
  columns: [{ key: 'name', label: 'Diocese' }, { key: 'state', label: 'State' }, { key: 'bishop', label: 'Bishop' }, statusCol],
  fields: [
    { key: 'name', label: 'Diocese Name', required: true },
    { key: 'state', label: 'State' },
    { key: 'bishop', label: 'Bishop Name' },
    statusField,
  ],
  seed: seeds.diocese,
}

export const districtConfig = {
  title: 'District', subtitle: 'District master list',
  columns: [{ key: 'name', label: 'District' }, { key: 'state', label: 'State' }, statusCol],
  fields: [
    { key: 'name', label: 'District Name', required: true },
    { key: 'state', label: 'State' },
    statusField,
  ],
  seed: seeds.district,
}

export const stateConfig = {
  title: 'State', subtitle: 'State master list',
  columns: [{ key: 'name', label: 'State' }, { key: 'country', label: 'Country' }, statusCol],
  fields: [
    { key: 'name', label: 'State Name', required: true },
    { key: 'country', label: 'Country' },
    statusField,
  ],
  seed: seeds.state,
}

export const advertisementsConfig = {
  title: 'Advertisements', subtitle: 'Platform-wide ads shown across tenant dashboards',
  columns: [{ key: 'title', label: 'Title' }, { key: 'sponsor', label: 'Sponsor' }, statusCol],
  fields: [
    { key: 'title', label: 'Title', required: true },
    { key: 'sponsor', label: 'Sponsor' },
    statusField,
  ],
  seed: seeds.advertisements,
}

// ---------- Landlord masters ----------
export const propertyConfig = {
  title: 'Property', subtitle: 'Managed properties',
  columns: [{ key: 'name', label: 'Property' }, { key: 'type', label: 'Type' }, { key: 'units', label: 'Units' }, statusCol],
  fields: [
    { key: 'name', label: 'Property Name', required: true },
    { key: 'type', label: 'Type', type: 'select', options: ['Apartment', 'Commercial', 'Villa'] },
    { key: 'units', label: 'Units', type: 'number' },
    { key: 'address', label: 'Address', full: true },
    statusField,
  ],
  seed: seeds.property,
}

export const tenantConfig = {
  title: 'Tenant', subtitle: 'Current tenants',
  columns: [{ key: 'name', label: 'Tenant' }, { key: 'unit', label: 'Unit' }, { key: 'rent', label: 'Monthly Rent' }, { key: 'due', label: 'Lease Ends' }, statusCol],
  fields: [
    { key: 'name', label: 'Tenant Name', required: true },
    { key: 'unit', label: 'Unit No.' },
    { key: 'rent', label: 'Monthly Rent', type: 'number' },
    { key: 'due', label: 'Lease Ends', type: 'date' },
    statusField,
  ],
  seed: seeds.tenant,
}

export const landlordPaymentConfig = {
  title: 'Payment', subtitle: 'Rent payments received',
  columns: [{ key: 'tenant', label: 'Tenant' }, { key: 'amount', label: 'Amount' }, { key: 'date', label: 'Date' }, { key: 'mode', label: 'Mode' }],
  fields: [
    { key: 'tenant', label: 'Tenant', required: true },
    { key: 'amount', label: 'Amount', type: 'number' },
    { key: 'date', label: 'Date', type: 'date' },
    { key: 'mode', label: 'Mode', type: 'select', options: ['Cash', 'UPI', 'Bank Transfer', 'Cheque'] },
  ],
  seed: seeds.landlordPayment,
}
