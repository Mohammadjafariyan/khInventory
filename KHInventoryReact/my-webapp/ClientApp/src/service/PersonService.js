
import { MyGlobal } from './Models';

export class PersonService{
    getAll(searchTerm){

        if(!searchTerm){
            searchTerm='';
        }

        if (MyGlobal.IsDebugEnvirement) {
            return this.getAllDebug();
        }
        return this.getAllReal(searchTerm);

    }
    getAllDebug(){

        return new Promise((resolve, reject) => {
               
   
           let array=[];
   
           array.push({Name:'محمد سلامی',Id:1});
           array.push({Name:'عباس ایرانی',Id:2});
           array.push({Name:'سعید نامجو مطلق',Id:3});
           
   
           resolve({Status:1,EntityList:array});
           })
           
       }
   
       getAllReal(searchTerm){
           return fetch('/Person/Search?searchTerm='+searchTerm)
               .then(response => response.json());
       }


       save(form){
        debugger;

        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        };
      return  fetch('/Person', requestOptions)
            .then(response => response.json());
       }

}