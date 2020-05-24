import axios from 'axios'
import * as action from './actionTypes'


export const authStart = () => {
    return {
        type: action.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: action.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: action.AUTH_FAIL,
        error: error
    }
}
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirattionTime')
    localStorage.removeItem('userId')
    return {
        type: action.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (experationTime, dispatch) => {
    return dispatch => {
        (setTimeout(() => {
            dispatch(logout())
        }, experationTime * 1000))
    }
}
export const auth = (mail, password, isSingUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: mail,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBdoSTe5zMl-jOR9gQBtJrDtRohusyA8Ag'
        if (!isSingUp)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBdoSTe5zMl-jOR9gQBtJrDtRohusyA8Ag'
        axios.post(url, authData)
            .then(response => {
                const expirattionTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('expirattionTime', expirattionTime)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err))
            })
    }

}

export const setAuthRedirectPath = (path) => {
    return {
        type: action.SET_Auth_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirattionTime = new Date(localStorage.getItem('expirattionTime'))
            if (expirattionTime > new Date()) {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirattionTime.getTime() - new Date().getTime()) / 1000))
            } else {
                dispatch(logout())
            }
        }
    }

}