import {combineReducers} from 'redux'
import {authReducer} from './authReducer'
import {loadingIndicatorReducer} from './loadingIndicatorReducer'

const reducer = combineReducers({
    auth: authReducer,
    loading_indicator: loadingIndicatorReducer
});

export default reducer;