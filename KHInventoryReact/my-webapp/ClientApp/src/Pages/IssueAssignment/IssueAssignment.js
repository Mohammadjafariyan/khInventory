

import React, { Component, useState } from 'react'
import SelectAnimalFood from './SelectAnimalFood'
import SelectPerson from './SelectPerson';
import Assignment from './Assignment';
import { DataHolder } from './../../service/DateHolder';
import PrintAssignment from './PrintAssignment';
import WarehouseInventory from './../WarehouseInventory';

export default class IssueAssignment extends Component {

    constructor(props) {
        super(props);
        this.state = { step:0 };
      }
    render() {
        return (
            <div>
            <h3>صدور حواله (خروج از انبار) </h3>
            
<WarehouseInventory/>
      <hr/>

                {this.state.step==0 &&  <SelectAnimalFood parent={this}/>}
                {this.state.step==1 && this.state.AnimalFoodId
                 &&  <SelectPerson parent={this}/>}

                 {this.state.step==2 && this.state.AnimalFoodId 
                && DataHolder.selectedPerson.Name
                 &&  <Assignment parent={this}/>}

                 {this.state.step==3 && this.state.AnimalFoodId 
                && DataHolder.selectedPerson.Name
                 &&  <PrintAssignment parent={this}/>}
                 
            </div>
        )
    }
}
