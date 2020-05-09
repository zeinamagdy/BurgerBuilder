import React, { Component } from 'react';
import Order from '../../../components/Order/Order';
import axiosInstanc from '../../../axios-orders';
import WithErrorHandler from '../../../components/UI/WithErrorHandler/WithErrorHandler'


class Orders extends Component {

    state = {
        orders: [],
        loading: true

    }
    componentDidMount() {
        axiosInstanc.get('/orders.json')
            .then(response => {
                let fetchedDtata = []
                for (let key in response.data) {
                    fetchedDtata.push({ ...response.data[key], id: key })
                }
                this.setState({ loading: false, orders: fetchedDtata })

            }).catch(error => {
                this.setState({
                    loading: false
                })
            })

    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                        ingredients={order.ingredients}
                        price={Number.parseFloat(order.price)}
                    />
                )
                )}
            </div>
        )
    }
}

export default WithErrorHandler(Orders, axiosInstanc);