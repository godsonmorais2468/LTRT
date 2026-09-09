/* ============================================================
   MOCK DATA — single source for the demo prototype.
   Chapter names, head-table members and figures mirror the
   screens captured from the live BNI/LTRT app.
   ============================================================ */

export const mockRegions = [
  { id: 1, code: 'RG01', name: 'Trivandrum', active: true },
  { id: 2, code: 'RG02', name: 'Kochi', active: true },
  { id: 3, code: 'RG03', name: 'Calicut', active: true },
  { id: 4, code: 'RG04', name: 'Thrissur', active: true },
]

export const mockDesignations = [
  { id: 1, order: '1', name: 'President', description: 'Chapter president', active: true },
  { id: 2, order: '2', name: 'Vice-President', description: 'Chapter vice-president', active: true },
  { id: 3, order: '3', name: 'Secretary /Treasurer', description: 'Secretary and treasurer', active: true },
  { id: 4, order: '4', name: 'Membership Committee', description: 'Membership committee member', active: true },
  { id: 5, order: '5', name: 'Mentor Coordinator', description: 'Mentor coordinator', active: true },
  { id: 6, order: '6', name: 'Visitor Host', description: 'Visitor host', active: true },
  { id: 7, order: '7', name: 'Education Coordinator', description: 'Education coordinator', active: true },
  { id: 8, order: '8', name: 'Growth Coordinator', description: 'Growth coordinator', active: true },
]

/* Head table per chapter — drives Show Presentation + Slide Preparation */
export const mockHeadTables = {
  MILESTONES: { president: 'Dr Majinu G. Sarath', vicePresident: 'Aneesh', secretary: 'Yoonus' },
  MAJESTIC: { president: 'Arun Kumar N R', vicePresident: 'Anoop N E', secretary: 'Sauparnika Puthur' },
  MASCOTS: { president: 'Jose Shibu M R', vicePresident: 'Shibu S', secretary: 'Faisal A' },
  MANDRAKES: { president: 'Ganesh Mohan', vicePresident: 'Manees P', secretary: 'Ratheesh Kumar' },
  MERIDIAN: { president: 'Vinod Menon', vicePresident: 'Sreekala S', secretary: 'Anilkumar T' },
  MONARCHS: { president: 'Rajesh Nair', vicePresident: 'Deepa Krishnan', secretary: 'Sunil Varghese' },
  MUSTANGS: { president: 'Hari Prasad', vicePresident: 'Nithin Jose', secretary: 'Lakshmi Menon' },
  MAGNUM: { president: 'Sajeev Thomas', vicePresident: 'Renjith R', secretary: 'Divya Suresh' },
  MYSTICS: { president: 'Prakash Pillai', vicePresident: 'Aswathy Nair', secretary: 'Binu Chandran' },
  MAGICIANS: { president: 'Noushad Ali', vicePresident: 'Geetha Raman', secretary: 'Jithin Mathew' },
  MILLIONARIES: { president: 'Suresh Babu', vicePresident: 'Priya Menon', secretary: 'Rahul Dev' },
  MIRACLES: { president: 'Thomas Kurian', vicePresident: 'Sneha Rajan', secretary: 'Vivek Nambiar' },
  MAVERICKS: { president: 'Abdul Rasheed', vicePresident: 'Meera Gopal', secretary: 'Sandeep K' },
  MARVELS: { president: 'Joseph Antony', vicePresident: 'Kavitha S', secretary: 'Manoj Pillai' },
}

