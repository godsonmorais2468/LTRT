import {
  LayoutDashboard, FolderKanban, GitBranch, KeyRound, Home, UserCircle2, CheckCircle2,
  QrCode, Users, Church, ScrollText, Map, Crown, BookOpen, Flame, ClipboardList,
  PartyPopper, Wallet, Star, Bell, Phone, Calendar, BarChart3, Settings,
} from 'lucide-react'

export const chapterMenu = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  {
    label: 'Master', icon: FolderKanban,
    items: [
      { to: '/master/goal', label: 'Set Goal' },
    ],
  },
  {
    label: 'Transactions', icon: GitBranch,
    items: [
      { to: '/transaction/chapter-team', label: 'Chapter Team' },
      { to: '/transaction/slide-preparation', label: 'Slide Preparation' },
    ],
  },
  { to: '/change-password', label: 'Change Password', icon: KeyRound },
]

export const memberMenu = [
  { to: '/app/home', label: 'Home', icon: Home },
  { to: '/app/profile', label: 'My Profile', icon: UserCircle2 },
  { to: '/app/attendance', label: 'Attendance', icon: CheckCircle2 },
  { to: '/app/attendance-qrcode', label: 'QR Attendance', icon: QrCode },
  { to: '/app/member-list', label: 'Members', icon: Users },
  { to: '/app/parish', label: 'Parish', icon: Church },
  { to: '/app/parish-list', label: 'Parish List', icon: ScrollText },
  { to: '/app/diocese-list', label: 'Diocese List', icon: Map },
  { to: '/app/bishop-list', label: 'Bishop List', icon: Crown },
  { to: '/app/clergy-list', label: 'Clergy List', icon: BookOpen },
  { to: '/app/obituaries', label: 'Obituaries', icon: Flame },
  { to: '/app/obituaries-list', label: 'Obituaries List', icon: ClipboardList },
  { to: '/app/wishes', label: 'Wishes', icon: PartyPopper },
  { to: '/app/payment-history', label: 'Payment History', icon: Wallet },
  { to: '/app/favourites', label: 'Favourites', icon: Star },
  { to: '/app/push-notification', label: 'Notifications', icon: Bell },
  { to: '/app/bishop', label: 'Bishop', icon: Crown },
  { to: '/app/attendance-individual', label: 'My Attendance History', icon: Calendar },
  { to: '/app/contact', label: 'Contact', icon: Phone },
  { to: '/change-password', label: 'Change Password', icon: KeyRound },
]

export const superadminMenu = [
  { to: '/superadmin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  {
    label: 'Master', icon: FolderKanban,
    items: [
      { to: '/superadmin/master/region', label: 'Region' },
      { to: '/superadmin/master/chapter', label: 'Chapter' },
      { to: '/superadmin/master/stat', label: 'Stat Master' },
      { to: '/superadmin/master/designation', label: 'Manage Designation' },
    ],
  },
  {
    label: 'Transactions', icon: GitBranch,
    items: [
      { to: '/superadmin/transaction/chapter-team', label: 'Chapter Team' },
      { to: '/superadmin/transaction/show-presentation', label: 'Show Presentation' },
    ],
  },
  { to: '/superadmin/performance-analysis', label: 'Performance Analysis', icon: BarChart3 },
  {
    label: 'Settings', icon: Settings,
    items: [
      { to: '/superadmin/settings/common', label: 'Common settings' },
    ],
  },
  { to: '/superadmin/change-password', label: 'Change Password', icon: KeyRound },
]
