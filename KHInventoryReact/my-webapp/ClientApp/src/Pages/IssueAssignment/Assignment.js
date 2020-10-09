import React, { Component } from "react";
import { showValidInvalidMsg } from "./SelectPerson";
import BaseComponent from "./../BaseComponent";
import AnimalFoodService from "./../../service/AnimalFoodService";
import { PersonService } from "./../../service/PersonService";
import { GlobalSiteSettingService } from "./../../service/GlobalSiteSettingService";
import { numberWithCommas } from "../../service/Models";
import { DataHolder } from "./../../service/DateHolder";
import DynamicForm from "../../components/DynamicForm";
import IssueAssignment from "./IssueAssignment";
import { IssueAssignmentService } from "../../service/IssueAssignmentService";

export default class Assignment extends BaseComponent {
  componentDidMount() {
    this.loadAllAnimalFoods().then(s=>{

      this.loadAllPersonnel().then(s2=>{
        
        this.loadExactKg();
      }).catch(s2=>{
        this.loadExactKg();

      });


    }).catch(s=>{
      this.loadExactKg();

    });


    
    
    
    
 //   this.loadGlobalSiteSetting();
  }
  
  loadExactKg(){
    if (DataHolder.selectedAnimalFood && DataHolder.selectedPerson) {

      this.getAnimalFoodAndPersonQuota(
          DataHolder.selectedAnimalFood.Id,
          DataHolder.selectedPerson.Id
      );

    }
  }

  childDynamicFormComponentReference;

  loadAllAnimalFoods() {
    let s = new AnimalFoodService();
   return  s.getAll().then((res) => {
      this.serverResponseEntityListCallback(res, "animalFoods");

      if (DataHolder.selectedAnimalFood) {
        let form = this.childDynamicFormComponentReference.getState().form;

        
        form.AnimalFoodId = DataHolder.selectedAnimalFood.Id;

        form.PerUnitPrice = DataHolder.selectedAnimalFood.PerUnitPrice;

        form.PerUnitPriceMoney = numberWithCommas(
          DataHolder.selectedAnimalFood.PerUnitPrice
        );

        this.childDynamicFormComponentReference.setState({
          form: form,
          td: Math.random(),
        });
      }
    });
  }

  loadAllPersonnel() {
    let s = new PersonService();
   return s.getAll().then((res) => {
      this.serverResponseEntityListCallback(res, "persons");

      debugger;
      if (DataHolder.selectedPerson) {
        let form = this.childDynamicFormComponentReference.getState().form;

        form.PersonId = DataHolder.selectedPerson.Id;

        this.childDynamicFormComponentReference.setState({
          form: form,
          td: Math.random(),
        });
      }
    });
  }

  save(dynamicForm, history) {
    let form = dynamicForm.getState().form;
    if (
      !form.AnimalFoodId ||
      !form.PersonId ||
      !form.PerUnitPrice ||
      !form.Quan ||
      !form.TotalPrice
    ) {
      alert("مقادیر اشتباه است لطفا مقادیر درست وارد نمایید");
      return;
    }

    
    if((form.Quan+"").length>5){
      alert(
        "مقدار بیشتر از 5 رقم مجاز نیست"
      );
      return false;
    }
    try {
      parseInt(form.Quan);
    } catch (e) {
      alert("مقادیر اشتباه است لطفا مقادیر درست وارد نمایید");
      return;
    }

    let s = new IssueAssignmentService();


    s.save(form)
      .then((res) => {
        if (res.Status === 1) {
         // this.state.form["Id"]=res.Single;
          debugger;
          DataHolder.selectedIssueAssignment = res.Single;
          history.push('/PrintIssueAssignment')

          //history.push("/InventoryStatus");
        } else {
          alert(res.Message);
        }
      })
      .catch((e) => {
        alert("به اینترنت متصل نیستید");
      });
  }

