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




export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/setting' component={SettingPage} />
        <Route path='/AnimalFoodPage' component={AnimalFoodPage} />
        <Route path='/InventoryIn' component={InventoryIn} />
        <Route path='/BuyAnimalFood' component={BuyAnimalFood} />
        <Route path='/IssueAssignment' component={IssueAssignment} />
        <Route path='/IssueAssignmentList' component={IssueAssignmentList} />
        <Route path='/BuyAnimalFoodList' component={BuyAnimalFoodList} />
        <Route path='/InventoryStatus' component={InventoryStatus} />
        <Route path='/fetch-data' component={FetchData} />
          <Route path='/pagingComponent' component={pagingComponent} />
          <Route path='/PrintIssueAssignment' component={PrintIssueAssignment} />
          
        
      </Layout>
    );
  }
}