export const mockChapters = [
  { id: 1, code: 'CH01', chapter: 'MILESTONES', region: 'Trivandrum', photo: 'milestones-logo.png', description: 'Flagship Trivandrum chapter', active: true },
  { id: 2, code: 'CH02', chapter: 'MAJESTIC', region: 'Trivandrum', photo: 'majestic-logo.png', description: 'Top performing chapter', active: true },
  { id: 3, code: 'CH03', chapter: 'MASCOTS', region: 'Trivandrum', photo: 'mascots-logo.png', description: 'Growing chapter', active: true },
  { id: 4, code: 'CH04', chapter: 'MANDRAKES', region: 'Kochi', photo: 'mandrakes-logo.png', description: 'Kochi city chapter', active: true },
  { id: 5, code: 'CH05', chapter: 'MERIDIAN', region: 'Kochi', photo: 'meridian-logo.png', description: 'Kochi south chapter', active: true },
  { id: 6, code: 'CH06', chapter: 'MONARCHS', region: 'Kochi', photo: 'monarchs-logo.png', description: 'Business leaders chapter', active: true },
  { id: 7, code: 'CH07', chapter: 'MUSTANGS', region: 'Calicut', photo: 'mustangs-logo.png', description: 'Calicut main chapter', active: true },
  { id: 8, code: 'CH08', chapter: 'MAGNUM', region: 'Calicut', photo: 'magnum-logo.png', description: 'Calicut north chapter', active: true },
  { id: 9, code: 'CH09', chapter: 'MYSTICS', region: 'Calicut', photo: 'mystics-logo.png', description: 'Emerging chapter', active: true },
  { id: 10, code: 'CH10', chapter: 'MAGICIANS', region: 'Thrissur', photo: 'magicians-logo.png', description: 'Thrissur central chapter', active: true },
  { id: 11, code: 'CH11', chapter: 'MILLIONARIES', region: 'Thrissur', photo: 'millionaries-logo.png', description: 'Thrissur east chapter', active: true },
  { id: 12, code: 'CH12', chapter: 'MIRACLES', region: 'Thrissur', photo: 'miracles-logo.png', description: 'Thrissur west chapter', active: false },
  { id: 13, code: 'CH13', chapter: 'MAVERICKS', region: 'Trivandrum', photo: 'mavericks-logo.png', description: 'Startup founders chapter', active: true },
  { id: 14, code: 'CH14', chapter: 'MARVELS', region: 'Kochi', photo: 'marvels-logo.png', description: 'Kochi north chapter', active: true },
]

/* Show Presentation rows — status drives the colour logic */
export const mockPresentations = [
  { id: 1, chapter: 'MYSTICS', status: 'approved', approvedBy: 'Prakash Pillai', approvedDesignation: 'President', approvedAt: '08-09-2026 18:20' },
  { id: 2, chapter: 'MAJESTIC', status: 'approved', approvedBy: 'Arun Kumar N R', approvedDesignation: 'President', approvedAt: '08-09-2026 18:42' },
  { id: 3, chapter: 'MILESTONES', status: 'pending', approvedBy: '', approvedDesignation: '', approvedAt: '' },
  { id: 4, chapter: 'MASCOTS', status: 'approved', approvedBy: 'Jose Shibu M R', approvedDesignation: 'President', approvedAt: '08-09-2026 19:05' },
  { id: 5, chapter: 'MANDRAKES', status: 'approved', approvedBy: 'Manees P', approvedDesignation: 'Vice-President', approvedAt: '08-09-2026 20:17' },
]

export const mockStats = [
  { id: 1, stat: 'Business (TYFCB)', description: 'Thank you for closed business', onlyMinusValue: false, needGoal: true, separateChart: true, active: true },
  { id: 2, stat: 'Absenteeism (In minus %)', description: 'Absence percentage', onlyMinusValue: true, needGoal: false, separateChart: false, active: true },
  { id: 3, stat: 'Visitors Per Month', description: 'Visitors brought to meetings', onlyMinusValue: false, needGoal: true, separateChart: true, active: true },
  { id: 4, stat: 'Member Addition', description: 'New members inducted', onlyMinusValue: false, needGoal: true, separateChart: false, active: true },
  { id: 5, stat: 'Member Drops (Incl. Non Renewals)', description: 'Members dropped', onlyMinusValue: true, needGoal: false, separateChart: false, active: true },
  { id: 6, stat: 'Referrals', description: 'Referrals passed', onlyMinusValue: false, needGoal: true, separateChart: true, active: true },
]

export const mockGoals = [
  {
    id: 1, fromMonth: '2026-06', toMonth: '2026-09', currentStrength: '18', setGoal: '40',
    stats: { business: '20000000', absenteeism: '0', visitors: '10', memberAddition: '0', memberDrops: '0', referrals: '50' },
  },
  {
    id: 2, fromMonth: '2025-09', toMonth: '2026-03', currentStrength: '32', setGoal: '45',
    stats: { business: '15000000', absenteeism: '0', visitors: '8', memberAddition: '0', memberDrops: '0', referrals: '40' },
  },
]

