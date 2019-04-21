import React, { Component } from 'react'
import '../css/register.scss'
import { connect } from 'react-redux'

import { setIndicatorVisibility } from '../actions/loadingIndicatorAction'
import { setUser } from '../actions/authAction'

import { TextInputField, RadioButtonField, EmailInputField, PasswordInputField,
  ConfirmPasswordInputField, FileUploadField, Button } from '../components/Form'

import apiCall, { checkValid, setLoggedUser } from '../helpers'
import FormData from 'form-data'

class Register extends Component {
  constructor (props) {
    super(props)

    this.fields = [
      'first_name',
      'last_name',
      'email',
      'password',
      'confirm_password',
      'gender',
      'photo'
    ]

    let stateFields = {}
    this.fields.forEach(field => {
      stateFields[`is_valid_${field}`] = true
    })

    this.state = {
      successClass: 'hide',
      errorMessage: '',
      ...stateFields
    }
  }

  componentDidMount () {
    // In case page is refreshed and
    // if user is logged in, show user and logout
    setLoggedUser.bind(this)()
  }

  async register (e) {
    e.preventDefault()

    const

      { registerForm } = this.refs
    const { formValid, fieldValues } = checkValid.bind(this)(registerForm)

    if (!formValid) return

    let sendData = new FormData()
    let fieldValuesCopy = { ...fieldValues }

    // remove unwanted fields
    delete fieldValuesCopy.confirm_password
    delete fieldValuesCopy.photo

    sendData.append('file', registerForm['photo'].files[0])
    sendData.append('form_data', JSON.stringify(fieldValuesCopy))

    const { data, error } = await apiCall.bind(this)({
      method: 'post',
      url: '/register',
      data: sendData,
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${sendData._boundary}`
      }
    })

    this.setState({ successClass: 'hide' })

    if (error) {
      this.setState({ errorMessage: error })
      return
    }

    if (!data.success) {
      this.setState({ errorMessage: data.data })
      return
    }

    this.setState({ errorMessage: '' })

    this.setState({ successClass: 'show' })
  }

  render () {
    let field = 0
    const WRAPPER_CLASS = 'col'
    return (
      <div className='register-form-wrapper'>
        <h1>Register</h1>
        <form ref="registerForm">
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
              label="Gender" radioLabels={['Male', 'Female']}/>
          </div>
          <div className="form-row">
            <FileUploadField name={this.fields[field++]} wrapperClass={WRAPPER_CLASS}
              label="Upload Photo" isImage={true}
              validExtensions={['jpg', 'jpeg', 'png']} maxSize={3}/>
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

export default connect(null, { setIndicatorVisibility, setUser })(Register)
