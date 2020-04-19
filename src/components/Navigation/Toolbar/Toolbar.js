import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import ToggelDrawer from '../SideDrawer/ToggelDrawer/ToggelDrawer'
const toolbar = (props) => {
    
    return (
        <header className={classes.toolbar}>
            <ToggelDrawer clicked ={props.drawetToggelClicked}/>
            <div className={classes.logo}>
                <Logo />
            </div>
            <nav className={classes.desktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}
export default toolbar