export const mockChapterTeam = [
  { id: 1, name: 'Dr Majinu G. Sarath', designation: 'President', phone: '9895012347', email: 'majinu@milestones.in', from: '2026-04-01', to: '2027-03-31' },
  { id: 2, name: 'Aneesh', designation: 'Vice-President', phone: '9895012348', email: 'aneesh@milestones.in', from: '2026-04-01', to: '2027-03-31' },
  { id: 3, name: 'Yoonus', designation: 'Secretary /Treasurer', phone: '9895012349', email: 'yoonus@milestones.in', from: '2026-04-01', to: '2027-03-31' },
  { id: 4, name: 'Sauparnika Puthur', designation: 'Membership Committee', phone: '9895012350', email: 'sauparnika@milestones.in', from: '2026-04-01', to: '2027-03-31' },
  { id: 5, name: 'Faisal A', designation: 'Visitor Host', phone: '9895012351', email: 'faisal@milestones.in', from: '2026-04-01', to: '2027-03-31' },
]

export const mockAttendance = [
  { id: 1, name: 'Dr Majinu G. Sarath', chapter: 'MILESTONES', date: '2026-09-08', status: 'Present', time: '18:02' },
  { id: 2, name: 'Aneesh', chapter: 'MILESTONES', date: '2026-09-08', status: 'Present', time: '18:05' },
  { id: 3, name: 'Yoonus', chapter: 'MILESTONES', date: '2026-09-08', status: 'Absent', time: '—' },
  { id: 4, name: 'Sauparnika Puthur', chapter: 'MILESTONES', date: '2026-09-08', status: 'Present', time: '18:01' },
  { id: 5, name: 'Faisal A', chapter: 'MILESTONES', date: '2026-09-08', status: 'Substitute', time: '18:11' },
  { id: 6, name: 'Arun Kumar N R', chapter: 'MAJESTIC', date: '2026-09-08', status: 'Present', time: '17:58' },
  { id: 7, name: 'Anoop N E', chapter: 'MAJESTIC', date: '2026-09-08', status: 'Present', time: '18:03' },
]

export const mockSlideApprovals = [
  { id: 1, title: 'MILESTONES — Sep 2026 Deck', submittedBy: 'Dr Majinu G. Sarath', status: 'Pending' },
  { id: 2, title: 'MAJESTIC — Sep 2026 Deck', submittedBy: 'Arun Kumar N R', status: 'Approved' },
  { id: 3, title: 'MASCOTS — Sep 2026 Deck', submittedBy: 'Jose Shibu M R', status: 'Approved' },
  { id: 4, title: 'MANDRAKES — Sep 2026 Deck', submittedBy: 'Ganesh Mohan', status: 'Rejected' },
  { id: 5, title: 'MONARCHS — Sep 2026 Deck', submittedBy: 'Rajesh Nair', status: 'Pending' },
]

export const mockSlidePreparations = [
  { id: 1, month: '2026-08', date: '2026-09-08', user: '9895012347' },
  { id: 2, month: '2026-07', date: '2026-08-07', user: '9895012347' },
]

export const mockVerifications = [
  { id: 1, org: 'BNI Trivandrum', requestedBy: 'Dr Majinu G. Sarath', date: '2026-09-02', status: 'Pending' },
  { id: 2, org: 'BNI Kochi', requestedBy: 'Rajesh Nair', date: '2026-08-28', status: 'Verified' },
  { id: 3, org: 'BNI Calicut', requestedBy: 'Hari Prasad', date: '2026-08-21', status: 'Verified' },
]

export const mockVouchers = [
  { id: 1, no: 'V-1041', date: '2026-09-05', type: 'Receipt', ledger: 'Meeting Fee', amount: 45000, narration: 'Weekly meeting fees' },
  { id: 2, no: 'V-1042', date: '2026-09-06', type: 'Payment', ledger: 'Venue Rent', amount: 18000, narration: 'Hall rent September' },
  { id: 3, no: 'V-1043', date: '2026-09-07', type: 'Receipt', ledger: 'Membership Fee', amount: 132000, narration: 'Renewals — 4 members' },
  { id: 4, no: 'V-1044', date: '2026-09-08', type: 'Payment', ledger: 'Printing', amount: 6400, narration: 'Slide handouts' },
]

export const mockLicenseKeys = [
  { id: 1, key: 'LTRT-2026-TVM-4417', chapter: 'MILESTONES', issued: '2026-04-01', expiry: '2027-03-31' },
  { id: 2, key: 'LTRT-2026-KOC-8823', chapter: 'MANDRAKES', issued: '2026-04-01', expiry: '2027-03-31' },
  { id: 3, key: 'LTRT-2026-CLT-1290', chapter: 'MUSTANGS', issued: '2026-04-01', expiry: '2027-03-31' },
]

