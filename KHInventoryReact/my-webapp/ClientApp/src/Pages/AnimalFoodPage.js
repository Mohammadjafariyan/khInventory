import React, { Component } from "react";
import DynamicForm from "../components/DynamicForm";
import { servicesVersion } from "typescript";
import AnimalFoodService from './../service/AnimalFoodService';
import { numberWithCommas } from "../service/Models";

export default class AnimalFoodPage extends Component {
   animalFoodService=new AnimalFoodService();
 
   constructor(props) {
    super(props);
    this.state = { };

  }

  getConfig() {
    let config = {
      formClass: "form-row",
      buttonName: "ثبت",
      buttonId: "Save",
      buttonCallback: (form, history) => {
        //  history.push('/InventoryStatus')

        this.save();
      },
      buttonClass: "btn btn-primary",
      fields: [
        {
          name: "Name",
          placeholder: "نام نهاده",
          title: "نام نهاده",
          type: "text",
          required: true,
          col: "col-md-6",
        },
        {
          name: "Remain",
          placeholder: "مقدار اولی",
          title: "مقدار اولیه",
          type: "number",
          required: true,
          col: "col-md-6",
        },
        {
          name: "PerUnitPrice",
          placeholder: "قیمت هر کیلو (ریال)",
          title: "قیمت هر کیلو (ریال)",
          type: "money",
          required: true,
          col: "col-md-6",
        },
        {
          name: "PerCustomerTotalMalQouta",
          placeholder: "کیلو برای هر گاو و گاومیش",
          title: "کیلو برای هر گاو و گاومیش",
          type: "number",
          required: true,
          col: "col-md-6",
        },
        
        {
          name: "Image",
          placeholder: "تصویر",
          title: "تصویر",
          type: "file",
          required: true,
          col: "col-md-6",
        },
      ],
    };
    return config;
  }

  save(){
    let form=this.childDynamicFormComponentReference.getState().form;

    if(!form.Name){
      alert('نام وارد نشده است');
      return;
    }
    if(form.Remain==null){
      form.Remain=0;
    }
    
    if( !this.state.editing && form.Remain==null){
      alert('مقدار وارد نشده است');
      return;
    }

    this.childDynamicFormComponentReference.resetForm();


    this.animalFoodService.save(form).then(res=>{

      if(res.Status===1){

        this.readAllFoods();
      }else{
        alert(res.Message);
      }


    });

  }

  componentWillMount(){
    this.readAllFoods();
  }


  readAllFoods(){

    return this.animalFoodService.getAll().then(res=>{
      if(res.Status==1){
        this.setState({animalFoods:res.EntityList});
      }else{
        alert(res.Message);
      }
    });

  }
  childDynamicFormComponentReference;

  render() {
    let config = this.getConfig();
    return (
      <div className="row">
        <div className="col-md-12" data-testid="addForm">
          <DynamicForm
            config={config}
            setParent={this}
            setParentName="childDynamicFormComponentReference"
          />
        </div>

        <div className="col-md-12">
          <table class="table" data-testid="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">نام</th>
                <th scope="col">موجودی</th>
                <th scope="col">کیلو برای هر گاو و گاومیش</th>
                <th scope="col">قیمت واحد</th>
                
                <th scope="col">عملیات</th>
              </tr>
            </thead>
            <tbody data-testid="rows">{this.showRows()}</tbody>
          </table>
        </div>
      </div>
    );
  }
  showRows() {
    if (!this.state.animalFoods) {
      return <></>;
    }

    return this.state.animalFoods.map((val, i, arr) => {
      return (
        <tr key={val.Id}>
          <th scope="row">{val.Id}</th>
          <td>{val.Name}</td>
          <td>{val.Remain}</td>
          <td>{val.PerCustomerTotalMalQouta}</td>
          
          <td style={{direction:'rtl'}}>  {numberWithCommas(val.PerUnitPrice)}   ریال</td>
          <td><button className="btm btn-info" 
           onClick={()=>this.edit(val)}>ویرایش</button></td>
        </tr>
      );
    });
  }


  edit(val){

    
    this.childDynamicFormComponentReference.setState({form:val});
  }
}
