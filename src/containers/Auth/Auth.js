import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Input from '../../components/UI/Form/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/indexAction'
import { updatedObject, checkValidaity } from '../../shared/utility'

const Auth = props => {
    const createInputForm = (name, elementType, inputType, validationRules, touched, options) => {
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
    const initialState = {
        email: createInputForm('Email', 'input', 'text', { required: true, isEmail: true }, false),
        password: createInputForm('Password', 'input', 'password', { required: true, minLength: 6 }, false)
    }
    const [controls, setControls] = useState(initialState)
    // const [isFormValid, setIsFormValid] = useState(false)
    const [isSingUp, setIsSingUp] = useState(false)
    
    const { isAuthicated, authRedirectpath, setAuthRedirectPath } = props
    useEffect(() => {
        if (isAuthicated && authRedirectpath !== '/')
            setAuthRedirectPath();
    }, [isAuthicated, authRedirectpath, setAuthRedirectPath])

    const changeHandler = (event, inputName) => {
        const updatedForm = updatedObject(controls, {
            [inputName]: {
                value: event.target.value,
                vaild: checkValidaity(event.target.value, controls[inputName].validationRules),
                touched: true
            }
        })
        let isValid = true
        for (let inputId in updatedForm) {
            isValid = updatedForm[inputId].valid && isValid
        }
        setControls(updatedForm)
    }
    const sumbitHandler = (event) => {
        event.preventDefault()
        props.onAuth(controls.email.value, controls.password.value, isSingUp)
    }
    const switchAuthHandler = () => {
        setIsSingUp(!isSingUp)
    }
    let formElements = [];
    for (let key in controls) {
        formElements.push({
            id: key,
            item: controls[key]
        })
    }
    let form = (
        <form className={classes.formData} onSubmit={sumbitHandler}>
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
            <Button btnType='success'>
                SUMBIT
                </Button>
            <Button
                clicked={switchAuthHandler}
                btnType='danger' >
                Switch to {isSingUp ? 'singin' : 'singup'}
            </Button>
        </form>
    )
    if (props.loading)
        form = <Spinner />

    let errorMessage = null
    if (props.error)
        errorMessage = <p>{props.error.message}</p>
    let authRedirect = null
    if (props.isAuthicated)
        authRedirect = <Redirect to={props.authRedirectpath} />
    return <div>
        {authRedirect}
        {errorMessage}
        {form}
    </div>


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

