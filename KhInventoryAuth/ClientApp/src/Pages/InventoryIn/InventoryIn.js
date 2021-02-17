import React, { Component } from 'react'
import BaseComponent from './../BaseComponent';
import { showValidInvalidMsg } from '../IssueAssignment/SelectPerson';
import AnimalFoodService from './../../service/AnimalFoodService';
import { DataHolder } from './../../service/DateHolder';
import { GlobalSiteSettingService } from './../../service/GlobalSiteSettingService';
import { numberWithCommas } from '../../service/Models';

export default class InventoryIn extends BaseComponent {
    componentDidMount() {
        this.loadAllAnimalFoods();
      //  this.loadAllPersonnel();
       // this.loadGlobalSiteSetting();
    
      }
      
    
      loadAllAnimalFoods(){
        let s=new AnimalFoodService();
        s.getAll().then(res=>{
          this.serverResponseEntityListCallback(res,'animalFoods');
    
          if (DataHolder.selectedAnimalFood) {
            this.state.form.AnimalFoodId=DataHolder.selectedAnimalFood.Id;
          }
    
        })
    }
  render() {
    return (
      <div className="row">

        <div className="col-md-6">
          <div class="form">
            <div class="col-md-6 ">
          
            {this.renderSelect(
             'AnimalFoodId',this.state.animalFoods,'Id','Name','نهاده')}
              
            </div>

            <div class="col-md-6 ">
              <label for="validationServer01">مبلغ هر کیلو (ریال)</label>
              <input
                type="text"
                class="form-control is-valid"
                id="validationServer01"
                placeholder="مبلغ هر کیلو"
               disabled
                value={this.state.form.PerUnitPrice}
                required
              />

              {showValidInvalidMsg()}
            </div>

            <div class="col-md-6 ">
              <label for="validationServer01">مبلغ کل (ریال)</label>
              <input
                type="text"
                class="form-control is-valid"
                id="validationServer01"
                placeholder="مبلغ کل"
                disabled
               
                value={this.state.form.TotalPrice}
                required
              />

              {showValidInvalidMsg()}
            </div>
          
            <div class="col-md-6 ">
            {this.renderSelect(
             'PersonId',this.state.persons,'Id','Name','مشتری')}
             
            </div>

            <button
              onClick={() => {
                if (this.props.saveCallback) {
                  this.props.saveCallback(this.state.form);
                }

                this.props.parent.setState({step:3});
              }}
            >
              صدور حواله
            </button>
          </div>
        </div>
        <div className="col-md-6">
        <div class="col-md-6 ">
              <label for="validationServer01">مقدار (کیلوگرم)</label>
              <input
                type="number"
                class="form-control is-valid"
                id="validationServer01"
                placeholder="چند کیلو گرم ؟"
                onChange={(e) => {
                  this.handleChange(e, "Quan");
                 this.updateTotalPrice(e);

                }}
                value={this.state.form.Quan}
                required
              />

              {showValidInvalidMsg()}
            </div>
              <div class="col-md-6 ">
              <label for="validationServer02">بابت فیش</label>
              <input
                type="text"
                class="form-control is-valid"
                id="validationServer02"
                placeholder="کد ملی"
                onChange={(e) => {
                  this.handleChange(e, "BankFish");
                }}
                value={this.state.form.BankFish}
                required
              />
              {showValidInvalidMsg(this.state.BankFishIsValid)}
            </div>
            <div class="col-md-6 ">
              <label for="validationServer02">توضیحات</label>
              <textarea
                type="text"
                class="form-control is-valid"
                id="validationServer02"
                placeholder="توضیحات"
                onChange={(e) => {
                  this.handleChange(e, "Description");
                }}
                value={this.state.form.Description}
                required
              />
              {showValidInvalidMsg(this.state.DescriptionIsValid)}
            </div>
        </div>
      </div>
    );
  }
}
