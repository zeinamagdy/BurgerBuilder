import React from 'react'
import classes from './Input.module.css'

const Input = (props) => {
    let inputEl = null
    let validationError = null
    const inputClasses = [classes.inputEl]
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.invalid)
        validationError = <p className={classes.validationError}>Please enter a vaild value</p>
    }

    switch (props.elementType) {
        case 'input':
            inputEl = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break
        case 'textarea':
            inputEl = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break
        case 'select':
            inputEl = <select
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))

                }

            </select>
            break
        default:
            inputEl = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
    }

    return (
        <div className={classes.input}>
            <label className={classes.label}>{props.label}</label>
            {inputEl}
            {validationError}
        </div>
    )
}



export default Input;