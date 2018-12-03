import {SET_LOADING_INDICATOR_CLASS} from '../constants/actionConstants';

const initialState = {
    loading_class: "hide"
  };

export function loadingIndicatorReducer(state = initialState, action) 
    {
    switch(action.type)
        {      
        case SET_LOADING_INDICATOR_CLASS:
            return {...state,loading_class:action.loading_class};     
        default:
            return state;
        }
    }