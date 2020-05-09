import React, { Fragment, Component } from 'react'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'
class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }
    render() {
        return (
            <Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modelCLosed} />
                <div className={classes.modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translatY(-100Vh)',
                        display: this.props.show ? 'block' : 'none'
                    }}>
                    {this.props.children}
                </div>
            </Fragment>
        )
    }
}

export default Modal;