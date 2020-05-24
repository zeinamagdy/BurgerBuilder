import React, { Component } from 'react';
import { connect } from 'react-redux'
import Order from '../../../components/Order/Order';
import axiosInstanc from '../../../axios-orders';
import WithErrorHandler from '../../../components/UI/WithErrorHandler/WithErrorHandler'
import Spinner from '../../../components/UI/Spinner/Spinner'
import * as actions from '../../../store/actions/indexAction'


class Orders extends Component {


    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId)

    }
    render() {
        let orders = <Spinner />
        if (!this.props.loading)
            orders = this.props.orders.map(order => (
                <Order key={order.id}
                    ingredients={order.ingredients}
                    price={Number.parseFloat(order.price)}
                />
            ))

        console.log('orders', this.props.orders)
        return (<div>{orders}</div>)
    }
}
const mapToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}
const mapDispatchProps = dispatch => {
    return {
        fetchOrders: (tokenId, userId) => dispatch(actions.fetchOrders(tokenId, userId))
    }
}
export default connect(mapToProps, mapDispatchProps)(WithErrorHandler(Orders, axiosInstanc));