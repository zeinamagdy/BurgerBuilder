import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../components/UI/WithErrorHandler/WithErrorHandler'
import axiosInstancs from '../../axios-orders';
import * as actions from '../../store/actions/indexAction'

const INTIAL_PRICE = 4;

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        checkButtonClicked: false,
        loading: false,
        error: false
    }
    componentWillMount() {
        this.props.onInitIngredients()
    }
    updatedPurchase = () => {
        return this.props.totalPrice !== INTIAL_PRICE ? true : false
    }

    purchaseHandler = () => {
        console.log('this.props.isAuthenticated', this.props.isAuthenticated)
        if (this.props.isAuthenticated) {
            this.setState({ checkButtonClicked: true })
        } else {
            this.props.onSetAuthRedirect('/checkout')
            this.props.history.push('/auth')
        }
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
        let burger = this.props.error ? <p>Can't load ingredients from the server</p> : <Spinner />
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
                        isAuthenticated={this.props.isAuthenticated}
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
        ings: state.burgerReducer.ingredients,
        totalPrice: state.burgerReducer.totalPrice,
        error: state.burgerReducer.error,
        isAuthenticated: state.authReducer.token !== null

    }
}
const mapDispatchProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.intialIngredients()),
        onInitPurchased: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirectPath(path))

    }
}
export default connect(mapToProps, mapDispatchProps)(WithErrorHandler(BurgerBuilder, axiosInstancs));