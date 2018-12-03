import {SET_USER} from '../constants/actionConstants'

const initialState = {
    user: "",
    photoUrl:""
  };

export function authReducer(state = initialState, action) 
    {
    switch(action.type)
        {   
        case SET_USER:
            return {...state,user:action.user,photoUrl:action.photoUrl} 
        default:
            return state;
        }
    }