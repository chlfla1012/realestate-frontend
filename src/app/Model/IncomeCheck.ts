import { CompanyName } from "./CompanyName";
import { FileHandle } from "./FileHandle";


export interface IncomeCheck { 
              id:string,
              ownerName: string,
              tenantName: string,
              propertyName: string,
              room:string,
              month: string,
              accountName: string,
              expectedAmount:number,
              income: number,
              status: string,
              remark:string,
              contractId:String,
              companyId:CompanyName,   
              logo:FileHandle ,
              createdDate:string,
              modifiedDate:string,
              contractType:string                   
   
}