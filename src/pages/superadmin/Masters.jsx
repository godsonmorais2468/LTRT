import CrudPage from '../../components/CrudPage'
import * as cfg from '../../data/crudConfigs'

export const Resellers = () => <CrudPage config={cfg.resellersConfig} />
export const Diocese = () => <CrudPage config={cfg.dioceseConfig} />
export const District = () => <CrudPage config={cfg.districtConfig} />
export const StateMaster = () => <CrudPage config={cfg.stateConfig} />
export const Advertisements = () => <CrudPage config={cfg.advertisementsConfig} />
export const Bank = () => <CrudPage config={cfg.bankConfig} />
export const Ledger = () => <CrudPage config={cfg.ledgerConfig} />
export const Grouphead = () => <CrudPage config={cfg.groupheadConfig} />
