import axios from 'axios';

export default async function apiCall()
    {
    try
        {
        // loadingIndicatorReducer
        this.props.setIndicatorVisibility("show");
        const response = await axios({...arguments[0]});  // {method,url,data,options/headers}
        
        this.props.setIndicatorVisibility("hide");

        return {data:response.data,error:false};
        }
    catch(e)
        {
        this.props.setIndicatorVisibility("hide");
        return {data:e.toString(),error:true};
        }
    }


export function isValidField(fields)
    {
    if(fields.validity) return fields.validity.valid;
    return [...fields].every(field=>field.validity.valid);
    }

export function checkValid(form_element)
    {
    let 
    
    form_valid = true,
    field_values = {};      

    this.fields.forEach(field=>
        {
        if (isValidField(form_element[field])) 
            {
            this.setState({[`is_valid_${field}`]: true});
            field_values[field] = form_element[field].value;
            }
        else 
            {
            this.setState({[`is_valid_${field}`]: false});
            form_valid = false;
            }
        });
    
    return {field_values,form_valid};
    }

export function redirect(url)
    {
    this.props.history.push(url);
    }

export function setLoggedUser()
    {
    if(localStorage.user) this.props.setUser(localStorage.user,localStorage.photo);
    }