  getConfig() {
    let config = {
      formClass: "form-row",
      buttonName: "صدور حواله",
      buttonId: "submitIssueAssignment",
      buttonCallback: (form, history) => {
        this.save(form, history);
      },
      buttonClass: "btn btn-primary",
      fields: [
        {
          name: "AnimalFoodId",
          placeholder: "نوع نهاده",
          title: "نهاده",
          type: "select",
          options: this.state.animalFoods,
          nameField: "Name",
          valueField: "Id",
          required: true,
          col: "col-md-6",
        },
        {
          //      {this.renderSelect(
          // 'PersonId',this.state.persons,'Id','Name','مشتری')}
          name: "PersonId",
          placeholder: "مشتری",
          title: "مشتری",
          type: "select",
          required: true,
          options: this.state.persons,
          nameField: "Name",
          valueField: "Id",
          col: "col-md-6",
        },
        {
          name: "PerUnitPrice",
          placeholder: "مبلغ هر کیلو (ریال)",
          title: "مبلغ هر کیلو (ریال)",
          type: "money",
          disabled: true,
          required: true,
          col: "col-md-6",
        },

        {
          name: "Quan",
          placeholder: "مقدار (کیلوگرم)",
          title: "مقدار (کیلوگرم)",
          type: "number",
          required: true,
          col: "col-md-6",
          onchange: (e, val, dynamicForm) => {
            this.updateFormAfterQuan(dynamicForm)
          },
        },
        {
          name: "TotalPrice",
          placeholder: "مبلغ کل (ریال)",
          title: "مبلغ کل (ریال)",
          type: "money",
          disabled: true,
          required: true,
          col: "col-md-6",
        },
        {
          name: "BankFish",
          placeholder: "شماره فیش واریزی",
          title: "شماره فیش واریزی",
          type: "text",
          required: false,
          col: "col-md-6",
        },
        {
          name: "Description",
          placeholder: "توضیحات",
          title: "توضیحات",
          type: "textarea",
          required: false,
          col: "col-md-6",
        },
      ],
    };
    return config;
  }

  loadGlobalSiteSetting() {
    let s = new GlobalSiteSettingService();
    s.getAll().then((res) => {
      this.serverResponseSingleCallback(res, "setting");
    });
  }

  render() {
    let config = this.getConfig();
    return (
      <div className="row">
        <DynamicForm
          config={config}
          setParent={this}
          setParentName="childDynamicFormComponentReference"
        />
      </div>
    );
  }

  updateTotalPrice(e) {
    if (this.state.form.PerUnitPrice) {
      let value =
        this.state.form.PerUnitPrice *
        parseInt(this.state.form.Quan ? this.state.form.Quan : 0);
      debugger;
      this.handleChange(value, "TotalPrice", true);
      this.handleChange(this.state.form.PerUnitPrice, "PerUnitPrice", true);
    }
  }

  getAnimalFoodAndPersonQuota(foodId, personId) {

    let s = new IssueAssignmentService();


    s.getAnimalFoodAndPersonQuota(foodId,personId)
        .then((res) => {
          if (res.Status === 1) {

            let form = this.childDynamicFormComponentReference.getState().form;
            
            form["Quan"]=res.Single.Kg;

            this.childDynamicFormComponentReference.setState({
              form: form,
              td: Math.random(),
            });
            
            /*ویرایش اطلاعات فرم بعد از زدن کلیلوگرم*/
            this.updateFormAfterQuan(this.childDynamicFormComponentReference)

          } else {
            alert(res.Message);
          }
        })
        .catch((e) => {
          alert("به اینترنت متصل نیستید");
        });
  }

  updateFormAfterQuan(dynamicForm) {
    let formState = dynamicForm.getState();
    let totalValue =
        parseInt(formState.form.PerUnitPrice) *
        parseInt(formState.form.Quan ? formState.form.Quan : 0);

    formState.form.TotalPrice = totalValue;

    formState.form.TotalPriceMoney = numberWithCommas(totalValue);

    dynamicForm.setState({ td: Math.random() });
  }
}
