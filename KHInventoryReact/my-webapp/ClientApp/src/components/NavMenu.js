import React, { Component } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link, Route } from "react-router-dom";
import "./NavMenu.css";
import {DataHolder} from "../service/DateHolder";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              انبار
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
               
                <NavItem>
                  <NavLink
                    data-testid="IssueAssignmentList"
                    tag={Link}
                    className="text-dark"
                    to="/IssueAssignmentList"
                    onClick={()=>{
                      DataHolder.selectedAnimalFood=null;
                    }}
                  >
                    {" "}
                    لیست حواله ها
                  </NavLink>
                </NavItem>

                
                <li className="nav-item">
                  <a className="text-dark nav-link" href="/Dashboard/index" target='_blank'>لیست توزیع</a>
                </li>
               {/* <NavItem>
                  <NavLink
                    data-testid=""
                    tag={Link}
                    className="text-dark"
                    to="/Dashboard/index"
                    onClick={()=>{
                      window.location.href="/Dashboard/index";
                    }}
                  >
                    {" "}
                    لیست توزیع
                  </NavLink>
                </NavItem>*/}

                <NavItem>
                  <NavLink
                    data-testid="BuyAnimalFoodList"
                    tag={Link}
                    className="text-dark"
                    to="/BuyAnimalFoodList"
                    
                    onClick={()=>{
                      DataHolder.selectedAnimalFood=null;                      
                    }}
                  >
                    
                    {" "}
                    لیست خرید نهاده{" "}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    data-testid="InventoryStatus"
                    tag={Link}
                    className="text-dark"
                    to="/InventoryStatus"
                  >
                    وضعیت انبار
                  </NavLink>
                </NavItem>

                
                <NavItem>
                  <NavLink
                    data-testid="animalFoods"
                    tag={Link}
                    className="text-dark"
                    to="/AnimalFoodPage"
                  >
                    نهاده ها
                  </NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
