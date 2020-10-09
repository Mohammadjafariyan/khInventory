import React, { Component } from "react";
import { PersonService } from "./../../service/PersonService";
import { Route } from "react-router";
import QuickNewPersonForm from "./../QuickNewPersonForm";
import { DataHolder } from "./../../service/DateHolder";
import { MyGlobal } from "./../../service/Models";

export default class SelectPerson extends Component {
  constructor(props) {
    super(props);
    this.state = { persons: [], value: "", miliCodeIsValid: false };

    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillMount() {
      this.refreshPersons('');

  }

    refreshPersons(vl) {
    let s = new PersonService();

    s.getAll(vl)
      .then((res) => {
        if (res.Status == 1) {
          this.setState({ persons: res.EntityList });
        } else {
          alert(res.Message);
        }
      })
      .catch((e) => {
        alert("خطا در سیستم");
      });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });

    if (!event.target.value || event.target.value.length !== 10) {
      this.setState({ miliCodeIsValid: false });
    } else {
      this.setState({ miliCodeIsValid: true });
    }

    this.refreshPersons(event.target.value);
  }
  render() {
    return (
      <div className="was-validated">
        <div className="md-form mt-0 ">
          <label>کد ملی مشتری را وارد نمایید</label>

          <input
            value={this.state.value}
            onChange={this.handleChange}
            className="form-control"
            type="text"
            placeholder="Search"
            aria-label="Search"
            size="10"
            minLength="10"
            maxLength="10"
            required="required"
            data-testid="search-personnel"
          />
          {showValidInvalidMsg(
            this.state.miliCodeIsValid,
            "کد ملی بایستی ده رقم باشد وعدد باشد"
          )}
        </div>
        <br />
        <ul className="list-group" id="myList">
          {this.renderNewPersonForm()}

          {this.renderExistPersonProposal()}
        </ul>
      </div>
    );
  }
  renderNewPersonForm() {
    return (
      <li className="list-group-item">
        <QuickNewPersonForm
          MilliCode={this.state.value}
          saveCallback={(p) => {
            let s = new PersonService();
            s.save(p).then((res) => {
              if (res.Status == 1) {
                if (MyGlobal.IsDebugEnvirement) {
                  let _persons = [...this.state.persons];
                  _persons.push(p);

                  this.setState({ persons: _persons.reverse() });
                } else {
                  this.refreshPersons(this.state.value);
                }

              } else {
                alert(res.Message);
              }
            });
          }}
        />
      </li>
    );
  }
  renderExistPersonProposal() {
    if (!this.state.persons) {
      return <></>;
    }

    return this.state.persons.map((val, i, arr) => {
      return (
        <Route
          render={({ history }) => (
            <li
            style={{direction:'rtl'}}
              data-testid={"person-" + i}
              className="list-group-item"
              onClick={() => {
                DataHolder.selectedPerson = val;
                this.props.parent.setState({ step: 2, PersonId: val.Id });
              }}
            >
             {val.MilliCode}-  {val.Name} 
            </li>
          )}
        />
      );
    });
  }
}
export function showValidInvalidMsg(isValid, err, name) {
  if (isValid) {
    return (
      <div data-testid={name + "Validation"} className="valid-feedback">
        درست است
      </div>
    );
  } else {
    if (err) {
      return (
        <div data-testid={name + "Validation"} className="invalid-feedback">
          {err}
        </div>
      );
    } else {
      return (
        <div data-testid={name + "Validation"} className="invalid-feedback">
          درست نیست
        </div>
      );
    }
  }
}
