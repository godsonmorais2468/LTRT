import ReportPage from '../../components/ReportPage'
import * as cfg from '../../data/reportConfigs'

export const MemberList = () => <ReportPage {...cfg.memberListDir} />
export const ParishList = () => <ReportPage {...cfg.parishListDir} />
export const DioceseList = () => <ReportPage {...cfg.dioceseListDir} />
export const BishopList = () => <ReportPage {...cfg.bishopListDir} />
export const ClergyList = () => <ReportPage {...cfg.clergyListDir} />
export const ObituariesList = () => <ReportPage {...cfg.obituariesListDir} />
export const Wishes = () => <ReportPage {...cfg.wishesDir} />
export const PaymentHistory = () => <ReportPage {...cfg.paymentHistoryDir} />
export const Favourites = () => <ReportPage {...cfg.favouritesDir} />
export const PushNotification = () => <ReportPage {...cfg.pushNotificationDir} />
