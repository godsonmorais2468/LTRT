import { reportRows, bookRows, dirRows } from './mock'

// ---------- Reports module ----------
export const collectionReport = {
  title: 'Collection Report', subtitle: 'Chapter-wise fund collection summary',
  columns: [{ key: 'chapter', label: 'Chapter' }, { key: 'date', label: 'Date' }, { key: 'purpose', label: 'Purpose' }, { key: 'amount', label: 'Amount' }],
  filters: { dateKey: 'date' },
  summary: [{ label: 'Total Collected', value: '₹2,68,700' }, { label: 'This Month', value: '₹2,68,700' }, { label: 'Entries', value: reportRows.collection.length }, { label: 'Avg. / Entry', value: '₹53,740' }],
  rows: reportRows.collection,
}

export const birthdayReport = {
  title: 'Birthday Report', subtitle: 'Members with upcoming birthdays',
  columns: [{ key: 'name', label: 'Name' }, { key: 'chapter', label: 'Chapter' }, { key: 'dob', label: 'Date of Birth' }, { key: 'phone', label: 'Phone' }],
  rows: reportRows.birthday,
}

export const anniversaryList = {
  title: 'Anniversary List', subtitle: 'Wedding anniversaries this month',
  columns: [{ key: 'name', label: 'Couple' }, { key: 'chapter', label: 'Chapter' }, { key: 'date', label: 'Anniversary Date' }],
  rows: reportRows.anniversary,
}

export const backlogReport = {
  title: 'Backlog Report', subtitle: 'System action/audit log',
  columns: [{ key: 'user', label: 'User' }, { key: 'action', label: 'Action' }, { key: 'time', label: 'Time' }, { key: 'ip', label: 'IP Address' }],
  filters: { dateKey: 'time' },
  rows: reportRows.backlog,
}

export const alertReport = {
  title: 'Alert Report', subtitle: 'System alerts requiring attention',
  columns: [{ key: 'type', label: 'Type' }, { key: 'message', label: 'Message' }, { key: 'time', label: 'Time' }],
  rows: reportRows.alert,
}

export const circularReport = {
  title: 'Circular Report', subtitle: 'Circulars issued to chapters',
  columns: [{ key: 'title', label: 'Title' }, { key: 'issuedBy', label: 'Issued By' }, { key: 'date', label: 'Date' }],
  rows: reportRows.circular,
}

export const loginbookReport = {
  title: 'Loginbook Report', subtitle: 'Login history for this organisation',
  columns: [{ key: 'username', label: 'Username' }, { key: 'ip', label: 'IP Address' }, { key: 'time', label: 'Login Time' }],
  filters: { dateKey: 'time' },
  rows: reportRows.loginbook,
}

export const memberRegisterReport = {
  title: 'Member Register', subtitle: 'Full register of enrolled members',
  columns: [{ key: 'name', label: 'Name' }, { key: 'chapter', label: 'Chapter' }, { key: 'regNo', label: 'Reg. No.' }, { key: 'dor', label: 'Date of Registration' }],
  rows: reportRows.memberRegister,
}

export const messageReport = {
  title: 'Message Report', subtitle: 'SMS / push messages sent',
  columns: [{ key: 'to', label: 'To' }, { key: 'message', label: 'Message' }, { key: 'status', label: 'Status' }, { key: 'time', label: 'Time' }],
  rows: reportRows.message,
}

export const notificationReport = {
  title: 'Notification Report', subtitle: 'In-app notifications sent',
  columns: [{ key: 'title', label: 'Title' }, { key: 'audience', label: 'Audience' }, { key: 'time', label: 'Time' }],
  rows: reportRows.notification,
}

export const otpListReport = {
  title: 'OTP List', subtitle: 'OTPs issued for password reset / verification',
  columns: [{ key: 'mobile', label: 'Mobile' }, { key: 'otp', label: 'OTP' }, { key: 'purpose', label: 'Purpose' }, { key: 'time', label: 'Time' }],
  rows: reportRows.otpList,
}

export const obituariesReport = {
  title: 'Obituaries Report', subtitle: 'Recorded obituaries',
  columns: [{ key: 'name', label: 'Name' }, { key: 'chapter', label: 'Chapter' }, { key: 'date', label: 'Date' }],
  rows: reportRows.obituaries,
}

export const requestReport = {
  title: 'Request Report', subtitle: 'Member service requests',
  columns: [{ key: 'name', label: 'Requested By' }, { key: 'type', label: 'Request Type' }, { key: 'status', label: 'Status' }, { key: 'date', label: 'Date' }],
  rows: reportRows.request,
}

export const adminNotificationReport = {
  title: 'Admin Notification', subtitle: 'Notifications sent from platform admin',
  columns: [{ key: 'title', label: 'Title' }, { key: 'sentTo', label: 'Sent To' }, { key: 'time', label: 'Time' }],
  rows: reportRows.adminNotification,
}

