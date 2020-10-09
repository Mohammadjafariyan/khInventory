

export default class DummyEggListService{

    

    getAll(){
        return new Promise((resolve, reject) => {

            let arr=[];

            for (let i = 0; i < 10; i++) {

                arr.push({Name:'EggName-'+i,Id:Math.random()})

            }
            resolve(arr);

        })
        
    }

}