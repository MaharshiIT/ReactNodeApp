import React,{Component} from 'react';
import {setLoggedUser} from '../helpers';
import {setUser} from '../actions/authAction';
import {connect} from 'react-redux';

class Home extends Component
    {
    constructor(props)
        {
        super(props);
        }
    componentDidMount()
        {
        setLoggedUser.bind(this)();
        }
    render()
        {
        return <h1 className="text-secondary">Welcome to my demo App!</h1>
        }
    }

export default connect(null,{setUser})(Home);

