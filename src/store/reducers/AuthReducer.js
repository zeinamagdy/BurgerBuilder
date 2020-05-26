import * as actionTypes from '../actions/actionTypes'
import { updatedObject } from '../../shared/utility'
const intialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectpath: '/'
}
const authStart = (state, action) => {
    return updatedObject(state, { loading: true })
}
const authSuccess = (state, action) => {
    return updatedObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
}
const authFail = (state, action) => {
    return updatedObject(state, { loading: false, error: action.error })
}
const authLogout = (state, action) => {
    return updatedObject(state, {
        token: null,
        userId: null,
        loading: false
    })
}
const setAuthRedirect = (state, action) => {
    return updatedObject(state, {
        authRedirectpath: action.path
    })
}
const reducer = (state = intialState, action) => {

    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        case actionTypes.SET_Auth_REDIRECT_PATH: return setAuthRedirect(state, action)
        default: return state
    }
}

export default reducer;