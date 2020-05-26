import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Input from '../../components/UI/Form/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/indexAction'
import { updatedObject, checkValidaity } from '../../shared/utility'

class Auth extends Component {
    state = {
        controls: {
            email: this.createInputForm('Email', 'input', 'text', { required: true, isEmail: true }, false),
            password: this.createInputForm('Password', 'input', 'password', { required: true, minLength: 6 }, false)
        },
        isFormValid: false,
        isSingUp: true
    }
    createInputForm(name, elementType, inputType, validationRules, touched, options) {
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
            value = ''
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
    componentDidMount() {
        if (this.props.isAuthicated && this.props.authRedirectpath !== '/')
            this.props.setAuthRedirectPath();
    }
  
    changeHandler(event, inputName) {
        const updatedForm = updatedObject(this.state.controls, {
            [inputName]: {
                value: event.target.value,
                vaild: checkValidaity(event.target.value, this.state.controls[inputName].validationRules),
                touched: true
            }
        })
        let isValid = true
        for (let inputId in updatedForm) {
            isValid = updatedForm[inputId].valid && isValid
        }
        this.setState({ controls: updatedForm, isFormValid: isValid })
    }
    sumbitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSingUp)
    }
    switchAuthHandler = () => {
        this.setState(prevstate => {
            return { isSingUp: !prevstate.isSingUp }
        })
    }
    render() {
        let formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                item: this.state.controls[key]
            })
        }
        let form = (
            <form className={classes.formData} onSubmit={this.sumbitHandler}>
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
                <Button btnType='success' clicked={this.orderHandler}>
                    SUMBIT
                </Button>
                <Button
                    clicked={this.switchAuthHandler}
                    btnType='danger' >
                    Switch to {this.state.isSingUp ? 'singin' : 'singup'}
                </Button>
            </form>
        )
        if (this.props.loading)
            form = <Spinner />

        let errorMessage = null
        if (this.props.error)
            errorMessage = <p>{this.props.error.message}</p>
        let authRedirect = null
        if (this.props.isAuthicated)
            authRedirect = <Redirect to={this.props.authRedirectpath} />
        return <div>
            {authRedirect}
            {errorMessage}
            {form}
        </div>

    }
}
const mapStateToprops = state => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuthicated: state.authReducer.token !== null,
        building: state.burgerReducer.buildingMode,
        authRedirectpath: state.authReducer.authRedirectpath

    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, address, singUpMode) => dispatch(actions.auth(email, address, singUpMode)),
        onSetAuthRedirect: () => dispatch(actions.setAuthRedirectPath('/'))

    }

}
export default connect(mapStateToprops, mapDispatchToProps)(Auth)

