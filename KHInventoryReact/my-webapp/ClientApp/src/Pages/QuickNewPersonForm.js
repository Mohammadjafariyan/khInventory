import React, { Component } from "react";
import { showValidInvalidMsg } from "./IssueAssignment/SelectPerson";

export default class QuickNewPersonForm extends Component {
  constructor(props) {
    super(props);
    this.state = { person: {MilliCode:this.props.MilliCode}, miliCodeIsValid: false };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, valName) {
    this.state.person[valName] = event.target.value;

    if (!event.target.value || event.target.value.length !== 10) {
        this.state.person[valName+"IsValid"]=false;
    } else {
        this.state.person[valName+"IsValid"]=false;
    }
    this.setState({ rdm: Math.random() });

  }
  render() {
    return (
      <div>
        <div class="form-row">
          <div class="col-md-4 mb-3">
            <label for="validationServer01">نام و نام خانوادگی</label>
            <input
              type="text"
              class="form-control is-valid"
              id="validationServer01"
              placeholder="نام و نام خانوادگی"
              onChange={(e)=>{
                  this.handleChange(e,'Name')
              }}
              value={this.state.person.Name}
              required
            />

            {showValidInvalidMsg()}
          </div>
          <div class="col-md-4 mb-3">
            <label for="validationServer02">کد ملی </label>
            <input
              type="text"
              class="form-control is-valid"
              id="validationServer02"
              placeholder="کد ملی"
              onChange={(e)=>{
                  this.handleChange(e,'MilliCode')
              }}
              value={this.state.person.MilliCode}
              required
            />
            {showValidInvalidMsg()}

          </div>
          <div class="col-md-4 mb-3">
            <label for="validationServer02">شماره موبایل</label>
            <input
              type="text"
              class="form-control is-valid"
              id="validationServer02"
              placeholder="شماره موبایل"
              onChange={(e)=>{
                  this.handleChange(e,'Mobile')
              }}
              value={this.state.person.Mobile}              required
            />
            {showValidInvalidMsg()}
          </div>
        </div>
        <button onClick={()=>{

            if(this.props.saveCallback){
                this.props.saveCallback(this.state.person);
            }
        }}>شخص جدید</button>
      </div>
    );
  }
}