export const mockSentInfo = [
  { id: 1, subject: 'Slide submission deadline', audience: 'All Chapters', date: '2026-09-05', channel: 'Push' },
  { id: 2, subject: 'Regional meet — Kochi', audience: 'Kochi', date: '2026-09-01', channel: 'Email' },
  { id: 3, subject: 'New performance dashboard', audience: 'All Chapters', date: '2026-08-25', channel: 'SMS' },
]

/* ---------- CRUD page seeds ---------- */
export const seeds = {
  chapter: [
    { id: 1, name: 'MILESTONES', code: 'CH01', district: 'Trivandrum', members: 18, status: true },
    { id: 2, name: 'MAJESTIC', code: 'CH02', district: 'Trivandrum', members: 42, status: true },
    { id: 3, name: 'MASCOTS', code: 'CH03', district: 'Trivandrum', members: 35, status: true },
    { id: 4, name: 'MANDRAKES', code: 'CH04', district: 'Ernakulam', members: 28, status: true },
    { id: 5, name: 'MERIDIAN', code: 'CH05', district: 'Ernakulam', members: 31, status: true },
  ],
  members: [
    { id: 1, name: 'Dr Majinu G. Sarath', family: 'Sarath', phone: '9895012347', dob: '1978-04-12', address: 'Kowdiar, Trivandrum', status: true },
    { id: 2, name: 'Aneesh', family: 'Nair', phone: '9895012348', dob: '1985-11-03', address: 'Pattom, Trivandrum', status: true },
    { id: 3, name: 'Yoonus', family: 'Yoonus', phone: '9895012349', dob: '1982-06-21', address: 'Vazhuthacaud, Trivandrum', status: true },
    { id: 4, name: 'Sauparnika Puthur', family: 'Puthur', phone: '9895012350', dob: '1990-01-17', address: 'Kesavadasapuram, Trivandrum', status: true },
    { id: 5, name: 'Arun Kumar N R', family: 'Nair', phone: '9895012351', dob: '1980-09-08', address: 'Sasthamangalam, Trivandrum', status: true },
    { id: 6, name: 'Faisal A', family: 'Ahmed', phone: '9895012352', dob: '1987-03-25', address: 'Palayam, Trivandrum', status: true },
  ],
  familyMember: [
    { id: 1, family: 'Sarath', name: 'Dr Majinu G. Sarath', relation: 'Head', age: 48 },
    { id: 2, family: 'Sarath', name: 'Anjana Majinu', relation: 'Spouse', age: 44 },
    { id: 3, family: 'Nair', name: 'Aneesh', relation: 'Head', age: 41 },
    { id: 4, family: 'Nair', name: 'Divya Aneesh', relation: 'Spouse', age: 38 },
    { id: 5, family: 'Puthur', name: 'Sauparnika Puthur', relation: 'Head', age: 36 },
  ],
  designation: [
    { id: 1, name: 'President', level: 'Chapter', status: true },
    { id: 2, name: 'Vice-President', level: 'Chapter', status: true },
    { id: 3, name: 'Secretary /Treasurer', level: 'Chapter', status: true },
    { id: 4, name: 'Membership Committee', level: 'Chapter', status: true },
    { id: 5, name: 'Regional Director', level: 'District', status: true },
  ],
  banner: [
    { id: 1, title: 'Weekly Meeting Reminder', position: 'Dashboard Top', status: true },
    { id: 2, title: 'BNI Connect Promo', position: 'Login Page', status: true },
    { id: 3, title: 'Regional Meet 2026', position: 'Sidebar', status: false },
  ],
  slideRemarks: [
    { id: 1, remark: 'Please correct the font size', status: true },
    { id: 2, remark: 'Add chapter logo', status: true },
    { id: 3, remark: 'Update head table photos', status: true },
    { id: 4, remark: 'Approved without changes', status: true },
  ],
  stat: [
    { id: 1, name: 'Business (TYFCB)', unit: 'Amount' },
    { id: 2, name: 'Absenteeism', unit: 'Percentage' },
    { id: 3, name: 'Visitors Per Month', unit: 'Count' },
    { id: 4, name: 'Member Addition', unit: 'Count' },
    { id: 5, name: 'Referrals', unit: 'Count' },
  ],
  grouphead: [
    { id: 1, name: 'Cash & Bank', type: 'Asset', status: true },
    { id: 2, name: 'Membership Income', type: 'Income', status: true },
    { id: 3, name: 'Meeting Expense', type: 'Expense', status: true },
    { id: 4, name: 'Chapter Fund', type: 'Capital', status: true },
  ],
  ledger: [
    { id: 1, name: 'Cash in Hand', grouphead: 'Cash & Bank', opening: 42500, status: true },
    { id: 2, name: 'SBI Current A/c', grouphead: 'Cash & Bank', opening: 385000, status: true },
    { id: 3, name: 'Membership Fee', grouphead: 'Donations', opening: 0, status: true },
    { id: 4, name: 'Venue Rent', grouphead: 'Maintenance Expense', opening: 0, status: true },
  ],
  bank: [
    { id: 1, bank: 'State Bank of India', account: '67129384501', ifsc: 'SBIN0070123', branch: 'Kowdiar', status: true },
    { id: 2, bank: 'Federal Bank', account: '14520100078234', ifsc: 'FDRL0001452', branch: 'Pattom', status: true },
  ],
  expense: [
    { id: 1, date: '2026-09-06', category: 'Maintenance', amount: 18000, paidTo: 'Hotel Residency', remarks: 'Hall rent September' },
    { id: 2, date: '2026-09-08', category: 'Printing', amount: 6400, paidTo: 'Akshara Printers', remarks: 'Slide handouts' },
    { id: 3, date: '2026-08-30', category: 'Electricity', amount: 3200, paidTo: 'KSEB', remarks: 'August bill' },
  ],
  daySettlement: [
    { id: 1, voucher_date: '2026-09-08', from_date: '2026-09-01', to_date: '2026-09-08', voucher_time: '20:45', total: 152600 },
    { id: 2, voucher_date: '2026-09-01', from_date: '2026-08-25', to_date: '2026-08-31', voucher_time: '20:30', total: 98400 },
  ],
  modeOfPay: [
    { id: 1, name: 'Cash', status: true },
    { id: 2, name: 'UPI', status: true },
    { id: 3, name: 'Bank Transfer', status: true },
    { id: 4, name: 'Cheque', status: false },
  ],
  taxMaster: [
    { id: 1, name: 'GST 18%', rate: 18, status: true },
    { id: 2, name: 'GST 12%', rate: 12, status: true },
    { id: 3, name: 'GST 5%', rate: 5, status: false },
  ],
  user: [
    { id: 1, name: 'Dr Majinu G. Sarath', username: 'majinu', role: 'Admin', status: true },
    { id: 2, name: 'Yoonus', username: 'yoonus', role: 'Accountant', status: true },
    { id: 3, name: 'Aneesh', username: 'aneesh', role: 'Secretary', status: true },
  ],
  userRoll: [
    { id: 1, name: 'Chapter Admin', description: 'Full access to chapter modules', status: true },
    { id: 2, name: 'Accountant', description: 'Accounts and reports only', status: true },
    { id: 3, name: 'Member', description: 'Read-only member portal', status: true },
  ],
  resellers: [
    { id: 1, name: 'Geosys IT Solutions', acno: 'RS-1001', mobile: '9895000111', email: 'sales@geosys.in', status: true },
    { id: 2, name: 'Cyberpark Partners', acno: 'RS-1002', mobile: '9895000222', email: 'info@cyberpark.in', status: true },
  ],
  diocese: [
    { id: 1, name: 'Trivandrum', state: 'Kerala', bishop: 'Most Rev. Thomas Netto', status: true },
    { id: 2, name: 'Ernakulam', state: 'Kerala', bishop: 'Most Rev. Joseph Kalathiparambil', status: true },
  ],
  district: [
    { id: 1, name: 'Thiruvananthapuram', state: 'Kerala', status: true },
    { id: 2, name: 'Ernakulam', state: 'Kerala', status: true },
    { id: 3, name: 'Kozhikode', state: 'Kerala', status: true },
    { id: 4, name: 'Thrissur', state: 'Kerala', status: true },
  ],
  state: [
    { id: 1, name: 'Kerala', country: 'India', status: true },
    { id: 2, name: 'Tamil Nadu', country: 'India', status: true },
    { id: 3, name: 'Karnataka', country: 'India', status: true },
  ],
  advertisements: [
    { id: 1, title: 'BNI Global Convention 2026', sponsor: 'BNI International', status: true },
    { id: 2, title: 'Business Loan Offers', sponsor: 'Federal Bank', status: true },
  ],
  property: [
    { id: 1, name: 'Sarath Residency', type: 'Apartment', units: 12, address: 'Kowdiar, Trivandrum', status: true },
    { id: 2, name: 'Majestic Plaza', type: 'Commercial', units: 8, address: 'MG Road, Kochi', status: true },
  ],
  tenant: [
    { id: 1, name: 'Anoop N E', unit: 'A-201', rent: 18000, due: '2027-03-31', status: true },
    { id: 2, name: 'Shibu S', unit: 'B-104', rent: 22000, due: '2027-01-31', status: true },
  ],
  landlordPayment: [
    { id: 1, tenant: 'Anoop N E', amount: 18000, date: '2026-09-05', mode: 'UPI' },
    { id: 2, tenant: 'Shibu S', amount: 22000, date: '2026-09-03', mode: 'Bank Transfer' },
  ],
  billing: [
    { id: 1, org: 'BNI Trivandrum', plan: 'Annual', amount: 48000, date: '2026-04-01', status: 'Paid' },
    { id: 2, org: 'BNI Kochi', plan: 'Annual', amount: 48000, date: '2026-04-01', status: 'Paid' },
    { id: 3, org: 'BNI Calicut', plan: 'Annual', amount: 36000, date: '2026-04-05', status: 'Pending' },
  ],
}

