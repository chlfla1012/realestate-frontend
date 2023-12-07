import { CompanyName } from "./CompanyName"
import { FileHandle } from "./FileHandle"

export interface UserInfo{
    id:string
    firstName:string
    lastName:string
    firstNamekana:string
    lastNamekana:string
    gender:string
    dateOfBirth:string
    department:string
    phone1:number
    phone2:number
    phone3:number
    password:string
    email:string
    postalcode1:string
    postalcode2:string
    address:string
    startDate:string
    endDate:string
    roleType:string
    bankName:string
    branch:string
    accountType:string
    accountNumber:string
    accountName:string
    createdDate:string
    modifiedDate: string
    companyId:CompanyName
    logo:FileHandle
    apportionment:string

}