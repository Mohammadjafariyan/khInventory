

import React, { Component } from 'react'
import AnimalFoodBuyService from './../service/AnimalFoodBuyService';
import { globalStylesheet } from './../components/GlobalCss';
import { numberWithCommas } from '../service/Models';
import { pagingComponent } from './paging';
import { pupuHiComponent } from './pupuHiComponent';
import { DataHolder } from '../service/DateHolder';

export default class BuyAnimalFoodList extends Component {
    
    constructor(props){
        super(props);

        this.state={list:[],LastTake:0,LastSkip:0};
        


    }

    readAndSet(LastTake,LastSkip){
      this.readAnimalFoodList(LastTake,LastSkip)
      .then((res) => {
        if (res.Status == 1) {
          //success
          this.setState({ list: res.EntityList,Total: res.Total ,
            LastTake: res.LastTake,LastSkip: res.LastSkip});

        } else {
          alert(res.Message);
        }
      })
      .catch((e) => {
        console.error(e);
        alert("خطایی رخ داد");
      });
    }
    componentDidMount() {
    this.readAndSet(this.state.LastTake,this.state.LastSkip);
  }

  pagingCallback(take,skip){

    this.setState({LastSkip:skip,LastTake:take});
    debugger;
    this.readAndSet(take,skip);
  }

  readAnimalFoodList(LastTake,LastSkip) {
    let  animalFoodId  = DataHolder.selectedAnimalFood ? DataHolder.selectedAnimalFood.Id : null;


    debugger;
    let s = new AnimalFoodBuyService();
    return s.getAll( animalFoodId,LastTake,LastSkip);
  }
  render() {
    return ( 
      <div>
      <h3 style={globalStylesheet.center}> لیست خرید ها</h3>
          {DataHolder.selectedAnimalFood && DataHolder.selectedAnimalFood.Name &&
          <h4 style={{textAlign:'right'}}>نهاده انتخاب شده : {DataHolder.selectedAnimalFood.Name}</h4>}
        <table className="table table-bordered">
          <thead>
              <tr>
                  <th>ردیف</th>
                  <th>نوع نهاده</th>
                  <th>قیمت هر کیلو</th>
                  <th>مقدار(کیلوگرم)</th>
                  <th>مبلغ کل</th>
                  <th>شماره فیش</th>
                  <th>توضیحات</th>
                  <th>تاریخ ثبت خرید</th>
              </tr>
          </thead>
          <tbody>
            {this.state.list &&
              this.state.list.map((val, i, arr) => {
                return <tr>
                <td>{i+1}</td>
                    <td>{val.AnimalFood.Name}</td>
                    <td>{numberWithCommas(val.AnimalFood.PerUnitPrice)} ریال</td>
                    <td>{val.Quan}</td>
                    <td>{numberWithCommas(val.TotalPrice)} ریال</td>
                    <td>{val.Fish}</td>
                    <td>{val.Description}</td>
                    <td>{val.DateTimeIR}</td>
                </tr>;
              })}

              <tr>
              <td colSpan="66">
             
              {pagingComponent( this.state.Total,this.state.LastTake,this.state.LastSkip,this,'pagingCallback')}
             
              
              </td>

              </tr>
          </tbody>
        </table>

        <pupuHiComponent/>
      </div>
    );
  }
}
