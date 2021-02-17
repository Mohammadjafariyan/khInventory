
import { MyGlobal } from './Models';

export class GlobalSiteSettingService{
    getAll(){


        if (MyGlobal.IsDebugEnvirement) {
            return this.getAllDebug();
        }
        return this.getAllReal();

    }
    getAllDebug(){

        return new Promise((resolve, reject) => {
               
   
           let array=[];
   
           
   
           resolve({Status:1,Single:{
               


            Unit:'کیلوگرم',
            PerUnitPrice:25000

            

           }});
           })
           
       }
   
       getAllReal(){
   
       }

}