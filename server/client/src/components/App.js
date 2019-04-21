import React, { Component } from 'react'

import LoadingIndicator from '../containers/LoadingIndicator'
import Header from '../containers/Header'
import Home from '../containers/Home'
import SignIn from '../containers/SignIn'
import Register from '../containers/Register'
import Protected from '../containers/Protected'

import { BrowserRouter, Route } from 'react-router-dom'

import '../css/common.scss'

class App extends Component {
  render () {
    return (
      <div>
        <LoadingIndicator/>
        <BrowserRouter>
                <>
                    <Header/>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/protected" component={Protected} />
                </>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
