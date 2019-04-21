import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { loadingIndicatorReducer } from './loadingIndicatorReducer'

const reducer = combineReducers({
  auth: authReducer,
  loadingIndicator: loadingIndicatorReducer
})

export default reducer
