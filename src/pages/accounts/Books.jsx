import ReportPage from '../../components/ReportPage'
import * as cfg from '../../data/reportConfigs'

export const Daybook = () => <ReportPage {...cfg.daybook} />
export const Cashbook = () => <ReportPage {...cfg.cashbook} />
export const Bankbook = () => <ReportPage {...cfg.bankbook} />
export const Ledgerbook = () => <ReportPage {...cfg.ledgerbook} />
