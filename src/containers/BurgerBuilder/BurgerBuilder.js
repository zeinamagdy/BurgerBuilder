import React, { useState, Fragment, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../components/UI/WithErrorHandler/WithErrorHandler'
import axiosInstancs from '../../axios-orders';
import * as actions from '../../store/actions/indexAction'

const INTIAL_PRICE = 4;

const BurgerBuilder = props => {
    const [purchasable, setPurchasable] = useState(false)
    const ings = useSelector((state => {
        return state.burgerReducer.ingredients
    }))
    const totalPrice = useSelector((state => {
        return state.burgerReducer.totalPrice
    }))
    const error = useSelector((state => {
        return state.burgerReducer.error
    }))
    const isAuthenticated = useSelector((state => {
        return state.authReducer.token !== null
    }))

    const dispatch = useDispatch()
    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName))
    const onIngredientRemovd = (ingName) => dispatch(actions.removeIngredient(ingName))
    // eslint-disable-next-line
    const onInitIngredients = useCallback(() => dispatch(actions.intialIngredients()), [])
    const onInitPurchased = () => dispatch(actions.purchaseInit())
    const onSetAuthRedirect = (path) => dispatch(actions.setAuthRedirectPath(path))

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const updatedPurchase = () => {
        return totalPrice !== INTIAL_PRICE ? true : false
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            // setState({ checkButtonClicked: true })
            setPurchasable(true)
            // setCheckButtonClicked(true)
        } else {
            onSetAuthRedirect('/checkout')
            props.history.push('/auth')
        }
    }
    const purchaseCancelHandler = () => {
        // setState({ checkButtonClicked: false })
        onInitPurchased()
        setPurchasable(false)
        // setCheckButtonClicked(false)
    }
    const purchaseContinueHandler = () => {
        props.history.push('/checkout')
    }

    const disabledInfo = {
        ...ings
    }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] === 0 ? true : false
    }
    let burger = error ? <p>Can't load ingredients from the server</p> : <Spinner />
    let orderSummary = null;
    if (ings) {
        burger =
            <Fragment>
                <div>
                    <Burger ingredients={ings} ></Burger>
                </div>
                <BuildControls
                    addIngredient={onIngredientAdded}
                    removeIngredient={onIngredientRemovd}
                    purchasable={!updatedPurchase()}
                    purchase={purchaseHandler}
                    disabled={disabledInfo}
                    isAuthenticated={isAuthenticated}
                    price={totalPrice} />
            </Fragment>
        orderSummary = <OrderSummery
            ingredients={ings}
            price={totalPrice}
            cancel={purchaseCancelHandler}
            continue={purchaseContinueHandler} />
    }


    return (
        <Fragment>
            <Modal show={purchasable} modelCLosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Fragment>
    );

}

export default WithErrorHandler(BurgerBuilder, axiosInstancs);