import React, {Component} from 'react';
import '../css/register.scss';
import {connect} from 'react-redux';

import {setIndicatorVisibility} from '../actions/loadingIndicatorAction';
import {setUser} from '../actions/authAction';

import {TextInputField,RadioButtonField,EmailInputField,PasswordInputField,
    ConfirmPasswordInputField,FileUploadField,Button,isValidField} from '../components/Form';

import apiCall,{checkValid,redirect,setLoggedUser} from '../helpers';
import axios from 'axios';
import FormData from 'form-data';

class Register extends Component {

    constructor(props)
        {
        super(props);
        
        this.fields = [
            "first_name",
            "last_name",
            "email",
            "password",
            "confirm_password",
            "gender",
            "photo"
            ];
        
        this.state = {
            successClass:"hide",
            errorMessage:""
        };
        this.fields.forEach(field=>
            {
            this.state[`is_valid_${field}`] = true;
            });
        }
    
    componentDidMount()
        {
        // In case page is refreshed and
        // if user is logged in, show user and logout 
        setLoggedUser.bind(this)();
        }
    
    async register(e)
        {
        e.preventDefault();
        
        const 
        
        {register_form} = this.refs,
        {form_valid,field_values} = checkValid.bind(this)(register_form);
        
        if(!form_valid) return;

        let 
        
        send_data = new FormData(),
        field_values_copy = {...field_values};

        // remove unwanted fields
        delete field_values_copy.confirm_password;
        delete field_values_copy.photo;

        send_data.append('file', register_form["photo"].files[0]);
        send_data.append('form_data',JSON.stringify(field_values_copy));

        const {data,error} = await apiCall.bind(this)({
            method:"post",
            url:"/register",
            data:send_data,
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${send_data._boundary}`,
                }
            });
        
        this.setState({successClass:"hide"});
        
        if(error) 
            {
            this.setState({errorMessage:error});
            return;
            }
        
        if(!data.success)
            {
            this.setState({errorMessage:data.data});
            return;
            }
        
        this.setState({errorMessage:""});

        this.setState({successClass:"show"});
        }


    render()
        {
        let field=0;
        const WRAPPER_CLASS = "col";
        return(
        <div className='register-form-wrapper'>
            <h1>Register</h1>
            <form ref="register_form">
                <div className="form-row">
                    <TextInputField name={this.fields[field++]} isValid={this.state.is_valid_first_name} 
                        wrapperClass={WRAPPER_CLASS} label="First Name" placeholder="Enter First Name" required/>
                    <TextInputField name={this.fields[field++]} wrapperClass={WRAPPER_CLASS} 
                        label="Last Name" placeholder="Enter Last Name"/>
                </div>
                <div className="form-row">
                    <EmailInputField name={this.fields[field++]} isValid={this.state.is_valid_email} 
                        wrapperClass={WRAPPER_CLASS} label="Email" placeholder="Enter Email" required/>
                    <PasswordInputField name={this.fields[field++]} isValid={this.state.is_valid_password} 
                        wrapperClass={WRAPPER_CLASS} label="Password" placeholder="Enter Password" required/>
                </div>
                <div className="form-row">
                    <ConfirmPasswordInputField name={this.fields[field++]} 
                        isValid={this.state.is_valid_confirm_password} wrapperClass={WRAPPER_CLASS} 
                        label="Confirm Password" placeholder="Confirm Password"/>
                    <RadioButtonField name={this.fields[field++]} wrapperClass={WRAPPER_CLASS} 
                        label="Gender" radio_labels={["Male","Female"]}/>
                </div>
                <div className="form-row">
                    <FileUploadField name={this.fields[field++]} wrapperClass={WRAPPER_CLASS} 
                        label="Upload Photo" isImage={true}
                        validExtensions={["jpg","jpeg","png"]} maxSize={3}/>
                </div>
                <Button className="float-right" label="Register" onClick={this.register.bind(this)}/>
            </form>
            <div className={`text-success ${this.state.successClass}`}>
                Registeration completed! Please sign-in to confirm.
            </div>
            <div className="text-danger">{this.state.errorMessage}</div>
        </div>
        )
    }
}

export default connect(null,{setIndicatorVisibility,setUser})(Register);