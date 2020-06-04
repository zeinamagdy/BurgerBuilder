import React, { useState } from 'react'
import { connect } from 'react-redux'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false)
    // state = {
    //     showSideDrawer: false
    // }
    const sideDrawerHandler = () => {
        setShowSideDrawer( false)
    }
   const  drawetToggelHandler = () => {
       setShowSideDrawer(!showSideDrawer)
    }

    return (
        <React.Fragment>
            <Toolbar
                isAuth={props.isAuthenticate}
                drawetToggelClicked={drawetToggelHandler}
            />
            <SideDrawer
                isAuth={props.isAuthenticate}
                closed={sideDrawerHandler}
                open={showSideDrawer}
            />
            <main className={classes.content}>
                {props.children}
            </main>
        </React.Fragment >
    );

}
const stateMapToProps = state => {
    return {
        isAuthenticate: state.authReducer.token !== null
    }
}

export default connect(stateMapToProps)(Layout);