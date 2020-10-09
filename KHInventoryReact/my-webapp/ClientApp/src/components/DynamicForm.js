import React, { Component } from "react";
import { showValidInvalidMsg } from "../Pages/IssueAssignment/SelectPerson";
import { numberWithCommas } from "../service/Models";
import { Route } from "react-router-dom";

export default class DynamicForm extends Component {
  constructor(props) {
    super(props);

    let resetButtonId =this.props.resetButtonId? this.props.resetButtonId:'resetButton';
    this.state = { form: {} ,resetButtonId: resetButtonId};

    this.handleChange = this.handleChange.bind(this);
    
  }


  resetForm(){

    document.getElementById(this.state.resetButtonId).click();

  }

  getState() {
    return this.state;
  }

  handleChange(event, valName, isMoney, field) {
    let value = event.target ? event.target.value : event;
    this.state.form[valName] =field.type === "select" ||field.type === "number" || field.type === "money" ?parseInt(value) : value   ;

    if (isMoney) {
      this.state.form[valName + "Money"] = " ریال "+ numberWithCommas(value) ;
    }

    //validation
    this.validation(field, event.target.value);

    this.setState({ rdm: Math.random() });
  }


  componentWillMount(){
    if(this.props.setParent){
      this.props.setParent[this.props.setParentName]=this;
    }
  }

  validation(field, value) {
    if (!value) {
      this.state[field.name + "IsValid"] = false;
    } else {
      this.state[field.name + "IsValid"] = true;
    }
  }

  render() {
    let config = this.props.config;
    return (
      <>
       <div className="col-md-12" style={{margin:'20px'}}>
       <form className={config.formClass}>{this.renderFields(config)}
       
       
      
      <div className="col-md-12">
      <button id={this.state.resetButtonId} onClick={()=>
      
      this.setState({form:{}})
      } type="reset" class="btn btn-info">پاک کردن فرم</button>

<Route
  render={({ history }) => (
    <button
onClick={() => {  config.buttonCallback(this, history) }}
      data-testid={config.buttonId}
      type="button"
      className={config.buttonClass}
    >
      {config.buttonName}
    </button>
  )}
/>
      </div>
       
       </form>



       </div>
      </>
    );
  }
  renderSelect(
    propertyName,
    optionList,
    id_prop,
    title_p,
    title,
    onchangeCallback,
    field
  ) {
    if (!optionList) {
      return <p>لیست لود نشد</p>;
    }

    return (
      <>
        <label>{title}</label>

        <select
          data-testid={field.name}
          disabled={field.disabled}
          className={this.getFieldClass({ name: propertyName })}
          required={field.required}
          onChange={(e) => {
            this.handleChange(e, propertyName, false, field);

            if (onchangeCallback) {
            //  let val = optionList.find(
            ///    (el) => el[id_prop] + "" === e.target.value
            //  );

              onchangeCallback(e, null, this.state);
            }
          }}
        >
          <option value="">انتخاب نمایید</option>
          {optionList &&
            optionList.length &&
            optionList.map((val, i, arr) => {
              if (val[id_prop] === this.state.form[propertyName]) {
                return (
                  <option selected="selected" value={val[id_prop]} key={val[id_prop]}>
                    {val[title_p]}
                  </option>
                );
              } else {
                return <option value={val[id_prop]}>{val[title_p]}</option>;
              }
            })}
        </select>



        {showValidInvalidMsg(
          this.state.form[propertyName + "IsValid"],
          "درست نیست",
          propertyName
        )}
      </>
    );
  }

  getFieldClass(field) {
    let cls = "form-control";

    if (this.state[field.name + "IsValid"] === true) {
      cls += " " + "is-valid";
    } else if (this.state[field.name + "IsValid"] === false) {
      cls += " " + "is-invalid";
    } else {
    }

    return cls;
  }

  renderFields(config) {
    return config.fields.map((field, i, arr) => {
      switch (field.type) {
        case "file":
 return <div className={field.col ? field.col : "col-md-6"}>
              <label>{field.title}</label>
              <input
              maxLength={field.max}
                type='file'
                accept='image/*'
                className={this.getFieldClass(field)}
                placeholder={field.placeholder}
                onChange={(e) => {

                  readFileToByteArr(e,(bytearr)=>{

                    let showImg=  bytearr;

this.state.form[field.name]=showImg;
                    this.setState({sfds:Math.random()})
                  });
                 
                }}
                required={field.required}
                data-testid={field.name}
                disabled={field.disabled}
              />

              {this.state.form[field.name] && 
              <img src={this.state.form[field.name]}  width='150' height='150'/>}
              {showValidInvalidMsg(
                this.state[field.name + "IsValid"],null,
                field.name
              )}
              </div>
break;
        case "text":
        case "money":
        case "number":
          return (
            <div className={field.col ? field.col : "col-md-6"}>
              <label>{field.title}</label>
              <input
              maxLength={field.max}
                type={field.type === "text" ? "text" : "number"}
                className={this.getFieldClass(field)}
                placeholder={field.placeholder}
                onChange={(e) => {
                  if (field.type === "money") {
                    this.handleChange(e, field.name, true, field);
                  } else {
                    this.handleChange(e, field.name, false, field);
                  }

                  if (field.onchange) {
                    field.onchange(e, null, this);
                  }
                }}
                value={this.state.form[field.name]}
                required={field.required}
                data-testid={field.name}
                disabled={field.disabled}
              />
              {showValidInvalidMsg(
                this.state[field.name + "IsValid"],null,
                field.name
              )}

              {field.type === "money" && (
                <span data-testid={field.name + "Money"} style={{direction:'ltr'}}>
                  {this.state.form[field.name + "Money"]}
                </span>
              )}
            </div>
          );
        case "select":
          return (
            <div className={field.col ? field.col : "col-md-6"}>
              {this.renderSelect(
                field.name,
                field.options,
                "Id",
                "Name",
                "نهاده",
                (e, val) => {
                  if (field.onchange) {
                    field.onchange(e, null, this);
                  }
                },
                field
              )}
              {showValidInvalidMsg(
                this.state[field.name + "IsValid"],null,
                field.name
              )}
            </div>
          );

        case "textarea":
          return (
            <div className={field.col ? field.col : "col-md-6"}>
              <label>{field.title}</label>
              <textarea
                disabled={field.disabled}
                data-testid={field.name}
                type="text"
                className={this.getFieldClass(field)}
                placeholder={field.placeholder}
                onChange={(e) => {
                  if (field.type === "money") {
                    this.handleChange(e, field.name, true, field);
                  } else {
                    this.handleChange(e, field.name, false, field);
                  }

                  if (field.onchange) {
                    field.onchange(e, null, this);
                  }
                }}
                value={this.state.form[field.name]}
                required={field.required}
              />
              {showValidInvalidMsg(
                this.state[field.name + "IsValid"],null,
                field.name
              )}
            </div>
          );

        default:
          return <></>;
      }
    });
  }
}


function readFileToByteArr(e,callback){
  if(!e.target.files || e.target.files.length==0 )
  return ;
  var reader = new FileReader();
var fileByteArray = [];
debugger; 
reader.readAsDataURL(e.target.files[0]);
reader.onloadend = function (evt) {
    if (evt.target.readyState == FileReader.DONE) {
     /*   var arrayBuffer = evt.target.result,
           array = new Uint8Array(arrayBuffer);
       for (var i = 0; i < array.length; i++) {
           fileByteArray.push(array[i]);
        } */

        callback(evt.target.result);
    }

    
}
}