/* ---------- Dashboard figures ---------- */
export const mockDashboard = {
  superadmin: { chapters: 14, submitted: 11, approved: 8, pending: 3 },
  chapter: { chapters: 1, submitted: 4, approved: 3, pending: 1 },
  statRows: [
    { chapter: 'MILESTONES', stat: 'Business (TYFCB)', goal: '2,00,00,000', current: '55,38,564', achieved: '28%' },
    { chapter: 'MAJESTIC', stat: 'Visitors Per Month', goal: '10', current: '27', achieved: '100%' },
    { chapter: 'MASCOTS', stat: 'Referrals', goal: '50', current: '169', achieved: '100%' },
    { chapter: 'MANDRAKES', stat: 'Member Addition', goal: '5', current: '5', achieved: '100%' },
    { chapter: 'MERIDIAN', stat: 'Business (TYFCB)', goal: '1,50,00,000', current: '39,10,000', achieved: '26%' },
  ],
}

/* ---------- Report rows ---------- */
export const reportRows = {
  collection: [
    { id: 1, chapter: 'MILESTONES', date: '2026-09-05', purpose: 'Meeting Fee', amount: '45,000' },
    { id: 2, chapter: 'MAJESTIC', date: '2026-09-05', purpose: 'Membership Renewal', amount: '1,32,000' },
    { id: 3, chapter: 'MASCOTS', date: '2026-09-04', purpose: 'Meeting Fee', amount: '38,500' },
    { id: 4, chapter: 'MANDRAKES', date: '2026-09-03', purpose: 'Visitor Fee', amount: '12,000' },
    { id: 5, chapter: 'MERIDIAN', date: '2026-09-02', purpose: 'Meeting Fee', amount: '41,200' },
  ],
  birthday: [
    { id: 1, name: 'Aneesh', chapter: 'MILESTONES', dob: '1985-11-03', phone: '9895012348' },
    { id: 2, name: 'Sauparnika Puthur', chapter: 'MAJESTIC', dob: '1990-01-17', phone: '9895012350' },
    { id: 3, name: 'Faisal A', chapter: 'MASCOTS', dob: '1987-03-25', phone: '9895012352' },
  ],
  anniversary: [
    { id: 1, name: 'Majinu & Anjana', chapter: 'MILESTONES', date: '2026-09-14' },
    { id: 2, name: 'Aneesh & Divya', chapter: 'MILESTONES', date: '2026-09-22' },
  ],
  backlog: [
    { id: 1, user: 'majinu', action: 'Slide submitted for approval', time: '2026-09-08 20:12', ip: '106.213.44.18' },
    { id: 2, user: 'superadmin', action: 'Approved MAJESTIC deck', time: '2026-09-08 18:42', ip: '49.207.11.92' },
    { id: 3, user: 'yoonus', action: 'Updated chapter stats', time: '2026-09-07 17:30', ip: '106.213.44.21' },
  ],
  alert: [
    { id: 1, type: 'Warning', message: 'MONARCHS deck not submitted for Sep 2026', time: '2026-09-09 09:00' },
    { id: 2, type: 'Info', message: 'License renewal due for MIRACLES in 30 days', time: '2026-09-08 08:00' },
  ],
  circular: [
    { id: 1, title: 'Slide submission deadline — Sep 2026', issuedBy: 'Regional Director', date: '2026-09-01' },
    { id: 2, title: 'Annual convention registration open', issuedBy: 'BNI National', date: '2026-08-20' },
  ],
  loginbook: [
    { id: 1, username: 'majinu', ip: '106.213.44.18', time: '2026-09-09 08:41' },
    { id: 2, username: 'superadmin', ip: '49.207.11.92', time: '2026-09-09 08:12' },
    { id: 3, username: 'yoonus', ip: '106.213.44.21', time: '2026-09-08 19:55' },
  ],
  memberRegister: [
    { id: 1, name: 'Dr Majinu G. Sarath', chapter: 'MILESTONES', regNo: 'M-1001', dor: '2024-04-01' },
    { id: 2, name: 'Aneesh', chapter: 'MILESTONES', regNo: 'M-1002', dor: '2024-06-15' },
    { id: 3, name: 'Arun Kumar N R', chapter: 'MAJESTIC', regNo: 'M-1003', dor: '2023-04-01' },
    { id: 4, name: 'Jose Shibu M R', chapter: 'MASCOTS', regNo: 'M-1004', dor: '2023-09-12' },
  ],
  message: [
    { id: 1, to: 'All Chapters', message: 'Weekly meeting at 6 PM', date: '2026-09-08', status: 'Delivered' },
    { id: 2, to: 'MILESTONES', message: 'Submit your slides today', date: '2026-09-07', status: 'Delivered' },
  ],
  notification: [
    { id: 1, title: 'Deck approved', body: 'MAJESTIC Sep 2026 deck approved', date: '2026-09-08' },
    { id: 2, title: 'New induction', body: '2 new members inducted in MASCOTS', date: '2026-09-06' },
  ],
  otpList: [
    { id: 1, mobile: '9895012347', otp: '482913', time: '2026-09-09 08:40', status: 'Verified' },
    { id: 2, mobile: '9895012348', otp: '771204', time: '2026-09-08 19:52', status: 'Verified' },
  ],
  obituaries: [
    { id: 1, name: 'K. Raghavan Nair', chapter: 'MERIDIAN', date: '2026-07-18' },
  ],
  request: [
    { id: 1, from: 'MONARCHS', type: 'Deadline extension', date: '2026-09-08', status: 'Pending' },
    { id: 2, from: 'MUSTANGS', type: 'Chapter logo update', date: '2026-09-05', status: 'Approved' },
  ],
  adminNotification: [
    { id: 1, title: 'Server maintenance', body: 'Scheduled downtime 2 AM–4 AM', date: '2026-09-10' },
    { id: 2, title: 'New feature: Region dashboard', body: 'Region-wise analytics now live', date: '2026-09-01' },
  ],
}

