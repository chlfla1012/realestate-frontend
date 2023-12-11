import { UserInfo } from "./userInfo"
import { PMReport } from "./PMReport"
export interface Income {
    id : number
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
    rentTax: number
    managementFeeTax: number
    bicycleParkingFeeTax: number
    signboardFeesTax: number
    parkingFeeTax: number
    keymoneyTax: number
    shikikenTax: number
    depositTax: number
    renewalFeeTax: number
    repairCostTax: number
    penaltyFeeTax: number
    workFirst: number
    workSecond: number
    workFirstTax: number
    workSecondTax: number
}