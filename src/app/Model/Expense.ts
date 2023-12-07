import { UserInfo } from "./userInfo"
import { PMReport } from "./PMReport"

export interface Expense {
    id : string
    expDetail : string
    voucher : string
    expenseDate : string
    expenseMoney : number
    expenseTax : number
    expenseTotal : number
    expenseRemarks : string
    owner : UserInfo
    pmReport : PMReport
}