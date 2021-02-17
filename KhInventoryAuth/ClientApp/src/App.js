import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import './custom.css'
import SettingPage from './Pages/SettingPage';
import AnimalFoodPage from './Pages/AnimalFoodPage';
import IssueAssignment from './Pages/IssueAssignment/IssueAssignment';
import InventoryIn from './Pages/InventoryIn/InventoryIn';
import BuyAnimalFood from './Pages/BuyAnimalFood/BuyAnimalFood';
import InventoryStatus from './Pages/InventoryStatus/InventoryStatus';
import IssueAssignmentList from './Pages/IssueAssignmentList';
import BuyAnimalFoodList from './Pages/BuyAnimalFoodList';
import { pagingComponent } from './Pages/paging';
import PrintIssueAssignment from "./Pages/printIssueAssignment";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import {ApplicationPaths} from "./components/api-authorization/ApiAuthorizationConstants";




export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <AuthorizeRoute exact path='/' component={Home} />
        <AuthorizeRoute path='/setting' component={SettingPage} />
        <AuthorizeRoute path='/AnimalFoodPage' component={AnimalFoodPage} />
        <AuthorizeRoute path='/InventoryIn' component={InventoryIn} />
        <AuthorizeRoute path='/BuyAnimalFood' component={BuyAnimalFood} />
        <AuthorizeRoute path='/IssueAssignment' component={IssueAssignment} />
        <AuthorizeRoute path='/IssueAssignmentList' component={IssueAssignmentList} />
        <AuthorizeRoute path='/BuyAnimalFoodList' component={BuyAnimalFoodList} />
        <AuthorizeRoute path='/InventoryStatus' component={InventoryStatus} />
          <AuthorizeRoute path='/pagingComponent' component={pagingComponent} />
          <AuthorizeRoute path='/PrintIssueAssignment' component={PrintIssueAssignment} />

              <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}