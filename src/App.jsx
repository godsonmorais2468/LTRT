import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RegionProvider } from './context/RegionContext'
import { ChapterProvider } from './context/ChapterContext'
import { DesignationProvider } from './context/DesignationContext'
import ProtectedRoute from './routes/ProtectedRoute'
import AppShell from './layouts/AppShell'
import { chapterMenu, memberMenu, superadminMenu } from './data/menus'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgetPassword from './pages/auth/ForgetPassword'
import ChangePassword from './pages/shared/ChangePassword'
import NotFound from './pages/shared/NotFound'

import Dashboard from './pages/chapter/Dashboard'
import * as Master from './pages/master/index'
import ChapterTeam from './pages/transaction/ChapterTeam'
import Attendance from './pages/transaction/Attendance'
import AttendanceQrcode from './pages/transaction/AttendanceQrcode'
import AttendanceSheet from './pages/transaction/AttendanceSheet'
import FileUpload from './pages/transaction/FileUpload'
import SlidePreparation from './pages/transaction/SlidePreparation'
import SlideApproval from './pages/transaction/SlideApproval'
import SlidePresentation from './pages/transaction/SlidePresentation'
import ShowPresentation from './pages/transaction/ShowPresentation'
import * as AccMasters from './pages/accounts/Masters'
import Voucher from './pages/accounts/Voucher'
import * as Books from './pages/accounts/Books'
import TrialBalance from './pages/accounts/TrialBalance'
import BalanceSheet from './pages/accounts/BalanceSheet'
import ProfitLoss from './pages/accounts/ProfitLoss'
import ReceiptPayment from './pages/accounts/ReceiptPayment'
import AutoPosting from './pages/accounts/AutoPosting'
import * as Reports from './pages/reports/index'
import * as Setting from './pages/setting/Masters'

import * as AppDir from './pages/app/Directories'
import AppHome from './pages/app/Home'
import AppProfile from './pages/app/Profile'
import AppContact from './pages/app/Contact'
import AppParish from './pages/app/Parish'
import AppObituaries from './pages/app/Obituaries'
import AppBishop from './pages/app/Bishop'
import AppAttendanceIndividual from './pages/app/AttendanceIndividual'

import SuperadminDashboard from './pages/superadmin/Dashboard'
import PerformanceAnalysis from './pages/superadmin/PerformanceAnalysis'
import ControlRoom from './pages/superadmin/ControlRoom'
import * as SuperMasters from './pages/superadmin/Masters'
import Billing from './pages/superadmin/Billing'
import Verification from './pages/superadmin/Verification'
import SendInfo from './pages/superadmin/SendInfo'
import SuperAccounts from './pages/superadmin/Accounts'
import LicenseKey from './pages/superadmin/LicenseKey'

function ChapterShell() {
  return <AppShell menu={chapterMenu} brand="LTRT" />
}
function MemberShell() {
  return <AppShell menu={memberMenu} brand="LTRT" />
}
function SuperadminShell() {
  return <AppShell menu={superadminMenu} brand="LTRT" />
}

