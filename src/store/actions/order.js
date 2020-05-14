import *  as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGRR_FAIL,
        error: error
    }
}
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(err => {
                dispatch(purchaseBurgerFail(err))
            })

    }
}
export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,

    }
}
export const fetchOrdersSuccess = (ordersData) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: ordersData
    }
}
export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}
export const fetchOrders = () => {
    return dispatch => {
        axios.get('/orders.json')
            .then(response => {
                let fetchedDtata = []
                for (let key in response.data) {
                    fetchedDtata.push({ ...response.data[key], id: key })
                }
                dispatch(fetchOrdersSuccess(fetchedDtata))

            }).catch(error => {
                dispatch(fetchOrdersFail)
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
} 