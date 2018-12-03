import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

import {setUser} from '../actions/authAction';

import {withRouter} from "react-router-dom";
import {redirect} from '../helpers';

const navItem = NavComponent=>props=>{
    return(
        <li className="nav-item">
            <NavComponent {...props}/>
        </li>
    )
}

const LinkField = ({route,label,className,...remaining})=><Link to={route} className={`nav-link ${className}`} {...remaining || ""}>{label}</Link>;
const LinkItem = navItem(LinkField);

const Logout = ({className,...remaining})=>{
    return (
        <button className={`btn btn-info btn-sm ${className || ""}`} {...remaining || ""}>
          Log out
        </button>
    )
}

class Header extends Component {

    constructor(props)
        {
        super(props);
        }

    logout()
        {
        this.props.setUser("");
        redirect.bind(this)("/");
        }

    render()
        {
        const navs = [
            {route:"/",label:"Home"},
            {route:"/signin",label:"Sign In"},
            {route:"/register",label:"Register"},
            {route:"/protected",label:"Protected"}
        ];

        return(
        <nav className={`navbar navbar-expand-sm bg-dark navbar-dark ${this.props.className || ""}`}>
            <Link to='/' className="navbar-brand">Demo App</Link>
            <ul className="navbar-nav">
            {navs.map(({route,label,...remaining},index)=><LinkItem route={route} label={label} {...remaining || ""} key={index}/>)}
            </ul>
            {(this.props.user !== "") ? 
                (<div className="ml-2">
                    <span className="text-info mr-2">{this.props.user}</span>
                    <img className="mr-2" style={{width:'30px',height:'30px'}} src={`${this.props.photoUrl}`} alt=""/>
                    <Logout onClick={this.logout.bind(this)}/>              
                </div>):
            ""}
        </nav>
        )
        }
    }

const mapStateToProps = ({auth}) => 
    { 
    return { 
        user:auth.user,
        photoUrl:auth.photoUrl
        };
    };

export default withRouter(connect(mapStateToProps,{setUser})(Header));