/* ---------- Accounts books + member portal directories ---------- */
export const bookRows = {
  daybook: [
    { id: 1, date: '2026-09-08', ledger: 'Printing', type: 'Dr', amount: '6,400', narration: 'Slide handouts' },
    { id: 2, date: '2026-09-07', ledger: 'Membership Fee', type: 'Cr', amount: '1,32,000', narration: 'Renewals — 4 members' },
    { id: 3, date: '2026-09-06', ledger: 'Venue Rent', type: 'Dr', amount: '18,000', narration: 'Hall rent September' },
    { id: 4, date: '2026-09-05', ledger: 'Meeting Fee', type: 'Cr', amount: '45,000', narration: 'Weekly meeting fees' },
  ],
  cashbook: [
    { id: 1, date: '2026-09-05', particulars: 'Meeting Fee collection', debit: '45,000', credit: '—' },
    { id: 2, date: '2026-09-06', particulars: 'Venue rent paid', debit: '—', credit: '18,000' },
    { id: 3, date: '2026-09-08', particulars: 'Printing charges', debit: '—', credit: '6,400' },
  ],
  bankbook: [
    { id: 1, date: '2026-09-07', bank: 'SBI Current A/c', particulars: 'Membership renewals', debit: '1,32,000', credit: '—' },
    { id: 2, date: '2026-09-04', bank: 'Federal Bank', particulars: 'Visitor fee transfer', debit: '12,000', credit: '—' },
    { id: 3, date: '2026-09-02', bank: 'SBI Current A/c', particulars: 'Annual subscription', debit: '—', credit: '48,000' },
  ],
  ledgerbook: [
    { id: 1, ledger: 'Cash in Hand', date: '2026-09-05', debit: '45,000', credit: '—', balance: '87,500' },
    { id: 2, ledger: 'Cash in Hand', date: '2026-09-06', debit: '—', credit: '18,000', balance: '69,500' },
    { id: 3, ledger: 'SBI Current A/c', date: '2026-09-07', debit: '1,32,000', credit: '—', balance: '5,17,000' },
  ],
  expiry: [
    { id: 1, name: 'MIRACLES chapter licence', type: 'Licence', expiry: '2026-10-09' },
    { id: 2, name: 'Anoop N E — A-201', type: 'Lease', expiry: '2027-03-31' },
  ],
}

