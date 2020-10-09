import React, { Component } from 'react'
import { showValidInvalidMsg } from './IssueAssignment/SelectPerson';
import { numberWithCommas } from '../service/Models';

export default class BaseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { form: {}, miliCodeIsValid: false };
    
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(event, valName,isMoney) {

        let value=event.target ? event.target.value : event;
        this.state.form[valName] =  value;
    

        if(isMoney){
            this.state.form[valName]=numberWithCommas(this.state.form[valName]);
        }

        if (!value || value.length !== 10) {
            this.state.form[valName+"IsValid"]=false;
        } else {
            this.state.form[valName+"IsValid"]=false;
        }
        this.setState({ rdm: Math.random() });
    
      }


      serverResponseEntityListCallback(res,name){
        let temp={};
        temp[name]=res.EntityList;

      if(res.Status==1){

          this.setState(temp)
      }else{
          alert(res.Message);
      }

    }

    serverResponseSingleCallback(res,name){
        let temp={};
        temp[name]=res.Single;

      if(res.Status==1){

          this.setState(temp)
      }else{
          alert(res.Message);
      }

    }


    renderSelect(propertyName,optionList,id_prop,title_p,title,onchangeCallback){

if (!optionList) {
    return <p>لیست لود نشد</p>;
    
}

        return <>
              <label for="validationServer01">{title}</label>

            <select class="custom-select" required  
             onChange={(e) => {
                  this.handleChange(e, propertyName);

                  if(onchangeCallback){
                let val=  optionList.find(el=>el[id_prop]+""===e.target.value);

                      onchangeCallback(e,val)
                  }
                }}>
        <option value="">انتخاب نمایید</option>
       {optionList.map((val,i,arr)=>{

           if(val[id_prop]===this.state.form[propertyName]){
            return  <option selected="selected" value={val}>{val[title_p]}</option>

           }else{
            return  <option value={val[id_prop]}>{val[title_p]}</option>

           }
       })}
      </select>
            {showValidInvalidMsg(this.state.form[propertyName+'IsValid'],'درست نیست')}

        </>
    }
}
