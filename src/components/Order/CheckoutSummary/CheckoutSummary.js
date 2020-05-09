import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import Classes from './CheckoutSummary.module.css'


const checkoutSummary = (props) => {
    return (
        <div className={Classes.checkoutSummary}>
            <h1>Hope it taste well</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button clicked={props.cancelled} btnType="danger">CANCEL</Button>
            <Button clicked={props.continued} btnType="success">CONTINU</Button>
        </div>
    )
}

export default checkoutSummary;