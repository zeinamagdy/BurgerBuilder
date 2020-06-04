import React, { Fragment } from 'react'
import Button from '../../UI/Button/Button'
const OrderSummery = props => {
    let ingredientSummery = Object.keys(props.ingredients)
        .map((igkey) => {
            return <li key={igkey}>
                <span style={{ textTransform: 'capitalize' }}>{igkey}</span>
                {props.ingredients[igkey]}
            </li>
        });
    return (
        <Fragment>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummery}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            Continue to checkout?
            <div>
                <Button btnType="danger" clicked={props.cancel}>CANCEL</Button>
                <Button btnType="success" clicked={props.continue}>CONTINUE</Button>
            </div>
        </Fragment>
    )

}

export default OrderSummery;