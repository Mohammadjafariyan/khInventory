import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { Home, MyNavMenu } from './Home';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Container>
        <MyNavMenu/>
          {this.props.children}


<div style={{marginTop:'150px'}}></div>
        </Container>
      </div>
    );
  }

 
}
