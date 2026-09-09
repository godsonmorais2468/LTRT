import CrudPage from '../../components/CrudPage'
import * as cfg from '../../data/crudConfigs'

export const Property = () => <CrudPage config={cfg.propertyConfig} />
export const Tenant = () => <CrudPage config={cfg.tenantConfig} />
export const Payment = () => <CrudPage config={cfg.landlordPaymentConfig} />
