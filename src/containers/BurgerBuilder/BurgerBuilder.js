import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
const INGREDIENTS_PRICE = {
    salad: .3,
    cheese: .4,
    bacon: .3,
    meat: 1.3
}
const INTIAL_PRICE = 4;
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: INTIAL_PRICE,
        purchasable: false,
        checkButtonClicked: false
    }
    updatedPurchase = (updated_price) => {
        this.setState({ purchasable: updated_price !== INTIAL_PRICE ? true : false })
    }


    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedCount
        const updatedPrice = this.state.totalPrice + INGREDIENTS_PRICE[type]
        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice })
        this.updatedPurchase(updatedPrice);
    }
    removeIngredientHander = (type) => {
        if (this.state.ingredients[type] <= 0) {
            return;
        }
        const updatedCount = this.state.ingredients[type] - 1
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedCount
        const updatedPrice = this.state.totalPrice - INGREDIENTS_PRICE[type]
        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice })
        this.updatedPurchase(updatedPrice);
    }
    purchaseHandler = () => {
        this.setState({ checkButtonClicked: true })
    }
    purchaseCancelHandler = () => {
        this.setState({ checkButtonClicked: false })
    }
    purchaseContinueHandler = () => {
        alert('you are continue!')
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0 ? true : false
        }
        return (
            <Fragment>
                <Modal show={this.state.checkButtonClicked} modelCLosed={this.purchaseCancelHandler}>
                    <OrderSummery
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        cancel={this.purchaseCancelHandler}
                        continue={this.purchaseContinueHandler} />
                </Modal>
                <div>
                    <Burger ingredients={this.state.ingredients} ></Burger>
                </div>
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHander}
                    purchasable={!this.state.purchasable}
                    purchase={this.purchaseHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice} />
            </Fragment>
        );
    }
}
export default BurgerBuilder;