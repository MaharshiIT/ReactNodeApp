import {SET_USER} from '../constants/actionConstants';

export const setUser = (user,photoUrl) => dispatch =>
    {
    if(user === "")
        {
        localStorage.removeItem("user");
        localStorage.removeItem("photo");
        localStorage.removeItem("token");
        }
    else 
        {
        // preserving header display fields
        localStorage.setItem("user",user);
        localStorage.setItem("photo",photoUrl);
        }
    
    dispatch({type:SET_USER,user,photoUrl});
    }