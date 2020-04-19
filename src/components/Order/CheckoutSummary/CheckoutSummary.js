import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import Classes from './ChecoutSummary.module.css'


const checkoutSummary = (props) => {
    return (
        <div className={Classes.checkoutSummary}>
            <h1>Hope it taste well</h1>
            <div style={{ width: '300px', height: '300px', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="danger">CANCEL</Button>
            <Button btnType="success">CONTINU</Button>
        </div>
    )
}

export default checkoutSummary;