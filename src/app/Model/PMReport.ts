import { Invoice } from "./Invoice";
import { CompanyName } from "./CompanyName";
import { Contract } from "./Contract";
import { Property } from "./Property";
import { IncomeCheck } from "./IncomeCheck";
import { UserInfo } from "./userInfo";
import { FileHandle } from "./FileHandle";
export interface PMReport{
    id : string
    propertyName : string
    ownerName : string
    mail : string
    bankName : string
    branchName : string
    accountType : string
    accountNo : number
    accountName : string
    apportionment : string
    targetMonth : string
    picName : string
    totalIncome : number
    totalExpense : number
    createdName : string
    createdDate : string
    modifiedName : string
    modifiedDate: string
    companyId : CompanyName
    logo : FileHandle
    contractId: Contract
    propertyId: Property
    invoiceId: Invoice
    paymentCheckId : IncomeCheck

}