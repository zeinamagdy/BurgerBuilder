import React, { Fragment } from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import classes from './SideDrawer.module.css'

const sideDrawer = (props) => {
    let attachedClasses = [classes.sideDrawer, classes.close]
    if (props.open){
        attachedClasses = [classes.sideDrawer, classes.open]
    }
    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick ={props.closed}>
                <div className={classes.logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenicated={props.isAuth}/>
                </nav>
            </div>
        </Fragment>
    )
}

export default sideDrawer