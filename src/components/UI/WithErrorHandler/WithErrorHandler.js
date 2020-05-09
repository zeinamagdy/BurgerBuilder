import React, { Fragment, Component } from 'react'
import Model from '../Modal/Modal'

const WithErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({ error: error })
            })
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)

        }
        confirmedErrorHandler() {
            this.setState({ error: null })
        }

        render() {
            return (
                <Fragment>
                    <Model show={this.state.error} modelCLosed={this.confirmedErrorHandler.bind(this)}>
                        {this.state.error ? this.state.error.message : null}
                    </Model>
                    <WrapperComponent {...this.props} />
                </Fragment>
            )
        }

    }

}

export default WithErrorHandler;