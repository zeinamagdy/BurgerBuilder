/* eslint-disable */
import React, { Fragment } from 'react'
import Model from '../Modal/Modal'
import useHttpErrorHandler from '../../../hooks/http-error-handler'

const WithErrorHandler = (WrapperComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios)
        return (
            <Fragment>
                <Model show={error} modelCLosed={clearError}>
                    {error ? error.message : null}
                </Model>
                <WrapperComponent {...props} />
            </Fragment>
        )

    }


}

export default WithErrorHandler;