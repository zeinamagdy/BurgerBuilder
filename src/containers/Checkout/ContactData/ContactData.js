import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Form/Input/Input'
import WithOrderHandler from '../../../components/UI/WithErrorHandler/WithErrorHandler'
import * as actionTypes from '../../../store/actions/indexAction'
import { updatedObject, checkValidaity } from '../../../shared/utility'


const ContactData = props => {
    const creatInputForm = (name, elementType, inputType, validationRules, touched, options) => {
        let config = null;
        let inputValid = false;
        let value = ''
        if (elementType === 'input') {
            config = {
                type: inputType,
                placeholder: name

            }
        } else if (elementType === 'select') {
            config = { options }
            inputValid = true
            value = 'fastest'
        }
        return {
            elementType: elementType,
            elementConfig: config,
            validations: validationRules,
            valid: inputValid,
            value: value,
            touched: touched
        }

    }
    const initialState = {
        name: creatInputForm('Name', 'input', 'text', { required: true }, false),
        email: creatInputForm('Email', 'input', 'email', { required: true }, false),
        street: creatInputForm('Street', 'input', 'text', { required: true }, false),
        postal: creatInputForm('Postal Code', 'input', 'text', { required: true, minLength: 4, maxlength: 6 }, false),
        country: creatInputForm('Country', 'input', 'text', { required: true }, false),
        delivery: creatInputForm('Delivery Method', 'select', {}, '', '',
            [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]),
    }

    const [orderForm, setOrderForm] = useState(initialState)
    const [isFormValid, setisFormValid] = useState(false)

    // state = {
    //     orderForm: {
    //         name: creatInputForm('Name', 'input', 'text', { required: true }, false),
    //         email: creatInputForm('Email', 'input', 'email', { required: true }, false),
    //         street: creatInputForm('Street', 'input', 'text', { required: true }, false),
    //         postal: creatInputForm('Postal Code', 'input', 'text', { required: true, minLength: 4, maxlength: 6 }, false),
    //         country: creatInputForm('Country', 'input', 'text', { required: true }, false),
    //         delivery: creatInputForm('Delivery Method', 'select', {}, '', '',
    //             [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]),
    //     },
    //     isFormValid: false
    // }

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let key in orderForm) {
            formData[key] = orderForm[key].value
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            userId: props.userId,
            orderData: formData
        }
        props.onOrderBurger(order, props.token);
    }

    const changeHandler = (event, id) => {
        const updatedFormElement = updatedObject(orderForm[id], {
            value: event.target.value,
            valid: checkValidaity(event.target.value, orderForm[id].validations),
            touched: true,
        })
        const updatedForm = updatedObject(orderForm, { [id]: updatedFormElement })
        let isValid = true
        for (let inputId in updatedForm) {
            isValid = updatedForm[inputId].valid && isValid
        }
        setOrderForm(updatedForm)
        setisFormValid(isValid)
        // this.setState({ orderForm: updatedForm, isFormValid: isValid })

    }

    let formElements = [];
    for (let key in orderForm) {
        formElements.push({
            id: key,
            item: orderForm[key]
        })
    }
    let form = (
        <form className={classes.formData} onSubmit={orderHandler}>
            {
                formElements.map(element => {
                    return (
                        <Input key={element.id}
                            value={element.item.value}
                            elementType={element.item.elementType}
                            elementConfig={element.item.elementConfig}
                            invalid={!element.item.valid}
                            shouldValidate={element.item.validations}
                            touched={element.item.touched}
                            changed={(event) => changeHandler(event, element.id)}
                        />
                    )
                })
            }
            <Button
                btnType='success'
                clicked={orderHandler}
                disabled={!isFormValid} >
                ORDER
                </Button>
        </form>
    )
    form = props.loading ? <Spinner /> : form
    return (
        <div className={classes.contactData}>
            <h4>Enter your contact Data</h4>
            {form}
        </div>
    )


}
const mapToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        loading: state.orderReducer.loading,
        purchased: state.orderReducer.purchase,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}
const mapdispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actionTypes.purchaseBurger(orderData, token)),
    }

}


export default connect(mapToProps, mapdispatchToProps)(WithOrderHandler(ContactData, axios));