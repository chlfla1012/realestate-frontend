// export class Customer {
   

//     constructor(public id:number,public item:string,public companyName:string,
//         public nameKana:string,public email:string,
//         public mobile:string,
//         public personName:string,public postalCode:string,
//         public address:string,public memo:string){
            
//         }
      
        
//     }

import { CompanyName } from "./CompanyName";
import { FileHandle } from "./FileHandle";

export interface Customer{
        id:string
        address:string
        companyName: string
        createdDate:string
        createdName:string
        department:string
        fax1:string
        fax2:string
        fax3:string
        mailAdd: string
        mobileFirst: string
        mobileSecond: string
        mobileThird:string
        modifiedDate:string
        personFirstKana: string
        personFirstName: string
        personLastKana:string
        personLastName:string
        postalFirst:string
        postalSecond:string
        remark:string
        type: string
        updatedName:string
        companyId:CompanyName    
        logo:FileHandle 
        personFullName: string
        personFullNameKana: string  
}

