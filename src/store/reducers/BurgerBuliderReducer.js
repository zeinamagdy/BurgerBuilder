import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../utility'

const INTIAL_PRICE = 4;

const intialState = {
    ingredients: null,
    totalPrice: INTIAL_PRICE,
    error: false
}
const INGREDIENTS_PRICE = {
    salad: .3,
    cheese: .4,
    bacon: .3,
    meat: 1.3
}
const AddRemoveIng = (state, action, flag) => {
    let updatedIng = 0
    let totalPrice = 0
    if (flag === 'add') {
        updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
        totalPrice = state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
    } else {
        updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
        totalPrice = state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
    }
    const updatedIngredients = updatedObject(state.ingredients, updatedIng)
    return {
        ingredients: updatedIngredients,
        totalPrice: totalPrice
    }
}
const setIng = (state, action) => {
    return updatedObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error: false,
        totalPrice: INTIAL_PRICE
    })
}
const fetchIngFail = (state, action) => {
    return updatedObject(state, { error: true })
}

const reduce = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return AddRemoveIng(state, action, 'add')
        case actionTypes.REMOVE_INGREDIENT:
            return AddRemoveIng(state, action, 'remove')
        case actionTypes.SET_INGREDDIENTS:
            return setIng(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngFail(state, action)
        default:
            return state

    }

}

export default reduce;