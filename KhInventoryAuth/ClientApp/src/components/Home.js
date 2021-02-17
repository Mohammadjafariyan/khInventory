import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';


export class Home extends Component {
  static displayName = Home.name;


  issueAssignmentProcess(){
    
  }
  render () {
    return (
      <div >
      

        </div>
    );
  }
}

export class MyNavMenu extends Component {
  static displayName = Home.name;


  issueAssignmentProcess(){
    
  }
  render () {
    return (
      <div className='mynav' style={{paddingTop:'20px',paddingBottom:'20px'}}>
      

       <Route render={({ history}) => (
    <button
      type='button'
      className="btn btn-info"
      style={{direction:'rtl'}}
      
      data-testid="IssueAssignment"
      onClick={() => { history.push('/IssueAssignment') }}
    >
        صدور حواله (خروج از انبار)
    </button> 
  )} />

<Route render={({ history}) => (
    <button
    style={{direction:'rtl',float:'right'}}
      type='button'
      className="btn btn-info"
      data-testid="BuyAnimalFood"
      onClick={() => { history.push('/BuyAnimalFood') }}
    >
      خرید (ورود کالا به انبار)
    </button>
  )} />


        </div>
    );
  }
}
