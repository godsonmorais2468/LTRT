import ReportPage from '../../components/ReportPage'
import { expiryReport } from '../../data/reportConfigs'

export default function Expiry() {
  return <ReportPage {...expiryReport} />
}
