import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../components/UI/WithErrorHandler/WithErrorHandler'
import axiosInstancs from '../../axios-orders';
import * as actionTypes from '../../store/actions'

const INTIAL_PRICE = 4;

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        checkButtonClicked: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        axiosInstancs.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            }).catch(error => { this.setState({ error: true }) })

    }
    updatedPurchase = () => {
        return this.props.totalPrice !== INTIAL_PRICE ? true : false
    }

    purchaseHandler = () => {
        this.setState({ checkButtonClicked: true })
    }
    purchaseCancelHandler = () => {
        this.setState({ checkButtonClicked: false })
    }
    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0 ? true : false
        }
        let burger = this.state.error ? <p>Can't load ingredients from the server</p> : <Spinner />
        let orderSummary = null;
        if (this.props.ings) {
            burger =
                <Fragment>
                    <div>
                        <Burger ingredients={this.props.ings} ></Burger>
                    </div>
                    <BuildControls
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        purchasable={!this.updatedPurchase()}
                        purchase={this.purchaseHandler}
                        disabled={disabledInfo}
                        price={this.props.totalPrice} />
                </Fragment>
            orderSummary = <OrderSummery
                ingredients={this.props.ings}
                price={this.props.totalPrice}
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler} />
        }

        if (this.state.loading)
            orderSummary = <Spinner />
        return (
            <Fragment>
                <Modal show={this.state.checkButtonClicked} modelCLosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}
const mapToProps = (state) => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
    }
}
const mapDispatchProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}
export default connect(mapToProps, mapDispatchProps)(WithErrorHandler(BurgerBuilder, axiosInstancs));