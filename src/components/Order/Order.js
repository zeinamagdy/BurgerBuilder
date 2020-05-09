import React from 'react';
import classes from './Order.module.css'

const Order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName] })
    }
    const ingredientsOupt = ingredients.map(ig => {
        return <span key={ig.name} 
                    style={{ display: 'inline-block', textTransform: 'capitalize', margin: '0 10px', padding: '5px', border: '1px soild #eee' }}>
                    {ig.name} ({ig.amount})
                </span>
    })
    return (
        <div className={classes.order}>
            <p>Ingredients:{ingredientsOupt}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    )
}

export default Order;