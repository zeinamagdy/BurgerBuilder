import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'
import axiosInstanc from '../../../axios-orders'
import Input from '../../../components/UI/Form/Input/Input'

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
        'loading': false,
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
        this.setState({ loading: true })
        const formData = {}
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        axiosInstanc.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({ loading: false })
            })


    }
    checkValidaity(value, rules) {
        if (!rules)
            return true;
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        console.log('isVlaid', value.trim() !== "" && isValid)
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
            console.log('el', updatedForm[inputId].valid)

            isValid = updatedForm[inputId].valid && isValid
        }
        console.log(isValid)
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
        form = this.state.loading ? <Spinner /> : form

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
        ings: state.ingredients,
        price: state.totalPrice
    }
}


export default connect(mapToProps)(ContactData);