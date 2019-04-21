
import { SET_LOADING_INDICATOR_CLASS } from '../constants/actionConstants'

export const setIndicatorVisibility = loadingClass => dispatch => {
  dispatch({ type: SET_LOADING_INDICATOR_CLASS, loadingClass })
}
