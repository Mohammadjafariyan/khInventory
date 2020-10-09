import React, { Component } from "react";
import AnimalFoodService from "./../../service/AnimalFoodService";
import { Route } from 'react-router';
import { DataHolder } from './../../service/DateHolder';
import { renderOneAnimalFood } from "../InventoryStatus/InventoryStatus";
import { globalStylesheet } from './../../components/GlobalCss';

export default class SelectAnimalFood extends Component {
  constructor(props) {
    super(props);
    this.state = { foods: [] };
  }

  componentWillMount(){

    this.readAllAnimalFood();
  }

  readAllAnimalFood() {
    let s = new AnimalFoodService();
    s.getAll().then((res) => {
        if(res.Status==1){
            this.setState({ foods: res.EntityList });

        }else{
            alert(res.Message)
        }
      
    }).catch(e=>{
        alert('خطا در سیستم')
    });
  }

  showAnimalFoods() {
    if (!this.state.foods) {
      return <></>;
    }

    return this.state.foods.map( (val, i, arr) =>{
      return <Route render={({ history}) => (



        renderOneAnimalFood( val,() => { 

DataHolder.selectedAnimalFood=val;

this.props.parent.setState({step:1,AnimalFoodId:val.Id});
},this)
        
      )} />
      
    });
  }

  render() {
    return <>
    <h5>لطفا نهاده مورد نظر خود را انتخاب نمایید</h5>
    {this.state.errMsg && <div style={globalStylesheet.center} className="alert alert-danger">
            {this.state.errMsg }
        </div>
      }

    <div className="row">
    
    
    {this.showAnimalFoods()}</div>
    </>;
  }
}
