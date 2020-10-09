


export class IssueAssignmentService {


    getAnimalFoodAndPersonQuota(foodId,personId){
        return  fetch(`/IssueAssignment/getAnimalFoodAndPersonQuota?foodId=${foodId}&personId=${personId}`)
            .then(response => response.json());
    }

getAllByAnimalFoodId(animalFoodId,page,size){
    return  fetch(`/IssueAssignment/getAllByAnimalFoodId?animalFoodId=${animalFoodId}&take=${page}&skip=${size}`)
    .then(response => response.json());
}


    save(form){

        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        };
        return  fetch('/IssueAssignment/Issue', requestOptions)
            .then(response => response.json());
        
        /*return new Promise((resolve, reject) => {
            



    
            resolve({Status:1});
            })*/



    }


}