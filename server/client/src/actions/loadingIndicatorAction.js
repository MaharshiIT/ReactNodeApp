
import {SET_LOADING_INDICATOR_CLASS} from '../constants/actionConstants';

export const setIndicatorVisibility = loading_class => dispatch =>
    {
    dispatch({type:SET_LOADING_INDICATOR_CLASS,loading_class});
    }