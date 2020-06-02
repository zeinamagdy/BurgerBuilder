import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import * as actions from './store/actions/indexAction'
import Logout from './containers/Auth/Logout/Logout'

// lazy loading 
const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
})


const Orders = React.lazy(() => {
  return import('./containers/Checkout/Orders/Orders')
})


const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
})


const App = props => {

  useEffect(() => {
    props.onTryAutoToSingUp()
  })

  let routes = (
    <Switch>
      <Route path='/' exact component={BurgerBuilder} />
      <Route path='/auth' render={() => <Auth />} />
      <Redirect to='/' />
    </Switch>
  );
  if (props.isAuthenicated)
    routes = (
      <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/auth' render={() => <Auth />} />
        <Route path='/checkout' render={() => <Checkout />} />
        <Route path='/orders' render={() => <Orders />} />
        <Route path='/logout' component={Logout} />
        <Redirect to='/' />
      </Switch>
    )
  return (
    <div>
      <Layout>
        <Suspense fallback = {<p>Loading....</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );


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
