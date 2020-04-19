import React from 'react'
import burgerLogo from '../../assets/images/logo.png'
import classes from './Logo.module.css'
const logo = () => {
    return (
        <div className={classes.logo}>
            <img src={burgerLogo} alt="My burger" />
        </div>
    )
}
export default logo