export const dirRows = {
  memberList: [
    { id: 1, name: 'Dr Majinu G. Sarath', family: 'Sarath', phone: '9895012347' },
    { id: 2, name: 'Aneesh', family: 'Nair', phone: '9895012348' },
    { id: 3, name: 'Yoonus', family: 'Yoonus', phone: '9895012349' },
    { id: 4, name: 'Sauparnika Puthur', family: 'Puthur', phone: '9895012350' },
    { id: 5, name: 'Faisal A', family: 'Ahmed', phone: '9895012352' },
  ],
  parishList: [
    { id: 1, name: "St. Mary's Kowdiar", district: 'Thiruvananthapuram', vicar: 'Fr. Thomas Joseph' },
    { id: 2, name: 'St. George Pattom', district: 'Thiruvananthapuram', vicar: 'Fr. Jacob Mathew' },
  ],
  dioceseList: [
    { id: 1, name: 'Trivandrum', bishop: 'Most Rev. Thomas Netto', state: 'Kerala' },
    { id: 2, name: 'Ernakulam', bishop: 'Most Rev. Joseph Kalathiparambil', state: 'Kerala' },
  ],
  bishopList: [
    { id: 1, name: 'Most Rev. Thomas Netto', diocese: 'Trivandrum' },
    { id: 2, name: 'Most Rev. Joseph Kalathiparambil', diocese: 'Ernakulam' },
  ],
  clergyList: [
    { id: 1, name: 'Fr. Thomas Joseph', role: 'Vicar', parish: "St. Mary's Kowdiar" },
    { id: 2, name: 'Fr. Jacob Mathew', role: 'Vicar', parish: 'St. George Pattom' },
  ],
  obituariesList: [
    { id: 1, name: 'K. Raghavan Nair', chapter: 'MERIDIAN', date: '2026-07-18' },
  ],
  wishes: [
    { id: 1, name: 'Aneesh', occasion: 'Birthday', date: '2026-11-03' },
    { id: 2, name: 'Majinu & Anjana', occasion: 'Anniversary', date: '2026-09-14' },
    { id: 3, name: 'Sauparnika Puthur', occasion: 'Birthday', date: '2027-01-17' },
  ],
  paymentHistory: [
    { id: 1, date: '2026-09-05', purpose: 'Meeting Fee', amount: '1,500', mode: 'UPI' },
    { id: 2, date: '2026-04-01', purpose: 'Annual Membership', amount: '33,000', mode: 'Bank Transfer' },
  ],
  favourites: [
    { id: 1, name: 'Arun Kumar N R', phone: '9895012351' },
    { id: 2, name: 'Jose Shibu M R', phone: '9895012353' },
  ],
  pushNotification: [
    { id: 1, title: 'Deck approved for MAJESTIC', time: '2026-09-08 18:42' },
    { id: 2, title: 'Weekly meeting at 6 PM', time: '2026-09-08 09:00' },
  ],
}

