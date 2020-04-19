import React from 'react'
import classes from './NavigationItem.module.css'
const navigationItem = (props) => {
    return (
        <li className={classes.navigationItem}>
            <a className={props.active ? classes.active : null}
                href={props.link}>
                {props.children}
            s</a>
        </li>
    )
}

export default navigationItem