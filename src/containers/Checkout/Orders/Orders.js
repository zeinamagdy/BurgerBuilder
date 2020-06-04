import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import Order from '../../../components/Order/Order';
import axiosInstanc from '../../../axios-orders';
import WithErrorHandler from '../../../components/UI/WithErrorHandler/WithErrorHandler'
import Spinner from '../../../components/UI/Spinner/Spinner'
import * as actions from '../../../store/actions/indexAction'


const Orders = props => {

    useEffect(() => {
        props.fetchOrders(props.token, props.userId)

    }, [props])

    let orders = <Spinner />
    if (!props.loading)
        orders = props.orders.map(order => (
            <Order key={order.id}
                ingredients={order.ingredients}
                price={Number.parseFloat(order.price)}
            />
        ))

    return (<div>{orders}</div>)

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