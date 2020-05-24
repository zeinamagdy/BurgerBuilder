import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerHandler = () => {
        this.setState({ showSideDrawer: false })
    }
    drawetToggelHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }
    render() {
        return (
            <React.Fragment>
                <Toolbar
                    isAuth={this.props.isAuthenticate}
                    drawetToggelClicked={this.drawetToggelHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuthenticate}
                    closed={this.sideDrawerHandler}
                    open={this.state.showSideDrawer}
                />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </React.Fragment >
        );
    }
}
const stateMapToProps = state => {
    return {
        isAuthenticate: state.authReducer.token !== null
    }
}

export default connect(stateMapToProps)(Layout);