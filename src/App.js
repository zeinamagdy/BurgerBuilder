import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth'
import * as actions from './store/actions/indexAction'
import Logout from './containers/Auth/Logout/Logout'

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoToSingUp()
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/auth' component={Auth} />
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuthenicated)
      routes = (
        <Switch>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/auth' component={Auth} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
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
