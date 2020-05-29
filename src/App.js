import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import * as actions from './store/actions/indexAction'
import Logout from './containers/Auth/Logout/Logout'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

const asyncCheckeoutComponent = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})


const asyncOrdersCompoenent = asyncComponent(() => {
  return import('./containers/Checkout/Orders/Orders')
})


const asyncAuthComponent = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoToSingUp()
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/auth' component={asyncAuthComponent} />
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuthenicated)
      routes = (
        <Switch>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/auth' component={asyncAuthComponent} />
          <Route path='/checkout' component={asyncCheckeoutComponent} />
          <Route path='/orders' component={asyncOrdersCompoenent} />
          <Route path='/logout' component={Logout} />
          <Redirect to='/' />
        </Switch>
      )
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }

}
const stateMapToProps = state => {
  return {
    isAuthenicated: state.authReducer.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoToSingUp: () => { dispatch(actions.checkAuthState()) }
  }
}
export default withRouter(connect(stateMapToProps, mapDispatchToProps)(App));
