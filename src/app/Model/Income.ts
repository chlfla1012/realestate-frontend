import { UserInfo } from "./userInfo"
import { PMReport } from "./PMReport"
export interface Income {
    id : string
    incomeRemark : string
    owner : UserInfo
    pmReport : PMReport
    room: string
    tenantName: string
    month: string
    rent: number
    managementFee: number
    bicycleParkingFee: number
    signboardFees: number
    parkingFee: number
    keymoney: number
    shikiken: number
    deposit: number
    renewalFee: number
    repairCost: number
    penaltyFee: number
    tax: number
    others: number
    totalIncome: number
    incomeRemarks: string
}