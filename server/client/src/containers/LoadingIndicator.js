import React,{Component} from 'react';
import {connect} from 'react-redux';

class LoadingIndicator extends Component
    {
    constructor(props)
        {
        super(props)
        }
    render()
        {
        const {loading_class,className} = this.props;
        return(
            <div className={`loading_indicator ${loading_class} ${className || ""}`}>
                <div className="loader progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width:'100%'}}></div>
                </div>
            </div>
            )
        }
    }

const mapStateToProps = ({loading_indicator}) => 
    { 
    return { 
        loading_class: loading_indicator.loading_class
        };
    };

export default connect(mapStateToProps)(LoadingIndicator);