import React, { Fragment } from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const navigationItems = () => {
    return (
        <Fragment>
            <ul className={classes.navigationItems}>
                <NavigationItem link="/">Burger Builder</NavigationItem>
                {/* <NavigationItem link="/checkout" >Checkout</NavigationItem> */}
                <NavigationItem link="/orders" >Order</NavigationItem>
            </ul>
        </Fragment>

    )
}

export default navigationItems