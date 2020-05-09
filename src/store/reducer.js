import * as actionTypes from './actions'

const INTIAL_PRICE = 4;

const intialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0
    },
    totalPrice: INTIAL_PRICE,
}
const INGREDIENTS_PRICE = {
    salad: .3,
    cheese: .4,
    bacon: .3,
    meat: 1.3
}
const reduce = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]

            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]

            }
        default:
            return state

    }

}

export default reduce;