export default function App() {
  return (
    <AuthProvider>
      <RegionProvider>
      <ChapterProvider>
      <DesignationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          {/* ---------- Chapter Admin ---------- */}
          <Route
            element={
              <ProtectedRoute roles={['chapter_admin']}>
                <ChapterShell />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/master/chapter" element={<Master.Chapter />} />
            <Route path="/master/members" element={<Master.Members />} />
            <Route path="/master/family-member" element={<Master.FamilyMember />} />
            <Route path="/master/designation" element={<Master.Designation />} />
            <Route path="/master/banner" element={<Master.Banner />} />
            <Route path="/master/goal" element={<Master.Goal />} />
            <Route path="/master/slide-remarks" element={<Master.SlideRemarks />} />
            <Route path="/master/stat" element={<Master.Stat />} />

            <Route path="/transaction/chapter-team" element={<ChapterTeam />} />
            <Route path="/transaction/attendance" element={<Attendance />} />
            <Route path="/transaction/attendance-qrcode" element={<AttendanceQrcode />} />
            <Route path="/transaction/attendance-sheet" element={<AttendanceSheet />} />
            <Route path="/transaction/file-upload" element={<FileUpload />} />
            <Route path="/transaction/slide-preparation" element={<SlidePreparation />} />
            <Route path="/transaction/slide-approval" element={<SlideApproval />} />
            <Route path="/transaction/slide-presentation" element={<SlidePresentation />} />
            <Route path="/transaction/show-presentation" element={<ShowPresentation />} />

            <Route path="/accounts/grouphead" element={<AccMasters.Grouphead />} />
            <Route path="/accounts/ledger" element={<AccMasters.Ledger />} />
            <Route path="/accounts/bank" element={<AccMasters.Bank />} />
            <Route path="/accounts/voucher" element={<Voucher />} />
            <Route path="/accounts/daybook" element={<Books.Daybook />} />
            <Route path="/accounts/cashbook" element={<Books.Cashbook />} />
            <Route path="/accounts/bankbook" element={<Books.Bankbook />} />
            <Route path="/accounts/ledgerbook" element={<Books.Ledgerbook />} />
            <Route path="/accounts/trial-balance" element={<TrialBalance />} />
            <Route path="/accounts/balance-sheet" element={<BalanceSheet />} />
            <Route path="/accounts/profit-loss" element={<ProfitLoss />} />
            <Route path="/accounts/receipt-payment" element={<ReceiptPayment />} />
            <Route path="/accounts/auto-posting" element={<AutoPosting />} />
            <Route path="/accounts/day-settlement" element={<AccMasters.DaySettlement />} />
            <Route path="/accounts/expense" element={<AccMasters.Expense />} />

            <Route path="/reports/collection" element={<Reports.CollectionReport />} />
            <Route path="/reports/birthday" element={<Reports.BirthdayReport />} />
            <Route path="/reports/anniversary" element={<Reports.AnniversaryList />} />
            <Route path="/reports/backlog" element={<Reports.BacklogReport />} />
            <Route path="/reports/alert" element={<Reports.AlertReport />} />
            <Route path="/reports/circular" element={<Reports.CircularReport />} />
            <Route path="/reports/loginbook" element={<Reports.LoginbookReport />} />
            <Route path="/reports/member-register" element={<Reports.MemberRegisterReport />} />
            <Route path="/reports/message" element={<Reports.MessageReport />} />
            <Route path="/reports/notification" element={<Reports.NotificationReport />} />
            <Route path="/reports/otp-list" element={<Reports.OtpListReport />} />
            <Route path="/reports/obituaries" element={<Reports.ObituariesReport />} />
            <Route path="/reports/request" element={<Reports.RequestReport />} />
            <Route path="/reports/admin-notification" element={<Reports.AdminNotificationReport />} />

            <Route path="/setting/common" element={<Setting.CommonSettings />} />
            <Route path="/setting/financial-year" element={<Setting.FinancialYearSettings />} />
            <Route path="/setting/functional" element={<Setting.FunctionalSetting />} />
            <Route path="/setting/mode-of-pay" element={<Setting.ModeOfPay />} />
            <Route path="/setting/tax-master" element={<Setting.TaxMaster />} />
            <Route path="/setting/user" element={<Setting.User />} />
            <Route path="/setting/user-roll" element={<Setting.UserRoll />} />
            <Route path="/setting/profile" element={<Setting.ProfileSettings />} />
          </Route>

          {/* ---------- Member portal ---------- */}
          <Route
            element={
              <ProtectedRoute roles={['member']}>
                <MemberShell />
              </ProtectedRoute>
            }
          >
            <Route path="/app/home" element={<AppHome />} />
            <Route path="/app/profile" element={<AppProfile />} />
            <Route path="/app/attendance" element={<Attendance />} />
            <Route path="/app/attendance-qrcode" element={<AttendanceQrcode />} />
            <Route path="/app/member-list" element={<AppDir.MemberList />} />
            <Route path="/app/parish" element={<AppParish />} />
            <Route path="/app/parish-list" element={<AppDir.ParishList />} />
            <Route path="/app/diocese-list" element={<AppDir.DioceseList />} />
            <Route path="/app/bishop-list" element={<AppDir.BishopList />} />
            <Route path="/app/clergy-list" element={<AppDir.ClergyList />} />
            <Route path="/app/obituaries" element={<AppObituaries />} />
            <Route path="/app/obituaries-list" element={<AppDir.ObituariesList />} />
            <Route path="/app/wishes" element={<AppDir.Wishes />} />
            <Route path="/app/payment-history" element={<AppDir.PaymentHistory />} />
            <Route path="/app/favourites" element={<AppDir.Favourites />} />
            <Route path="/app/push-notification" element={<AppDir.PushNotification />} />
            <Route path="/app/contact" element={<AppContact />} />
            <Route path="/app/bishop" element={<AppBishop />} />
            <Route path="/app/attendance-individual" element={<AppAttendanceIndividual />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>

          {/* ---------- Superadmin ---------- */}
          <Route
            element={
              <ProtectedRoute roles={['superadmin']}>
                <SuperadminShell />
              </ProtectedRoute>
            }
          >
            <Route path="/superadmin/dashboard" element={<SuperadminDashboard />} />
            <Route path="/superadmin/master/region" element={<Master.Region />} />
            <Route path="/superadmin/master/chapter" element={<Master.ManageChapter />} />
            <Route path="/superadmin/master/stat" element={<Master.ManageStat />} />
            <Route path="/superadmin/master/designation" element={<Master.ManageDesignation />} />
            <Route path="/superadmin/transaction/chapter-team" element={<ChapterTeam />} />
            <Route path="/superadmin/transaction/show-presentation" element={<ShowPresentation />} />
            <Route path="/superadmin/transaction/slide-approval" element={<SlideApproval />} />
            <Route path="/superadmin/performance-analysis" element={<PerformanceAnalysis />} />
            <Route path="/superadmin/settings/common" element={<Setting.CommonSettings />} />
            <Route path="/superadmin/control-room" element={<ControlRoom />} />
            <Route path="/superadmin/resellers" element={<SuperMasters.Resellers />} />
            <Route path="/superadmin/diocese" element={<SuperMasters.Diocese />} />
            <Route path="/superadmin/district" element={<SuperMasters.District />} />
            <Route path="/superadmin/state" element={<SuperMasters.StateMaster />} />
            <Route path="/superadmin/verification" element={<Verification />} />
            <Route path="/superadmin/billing" element={<Billing />} />
            <Route path="/superadmin/advertisements" element={<SuperMasters.Advertisements />} />
            <Route path="/superadmin/send-info" element={<SendInfo />} />
            <Route path="/superadmin/backlog" element={<Reports.BacklogReport />} />
            <Route path="/superadmin/accounts" element={<SuperAccounts />} />
            <Route path="/superadmin/bank" element={<SuperMasters.Bank />} />
            <Route path="/superadmin/ledger" element={<SuperMasters.Ledger />} />
            <Route path="/superadmin/grouphead" element={<SuperMasters.Grouphead />} />
            <Route path="/superadmin/license-key" element={<LicenseKey />} />
            <Route path="/superadmin/change-password" element={<ChangePassword />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </DesignationProvider>
      </ChapterProvider>
      </RegionProvider>
    </AuthProvider>
  )
}
