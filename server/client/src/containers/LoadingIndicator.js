import React, { Component } from 'react'
import { connect } from 'react-redux'

class LoadingIndicator extends Component {
  render () {
    const { loadingClass, className } = this.props
    return (
      <div className={`loading_indicator ${loadingClass} ${className || ''}`}>
        <div className="loader progress">
          <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: '100%' }}></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ loadingIndicator }) => {
  return {
    loadingClass: loadingIndicator.loadingClass
  }
}

export default connect(mapStateToProps)(LoadingIndicator)
