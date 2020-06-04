import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'


const Checkout = props => {

    const cancelledHandler = () => {
        props.history.goBack();
    }
    const continuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    let summary = <Redirect to='/' />
    if (props.ings) {
        const purchasedDone = props.purchased ? <Redirect to='/' /> : null
        summary = (
            <div>
                {purchasedDone}
                <CheckoutSummary
                    ingredients={props.ings}
                    cancelled={cancelledHandler}
                    continued={continuedHandler}
                />
                <Route path={props.match.path + '/contact-data'} component={ContactData} />
            </div>
        );
    }
    return summary
}



const mapToprops = state => {
    return {
        ings: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        purchased: state.orderReducer.purchase
    }
}


export default connect(mapToprops)(Checkout);