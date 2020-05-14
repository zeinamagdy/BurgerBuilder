import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Form/Input/Input'
import WithOrderHandler from '../../../components/UI/WithErrorHandler/WithErrorHandler'
import * as actionTypes from '../../../store/actions/indexAction'

class ContactData extends Component {
    state = {
        orderForm: {
            name: this.creatInputForm('Name', 'input', 'text', { required: true }, false),
            email: this.creatInputForm('Email', 'input', 'email', { required: true }, false),
            street: this.creatInputForm('Street', 'input', 'text', { required: true }, false),
            postal: this.creatInputForm('Postal Code', 'input', 'text', { required: true, minLength: 4, maxlength: 6 }, false),
            country: this.creatInputForm('Country', 'input', 'text', { required: true }, false),
            delivery: this.creatInputForm('Delivery Method', 'select', {}, '', '',
                [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]),
        },
        isFormValid: false
    }

    creatInputForm(name, elementType, inputType, validationRules, touched, options) {
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
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        this.props.onOrderBurger(order);


    }
    checkValidaity(value, rules) {
        if (!rules)
            return true;
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }
        if (rules.maxlength) {
            isValid = value.trim().length <= rules.maxlength && isValid;
        }
        return isValid;
    }
    changeHandler(event, id) {
        const updatedForm = { ...this.state.orderForm }
        const updatedFormElement = { ...updatedForm[id] }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidaity(updatedFormElement.value, updatedFormElement.validations)
        updatedFormElement.touched = true
        updatedForm[id] = updatedFormElement;
        let isValid = true
        for (let inputId in updatedForm) {
            isValid = updatedForm[inputId].valid && isValid
        }
        this.setState({ orderForm: updatedForm, isFormValid: isValid })

    }
    render() {
        let formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                item: this.state.orderForm[key]
            })
        }
        let form = (
            <form className={classes.formData} onSubmit={this.orderHandler}>
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
                                changed={(event) => this.changeHandler(event, element.id)}
                            />
                        )
                    })
                }
                <Button
                    btnType='success'
                    clicked={this.orderHandler}
                    disabled={!this.state.isFormValid} >
                    ORDER
                </Button>
            </form>
        )
        form = this.props.loading ? <Spinner /> : form
        return (
            <div className={classes.contactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        )
    }

}
const mapToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        loading: state.orderReducer.loading,
        purchased: state.orderReducer.purchase
    }
}
const mapdispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actionTypes.purchaseBurger(orderData)),
    }

}


export default connect(mapToProps, mapdispatchToProps)(WithOrderHandler(ContactData, axios));