/* Chapter Team rows — matches the ChapterTeam form shape */
export const mockTeamRows = [
  { id: 1, chapter: 'MILESTONES', designation: 'President', name: 'Dr Majinu G. Sarath', photo: 'majinu.jpg', organization: 'Sarath Dental Care', username: 'majinu', password: 'demo1234', active: true },
  { id: 2, chapter: 'MILESTONES', designation: 'Vice-President', name: 'Aneesh', photo: 'aneesh.jpg', organization: 'Aneesh Constructions', username: 'aneesh', password: 'demo1234', active: true },
  { id: 3, chapter: 'MILESTONES', designation: 'Secretary /Treasurer', name: 'Yoonus', photo: 'yoonus.jpg', organization: 'Yoonus Traders', username: 'yoonus', password: 'demo1234', active: true },
  { id: 4, chapter: 'MAJESTIC', designation: 'President', name: 'Arun Kumar N R', photo: 'arun.jpg', organization: 'NR Enterprises', username: 'arun', password: 'demo1234', active: true },
  { id: 5, chapter: 'MAJESTIC', designation: 'Vice-President', name: 'Anoop N E', photo: 'anoop.jpg', organization: 'Anoop Interiors', username: 'anoop', password: 'demo1234', active: true },
  { id: 6, chapter: 'MASCOTS', designation: 'President', name: 'Jose Shibu M R', photo: 'jose.jpg', organization: 'Shibu Motors', username: 'jose', password: 'demo1234', active: true },
]
