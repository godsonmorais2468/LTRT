import CrudPage from '../../components/CrudPage'
import * as cfg from '../../data/crudConfigs'

export const Grouphead = () => <CrudPage config={cfg.groupheadConfig} />
export const Ledger = () => <CrudPage config={cfg.ledgerConfig} />
export const Bank = () => <CrudPage config={cfg.bankConfig} />
export const Expense = () => <CrudPage config={cfg.expenseConfig} />
export const DaySettlement = () => <CrudPage config={cfg.daySettlementConfig} />
