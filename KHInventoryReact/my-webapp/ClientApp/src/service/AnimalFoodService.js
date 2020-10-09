import {MyGlobal} from './Models';
import {fn} from 'jquery';

export default class AnimalFoodService {

    array = [];


    constructor() {
        this.array.push({Name: 'سبوس', Id: 1, PerUnitPrice: 15000, Remain: 50});
        this.array.push({Name: 'گندم', Id: 2, PerUnitPrice: 85000, Remain: 35});
        this.array.push({Name: 'جو', Id: 3, PerUnitPrice: 19000, Remain: 30});

    }

    getAllDebug() {

        return new Promise((resolve, reject) => {


            resolve({Status: 1, EntityList: this.array});
        })

    }

    getAllReal() {
        return fetch('/AnimalFood')
            .then(response => response.json());
    }

    save(form) {
        debugger;

        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        };
      return  fetch('/AnimalFood', requestOptions)
            .then(response => response.json());
        /*return new Promise((resolve, reject) => {

            if (!form.Id) {
                this.array.push({Name: form.Name, Id: 1, PerUnitPrice: form.PerUnitPrice, Remain: form.Remain});

            }


            resolve({Status: 1});
        })*/
    }

    getAll() {


        if (MyGlobal.IsDebugEnvirement) {
            return this.getAllDebug();
        }
        return this.getAllReal();

    }


}