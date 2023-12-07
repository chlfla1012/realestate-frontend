import { CompanyName } from "./CompanyName"
import { Customer } from "./Customer"
import { FileHandle } from "./FileHandle"
import { UserInfo } from "./userInfo"

export interface Property{
  id: string
  companyId:CompanyName
    propertyType: string
    status: string
    propertyName: string
    propertyKana: string
    floor:string
    room: string

  ownerName: string
  ownerKana: string
    owner: UserInfo
    
    picName: string


    mobileFirst: string
    mobileSecond: string
    mobileThird: string
    pic: UserInfo
   
    postalFirst: string
    postalLast: string
    address: string
    line1: string
    station1: string
    line2: string
    station2: string
    busStop1: string
    busStop2: string
    ride1: string
    stroll1: string
    ride2: string
    stroll2: string
   
    // price: string
    // adminFees: string
    // adminTax: string
    // parkingFees: string
    // repairExpenses: string
    // deposit: string
    // keyMoney: string
    // guarantee: string
    // restorationFees: string
    // restorationStatus: boolean
    // fireInsurance: string
    // insuranceHours: string
    // renewalFees: string
    // signboard: string
    // consumptionTax: string
    taxRate:number
    rentTsubo: number
    totalRent: number
    rentTax: string
    serviceFeesTsubo:number
    serviceFeesTotal: number
    serviceFeesTax: string
  parkingFees: number
  parkingFeesTax: string
repairExpenses: number
repairTax: string
deposit: number
depositTax: string
keyMoney: number
keyMoneyTax: string
toalDeposit: number
toalDepositTax: string
restorationFees: number
restorationFeesTax: string
restorationStatus: boolean
fireInsuranceFees: number
fireInsuranceFeesTax: string
insuranceYears: number
renewalFees: number
renewalFeesTax: string
    signboardFees: number
    signboardFeesTax: string
    consumptionTax: number


    ground: string
    underground: string
    elevator:boolean
    structure: string
    buildingDate: string
    newBuild:boolean
    buildNo: string

    exclusiveArea: string
    exclusiveStatus: string
    layout: string
    layoutStatus: string
    totalUnits: string
    layoutRemarks: string

    classification:string
    areaMeter:number
   areaTsubo: number
    
    waterSupply: string
    gas: string
    electricity: string
    drainage: string
    pets: string
    diy: string

    bathToilet: boolean
    lightning: boolean
    doorPhone: boolean
    shower: boolean
    furniture: boolean
    twoFamily: boolean
    publicBath: boolean
    indoorBath: boolean
    loft: boolean
    internet: boolean
    catv: boolean
    flooring: boolean
    allElectric: boolean
    csAntenna: boolean
    aircon: boolean
    counterKitchen: boolean
    bsAntenna: boolean
    parking: boolean
    systemKitchen: boolean
    autoLock: boolean
    deliveryBox: boolean
    homeTel: boolean
    balcony: boolean
    rosette: boolean

    image1:FileHandle
    image2: FileHandle
    image3: FileHandle
    image4: FileHandle
    image5: FileHandle
    image6: FileHandle
    image7: FileHandle
    image8: FileHandle

    managerName: string
    manageCompany: string
    managementForm: string

    constructCompany: string
}