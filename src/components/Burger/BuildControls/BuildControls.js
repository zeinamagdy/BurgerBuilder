import React from 'react';
import classes from './BuildControls.module.css'
import BuidControl from './BuildControl/BuildControl'
const buildControlers = (props) => {
    const controls = [
        { label: 'Salad', type: 'salad' },
        { label: 'Cheese', type: 'cheese' },
        { label: 'Bacon', type: 'bacon' },
        { label: 'Meat', type: 'meat' },
    ];
    return (
        <div className={classes.buildControls}>
            <span>Price:{props.price.toFixed(2)}</span>
            {controls.map(ctr => {
                return (
                    <BuidControl
                        key={ctr.label}
                        label={ctr.label}
                        added={() => props.addIngredient(ctr.type)}
                        removed={() => props.removeIngredient(ctr.type)}
                        disabled={props.disabled[ctr.type]} />
                )
            })
            }
            <button
                className={classes.orderButton}
                disabled={props.purchasable}
                onClick={props.purchase}>
                {props.isAuthenticated ? 'ORDER NOW' : 'SINGUP TO ORDER'}
            </button>
        </div>
    )

}

export default buildControlers;