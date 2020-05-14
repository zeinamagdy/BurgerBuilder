import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'


class Checkout extends Component {

    cancelledHandler = () => {
        this.props.history.goBack();
    }
    continuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        let summary = <Redirect to='/' />
        if (this.props.ings) {
            console.log('test', this.props.purchased)
            const purchasedDone = this.props.purchased? <Redirect to='/'/> : null
            summary = (
                <div>
                    {purchasedDone}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        cancelled={this.cancelledHandler}
                        continued={this.continuedHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            );
        }
        return summary
    }

}

const mapToprops = state => {
    return {
        ings: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        purchased: state.orderReducer.purchase
    }
}


export default connect(mapToprops)(Checkout);