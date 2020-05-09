import React, { Component, Fragment } from 'react'
import Button from '../../UI/Button/Button'
class OrderSummery extends Component {
    componentDidUpdate() {
        console.log('updated order summary')
    }
    render() {

        let ingredientSummery = Object.keys(this.props.ingredients)
            .map((igkey) => {
                return <li key={igkey}>
                    <span style={{ textTransform: 'capitalize' }}>{igkey}</span>
                    {this.props.ingredients[igkey]}
                </li>
            });
        return (
            <Fragment>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummery}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
            Continue to checkout?
                <div>
                    <Button btnType="danger" clicked={this.props.cancel}>CANCEL</Button>
                    <Button btnType="success" clicked={this.props.continue}>CONTINUE</Button>
                </div>
            </Fragment>
        )
    }
}

export default OrderSummery;