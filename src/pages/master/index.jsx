import CrudPage from '../../components/CrudPage'
import * as cfg from '../../data/crudConfigs'

export { default as ManageChapter } from './ManageChapter'
export { default as Region } from './Region'
export { default as ManageStat } from './ManageStat'
export { default as ManageDesignation } from './ManageDesignation'
export { default as Goal } from './Goal'

export const Chapter = () => <CrudPage config={cfg.chapterConfig} />
export const Members = () => <CrudPage config={cfg.membersConfig} />
export const FamilyMember = () => <CrudPage config={cfg.familyMemberConfig} />
export const Designation = () => <CrudPage config={cfg.designationConfig} />
export const Banner = () => <CrudPage config={cfg.bannerConfig} />
export const SlideRemarks = () => <CrudPage config={cfg.slideRemarksConfig} />
export const Stat = () => <CrudPage config={cfg.statConfig} />
