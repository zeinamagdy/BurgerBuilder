import React, { Fragment } from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const navigationItems = (props) => {
    return (
        <Fragment>
            <ul className={classes.navigationItems}>
                <NavigationItem link="/">Burger Builder</NavigationItem>
                _{props.isAuthenicated ? <NavigationItem link="/orders" >Order</NavigationItem> : null}
                {props.isAuthenicated ?
                    <NavigationItem link="/logout">Logout</NavigationItem>
                    : <NavigationItem link="/auth">Auth</NavigationItem>}
            </ul>
        </Fragment>

    )
}

export default navigationItems