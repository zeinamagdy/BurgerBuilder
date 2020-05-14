import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const intialState = {
    orders: [],
    loading: false,
    purchase: false
}
const purchaseBurger = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.id
    }
    return updatedObject(state, {
        loading: false,
        purchase: true,
        orders: state.orders.concat(newOrder)
    })
}
const purchaseFail = (state) => {
    return updatedObject(state, { loading: false })
}
const purchaseStart = (state) => {
    return updatedObject(state, { loading: true })
}
const purchaseInit = (state) => {
    return updatedObject(state, { purchase: false })
}
const fetchOrdersStart = (state) => {
    return updatedObject(state, { loading: false })
}
const fetchOrdersSucess = (state, action) => {
    return updatedObject(state, {
        orders: action.orders,
        loading: false
    })
}
const fetchOrdersFail = (state) => {
    return updatedObject(state, { loading: false })
}

const orderReducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurger(state, action)
        case actionTypes.PURCHASE_BURGRR_FAIL: return purchaseFail(state)
        case actionTypes.PURCHASE_BURGER_START: return purchaseStart(state)
        case actionTypes.PURCHASE_INIT: return purchaseInit(state)
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state)
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSucess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state)
        default: return state
    }
}

export default orderReducer