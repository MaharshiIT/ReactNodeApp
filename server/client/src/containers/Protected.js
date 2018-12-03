import React,{Component} from 'react';
import apiCall,{redirect,setLoggedUser} from '../helpers';
import {connect} from 'react-redux';
import {setIndicatorVisibility} from '../actions/loadingIndicatorAction';
import {setUser} from '../actions/authAction';

class Protected extends Component
    {
    constructor(props)
        {
        super(props);
        this.state = {
            message:""
            }
        }
    async componentDidMount()
        {
        setLoggedUser.bind(this)();
        const {token} = localStorage;
        
        let valid = false;
        
        if(token)
            {
            const {data,error} = await apiCall.bind(this)({
                method: 'post',
                url: "/protected",
                headers: { 'Authorization': `Bearer ${window.atob(token)}` }
                });
            valid = data.success;
            if(valid) this.setState({message:data.message});
            else this.props.setUser("");
            }
        if(!valid)
            {
            alert("Please sign in");
            redirect.bind(this)("/signin");
            }
        }
    render()
        {
        return <h1 className="text-secondary">{this.state.message}</h1>;
        }
    }

export default connect(null,{setIndicatorVisibility,setUser})(Protected);