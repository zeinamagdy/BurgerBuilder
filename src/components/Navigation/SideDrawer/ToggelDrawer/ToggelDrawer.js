import React from 'react';
import classes from './ToggelDrawer.module.css';

const ToggelDrawer = (props) => {
    return (
        <div className = {classes.drawerToggle} onClick ={props.clicked} >
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default ToggelDrawer;