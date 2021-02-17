import React, { Component } from "react";
import DynamicForm from "./../../components/DynamicForm";
import AnimalFoodService from "./../../service/AnimalFoodService";
import { numberWithCommas } from "../../service/Models";
import AnimalFoodBuyService from "./../../service/AnimalFoodBuyService";
import { globalStylesheet } from './../../components/GlobalCss';

export default class BuyAnimalFood extends Component {
  constructor(props) {
    super(props);
    this.state = { animalFoods: {} };
  }

  getAnimalFoods() {
    return this.state.animalFoods;
  }
  readAllAnimalFoods() {
    let s = new AnimalFoodService();
    return s.getAll().then((res) => {
      if (res.Status == 1) {
        this.setState({ animalFoods: res.EntityList });
      } else {
        alert(res.Message);
      }
    });
  }

  componentDidMount() {
    this.readAllAnimalFoods();
  }

  /* ,
          onchange:(e,val,dynamicForm)=>{
  
            let formState= dynamicForm.getState();
      let totalValue=parseInt(formState.form.PerUnitPrice)*parseInt((formState.form.Quan ? formState.form.Quan:0));
  
      formState.form.TotalPrice=totalValue;
  
  
      dynamicForm.setState({td:Math.random()});
          } */

  updatePrices(dynamicForm) {
    if (!dynamicForm.getState())
      throw new Error("dynamicForm.getState() is null");
    if (!dynamicForm.getState().form)
      throw new Error("dynamicForm.getState().form is null");

    let AnimalFoodId = parseInt(dynamicForm.getState().form.AnimalFoodId);

    if (!AnimalFoodId)
    {
      alert('لطفا ابتدا نهاده را انتخاب نمایید');
      return;
    }

    if (!AnimalFoodId) throw new Error("AnimalFoodId is null");

    // از بین لیست پیداکن
    let animalFood = this.state.animalFoods.find((f) => f.Id == AnimalFoodId);

    if (!animalFood) throw new Error("animalFood is null");
    if (!dynamicForm.getState().form)
      throw new Error("dynamicForm.form is null");

    // واحد آن را استخراج کن  به ورودی فرم بزن
    dynamicForm.getState().form.PerUnitPrice = animalFood.PerUnitPrice;
    dynamicForm.getState().form.PerUnitPriceMoney = numberWithCommas(
      animalFood.PerUnitPrice
    );

    let quan = dynamicForm.getState().form.Quan
      ? dynamicForm.getState().form.Quan
      : 0;

    // قیمت کل را محاسبه کن
    let totalPrice = animalFood.PerUnitPrice * quan;

    dynamicForm.getState().form.TotalPrice = totalPrice;
    dynamicForm.getState().form.TotalPriceMoney = numberWithCommas(totalPrice);

    dynamicForm.setState({ bdn: Math.random() });
  }

  validation(dynamicForm) {
    let form = dynamicForm.getState().form;
    if (
      !form.Quan ||
      !form.AnimalFoodId ||
      !form.PerUnitPrice ||
      !form.TotalPrice
    ) {
      alert(
        "مقادیر اشتباه است لطفا فرم را چک ، و موارد اشتباه را اصلاح فرمایید"
      );
      return false;
    }

    if((form.Quan+"").length>5){
      alert(
        "مقدار بیشتر از 5 رقم مجاز نیست"
      );
      return false;
    }
    return true;
  }

  save(form, history) {
    let s = new AnimalFoodBuyService();
    form.DateTime=new Date();
    return s
      .save(form)
      .then((res) => {
        debugger;
        if (res.Status === 1) {
          // success
          history.push("/InventoryStatus");
          
        } else {
          alert(res.Message);
        }
      })
      .catch((re) => {
        console.error(re);
        alert("خطایی رخ داد");
      });
  }
  getConfig() {
    let config = {
      formClass: "form-row",
      buttonName: "ثبت",
      buttonId: "submitBuyAnimalFood",
      buttonClass: "btn btn-primary",
      buttonCallback: (dynamicForm, history) => {
        let isValid = this.validation(dynamicForm);

        if (isValid) {
          this.save(dynamicForm.state.form,history);
        }
      },
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
          onchange: (e, val, dynamicForm) => {
            this.updatePrices(dynamicForm);
          },
        },
        {
          name: "Quan",
          placeholder: "مقدار",
          title: "مقدار (کیلوگرم)",
          type: "number",
          max:5,
          required: true,
          col: "col-md-6",
          onchange: (e, val, dynamicForm) => {
            this.updatePrices(dynamicForm);
          },
        },
        {
          name: "PerUnitPrice",
          placeholder: "قیمت هر کیلو",
          title: "قیمت هر کیلو",
          type: "money",
          required: true,
          disabled: true,
          col: "col-md-6",
        },
        {
          name: "TotalPrice",
          placeholder: "مبلغ کل",
          title: "مبلغ کل",
          type: "money",
          required: true,
          disabled: true,
          col: "col-md-6",
        },

        {
          name: "Fish",
          placeholder: "شماره فیش بانک",
          title: "شماره فیش بانک",
          type: "text",
          required: true,
          col: "col-md-6",
        },
        {
          name: "Description",
          placeholder: "توضیحات",
          title: "توضیحات",
          type: "textarea",
          required: true,
          col: "col-md-6",
        },
      ],
    };
    return config;
  }
  render() {
    let config = this.getConfig();
    return (
      <>

<h4 style={globalStylesheet.center}>خرید نهاده  (ورود نهاده به انبار )</h4>
      <div className="row">
      

        <DynamicForm config={config} />
      </div>
      </>
    );
  }
}
