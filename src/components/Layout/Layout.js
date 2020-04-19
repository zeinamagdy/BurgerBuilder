import React, { Component } from 'react'
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
        console.log('test')
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer }

        })
    }
    render() {
        return (
            <React.Fragment>
                <Toolbar drawetToggelClicked={this.drawetToggelHandler} />
                <SideDrawer closed={this.sideDrawerHandler} open={this.state.showSideDrawer} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </React.Fragment >
        );
    }



}







export default Layout;