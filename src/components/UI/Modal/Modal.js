import React, { Fragment } from 'react'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'
const modal = (props) => {
    console.log('show', props.show)
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.modelCLosed} />
            <div className={classes.modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translatY(-100Vh)',
                    display: props.show ? 'block' : 'none'
                }}>
                {props.children}
            </div>
        </Fragment>
    )
}

export default modal;