// ---------- Accounts books (read-only) ----------
export const daybook = {
  title: 'Daybook', subtitle: 'Chronological record of all transactions',
  columns: [{ key: 'date', label: 'Date' }, { key: 'ledger', label: 'Ledger' }, { key: 'type', label: 'Dr/Cr' }, { key: 'amount', label: 'Amount' }, { key: 'narration', label: 'Narration' }],
  filters: { dateKey: 'date' },
  rows: bookRows.daybook,
}

export const cashbook = {
  title: 'Cashbook', subtitle: 'Cash-in-hand transactions',
  columns: [{ key: 'date', label: 'Date' }, { key: 'particulars', label: 'Particulars' }, { key: 'debit', label: 'Debit' }, { key: 'credit', label: 'Credit' }],
  filters: { dateKey: 'date' },
  rows: bookRows.cashbook,
}

export const bankbook = {
  title: 'Bankbook', subtitle: 'Bank account transactions',
  columns: [{ key: 'date', label: 'Date' }, { key: 'bank', label: 'Bank' }, { key: 'particulars', label: 'Particulars' }, { key: 'debit', label: 'Debit' }, { key: 'credit', label: 'Credit' }],
  filters: { dateKey: 'date' },
  rows: bookRows.bankbook,
}

export const ledgerbook = {
  title: 'Ledgerbook', subtitle: 'Full ledger-wise transaction history',
  columns: [{ key: 'ledger', label: 'Ledger' }, { key: 'date', label: 'Date' }, { key: 'debit', label: 'Debit' }, { key: 'credit', label: 'Credit' }, { key: 'balance', label: 'Balance' }],
  rows: bookRows.ledgerbook,
}

// ---------- Landlord ----------
export const expiryReport = {
  title: 'Expiry', subtitle: 'Leases and licenses nearing expiry',
  columns: [{ key: 'name', label: 'Name' }, { key: 'type', label: 'Type' }, { key: 'expiry', label: 'Expiry Date' }],
  rows: bookRows.expiry,
}

// ---------- App / member portal directories ----------
export const memberListDir = {
  title: 'Members', subtitle: 'Directory of chapter members',
  columns: [{ key: 'name', label: 'Name' }, { key: 'family', label: 'Family' }, { key: 'phone', label: 'Phone' }],
  rows: dirRows.memberList,
}

export const parishListDir = {
  title: 'Parish List', subtitle: 'All parishes in the diocese',
  columns: [{ key: 'name', label: 'Parish' }, { key: 'district', label: 'District' }, { key: 'vicar', label: 'Vicar' }],
  rows: dirRows.parishList,
}

export const dioceseListDir = {
  title: 'Diocese List', subtitle: 'All dioceses',
  columns: [{ key: 'name', label: 'Diocese' }, { key: 'bishop', label: 'Bishop' }, { key: 'state', label: 'State' }],
  rows: dirRows.dioceseList,
}

export const bishopListDir = {
  title: 'Bishop List', subtitle: 'Serving bishops',
  columns: [{ key: 'name', label: 'Name' }, { key: 'diocese', label: 'Diocese' }],
  rows: dirRows.bishopList,
}

export const clergyListDir = {
  title: 'Clergy List', subtitle: 'Serving clergy',
  columns: [{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }, { key: 'parish', label: 'Parish' }],
  rows: dirRows.clergyList,
}

export const obituariesListDir = {
  title: 'Obituaries List', subtitle: 'Community obituaries',
  columns: [{ key: 'name', label: 'Name' }, { key: 'chapter', label: 'Chapter' }, { key: 'date', label: 'Date' }],
  rows: dirRows.obituariesList,
}

export const wishesDir = {
  title: 'Wishes', subtitle: 'Birthday & anniversary wishes feed',
  columns: [{ key: 'name', label: 'Name' }, { key: 'occasion', label: 'Occasion' }, { key: 'date', label: 'Date' }],
  rows: dirRows.wishes,
}

export const paymentHistoryDir = {
  title: 'Payment History', subtitle: 'Your contribution history',
  columns: [{ key: 'date', label: 'Date' }, { key: 'purpose', label: 'Purpose' }, { key: 'amount', label: 'Amount' }, { key: 'mode', label: 'Mode' }],
  rows: dirRows.paymentHistory,
}

export const favouritesDir = {
  title: 'Favourites', subtitle: 'Members you have marked as favourite',
  columns: [{ key: 'name', label: 'Name' }, { key: 'phone', label: 'Phone' }],
  rows: dirRows.favourites,
}

export const pushNotificationDir = {
  title: 'Notifications', subtitle: 'Your notification feed',
  columns: [{ key: 'title', label: 'Title' }, { key: 'time', label: 'Time' }],
  rows: dirRows.pushNotification,
}
