import React, { Component } from 'react'
import apiCall, { checkValid, setLoggedUser } from '../helpers'
import '../css/signin.scss'

import { connect } from 'react-redux'

import { setUser } from '../actions/authAction'
import { setIndicatorVisibility } from '../actions/loadingIndicatorAction'

import { TextInputField, Button } from '../components/Form'

class SignIn extends Component {
  constructor (props) {
    super(props)
    // order should remain same as form fields
    this.fields = [
      'username',
      'password'
    ]

    let stateFields = {}
    this.fields.forEach(field => {
      stateFields[`is_valid_${field}`] = true
    })

    this.state = {
      message: '',
      messageClass: '',
      ...stateFields
    }

    this.authenticate = this.authenticate.bind(this)
  }

  componentDidMount () {
    // In case page is refreshed and
    // if user is logged in, show user and logout
    setLoggedUser.bind(this)()
  }

  async authenticate (e) {
    e.preventDefault()

    const { signInForm } = this.refs
    const { formValid, fieldValues } = checkValid.bind(this)(signInForm)

    if (!formValid) return

    const { data, error } = await apiCall.bind(this)({
      method: 'post',
      url: '/login',
      data: fieldValues
    })

    if (error) {
      this.setState({ message: data, messageClass: 'text-danger' })
      return
    }

    if (data.success) {
      const { firstName, photo } = data.user
      localStorage.setItem('token', window.btoa(data.token))
      this.props.setUser(firstName, photo)
      this.props.history.push('/')
    } else this.setState({ message: 'Incorrect credentials!', messageClass: 'text-danger' })
  }

  render () {
    return (
      <div className='sign-in-form-wrapper'>
        <h1>Sign In</h1>
        <form ref="signInForm">
          <TextInputField name={this.fields[0]} isValid={this.state[`is_valid_${this.fields[0]}`]}
            wrapperClass="form-group" label="Email" placeholder="Enter username" required/>
          <TextInputField name={this.fields[1]} isValid={this.state[`is_valid_${this.fields[1]}`]}
            wrapperClass="form-group" type="password" label="Password" placeholder="Enter password" required/>
          <div className="form-group">
            <Button className="float-right" label="Sign In" onClick={this.authenticate}/>
          </div>
        </form>
        <div className={this.state.messageClass}>{this.state.message}</div>
      </div>
    )
  }
}

export default connect(null, { setIndicatorVisibility, setUser })(SignIn)
