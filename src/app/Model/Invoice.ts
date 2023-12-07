import { CompanyName } from "./CompanyName"
import { Contract } from "./Contract"
import { FileHandle } from "./FileHandle"
import { InvoiceList } from "./InvoiceList"

export class Invoice{
id: string
companyId:CompanyName
logoId:FileHandle
//userId:UserInfo
contractObj:Contract
contractData:string
invoicelistObj:InvoiceList
companyPostalFirst:string
companyPostalSecond:string
companyAddress:string
personName: string
mobileFirst:string
mobileSecond:string
mobileThird:string
propertyid:string;
propertyName:string
roomNo:string
floor: string
buildingPostalFirst: string
buildingPostalLast: string
address: string
lenderCooperate:string
lenderPersonName:string
billingDate:string
paymentDueDate:string
// rent:number
// rentTax:number
// rentTotal:number
// rentUsagePeriod:Date
// brokerageFee:number
// brokerageFeeTax:number
// brokerageFeeTotal:number
// brokerageFeeUsagePeriod:Date
// serviceFee:number
// serveFeeTax:number
// serviceFeeTotal:number
// serviceFeeUsagePeriod:Date
// parkingFee:number
// parkingFeeTax:number
// parkingFeeTotal:number
// parkingStartDate:Date
// parkingEndDate:Date
// bicycleParkingFee:number
// bicycleParkingFeeTax:number
// bicycleParkingFeeTotal:number
// bicycleParkingStartDate:Date
// bicycleParkingEndDate:Date
// keymoney:number
// keymoneyTax:number
// keymoneyTotal:number
// keymoneyStartDate:Date
// keymoneyEndDate:Date
// shikikin:number
// shikikinTax:number
// shikikinTotal:number
// shikikinStartDate:Date
// shikikinEndDate:Date
// deposit:number
// depositTax:number
// depositTotal:number
// depositStartDate:Date
// depositEndDate:Date
// renewalFee:number
// renewalFeeTax:number
// renewalFeeTotal:number
// renewalFeeStartDate:Date
// renewalFeeEndDate:Date
// repairCost:number
// repairCostTax:number
// repairCostTotal:number
// repairCostStartDate:Date
// repairCostEndDate:Date
// penaltyFee:number
// penaltyFeeTax:number
// penaltyFeeTotal:number
// penaltyFeeStartDate:Date
// penaltyFeeEndDate:Date
// signboard:number
// signboardTax:number
// signboardTotal:number
// signboardStartDate:Date
// signboardEndDate:Date
// electricBill:number
// electricBillTax:number
// electricBillUsageFee:number
// electricBillTotal:number
// electricBillStartDate:Date
// electricBillEndDate:Date
// waterBill:number
// waterBillTax:number
// waterBillUsageFee:number
// waterBillTotal:number
// waterBillStartDate:Date
// waterBillEndDate:Date
// gasBill:number
// gasBilTax:number
// gasBillUsageFee:number
// gasBillTotal:number
// gasBillStartDate:Date
// gasBillEndDate:Date
// constructionBill:number
// constructionBillTax:number
// constructionBillTotal:number
// constructionBillUsagePeriod:Date
// workNameFirst:String
// workAmountFirst:number
// workTaxFirst:number
// workAmountTotalFirst:number
// workUsagePeriodFirst:Date
// workNameSecond:String
// workAmountSecond:number
// workTaxsecond:number
// workTotalSecond:number
// workUsagePeriodSecond:Date
// total:number
information:string
bankName:string
branchName:string
accountType:string
accountNo:string
accountName:string
// createdName: String
createdDate: string
// upDatedName: String
modifiedDate: string
}