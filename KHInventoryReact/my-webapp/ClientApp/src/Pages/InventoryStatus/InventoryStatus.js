import React, { Component } from "react";
import AnimalFoodService from "./../../service/AnimalFoodService";
import { Route } from 'react-router';
import IssueAssignment from './../IssueAssignment/IssueAssignment';
import { DataHolder } from "../../service/DateHolder";
import { globalStylesheet } from "../../components/GlobalCss";

export default class InventoryStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.readAllAnimalFoods();
  }

  readAllAnimalFoods() {
    let s = new AnimalFoodService();
    s.getAll().then((res) => {
      if (res.Status === 1) {
        this.setState({ animalfoods: res.EntityList });
      } else {
        alert(res.Message);
      }
    });
  }

  render() {
    return (
      <div>
    <h3 style={globalStylesheet.center}>وضعیت انبار</h3>
        <span style={{ display: "none" }} data-testid="InventoryStatus">
          InventoryStatus
        </span>

     
        <div data-testid="animalfood-list" className="row">
          {this.renderAnimalFoods()}
        </div>
      </div>
    );
  }

  renderAnimalFoods() {
    if (!this.state.animalfoods) {
      return <></>;
    }

    return this.state.animalfoods.map((val, i, arr) => {
      return renderOneAnimalFood(val);
    });
  }
}

export const renderOneAnimalFood = (animalFood, callback,parent) => {
  return (
    <div className="col-md-4">

      <div class="card">
        <div class="card-body">
          <h5 class="card-title"> {animalFood.Name}</h5>
        {/*   <h6 class="card-subtitle mb-2 text-muted">
            باقی مانده {animalFood.Remain} کیلوگرم
          </h6> */}


          <img src={animalFood.Image} width='150' height='150'/>
          
          <p class="card-text">
            باقی مانده {animalFood.Remain} کیلوگرم

          </p>
          {/*     <p class="card-text">کیلو گرم {animalFood.Remain} باقی مانده</p>
           */}{" "}


           {!callback &&

           <>
           <Route
  render={({ history }) => (
    <button
onClick={() => {  
  DataHolder.selectedAnimalFood=animalFood;
history.push('/IssueAssignmentList')

 }}
      data-testid='IssueAssignmentList'
      type="button"
      className='btn btn-primary'
    >

    حواله ها 
    </button>
  )}
/>

<Route
  render={({ history }) => (
    <button
onClick={() => { 
  DataHolder.selectedAnimalFood=animalFood;
history.push('/BuyAnimalFoodList')
  }}
data-testid='AnimalFoodBuyList'
      type="button"
      className='btn btn-primary'
    >

    خرید ها 
    </button>
  )}
/>
</>
           }

           {callback && <button
            data-testid={"food-" + animalFood.Name}
            style={{ color: "white" }} 
            type='button'
            className="card-link btn btn-primary"
            onClick={() => {
             
             if(!animalFood.Remain || animalFood.Remain<=0){
               parent.setState({errMsg:'از این نهاده در انبار موجود نیست'});
               alert('از این نهاده در انبار موجود نیست ')
               return;
             }
             parent.setState({errMsg:null});

              callback();
            }}
          >
            انتخاب
          </button> }
          
        </div>
      </div>
    </div>
  );
};
