import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'


class Checkout extends Component {
    cancelledHandler = () => {
        console.log('cancel', this.props)
        this.props.history.goBack();
    }
    continuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        return (<div>
            <CheckoutSummary
                ingredients={this.props.ings}
                cancelled={this.cancelledHandler}
                continued={this.continuedHandler}
            />

            <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
        </div>);
    }

}

const mapToprops = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapToprops)(Checkout);