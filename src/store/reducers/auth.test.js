import reducer from './AuthReducer'
import * as actionTypes from '../actions/actionTypes'


describe('auth reducer', () => {
    const intialState = {
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectpath: '/'
    }
    it('Should return the intial sate', () => {
        expect(reducer(undefined, {})).toEqual(intialState)
    })

    it('Should return token and userId after login', () => {
        expect(reducer(intialState, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-userId'
        })).toEqual({
            token: 'some-token',
            userId: 'some-userId',
            error: null,
            loading: false,
            authRedirectpath: '/'
        })
    })

})