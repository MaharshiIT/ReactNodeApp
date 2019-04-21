import React, { PureComponent } from 'react'

// form helpers

export function checkFileValidity (target, validExtensions, maxSize) {
  const fileObject = target.files[0]
  const { name, size } = fileObject
  const sizeInMb = size / 1024 / 1024
  const extension = name.substr(name.lastIndexOf('.') + 1).toLowerCase()

  let valid = false
  let errorMessage = ''

  if (validExtensions && validExtensions.indexOf(extension) === -1) { errorMessage = 'Invalid File' } else if (maxSize && sizeInMb > maxSize) { errorMessage = `File shouldn't be greater than ${maxSize} MB` } else valid = true

  return { valid, errorMessage }
}

// end form helpers

// functional components

export function Button (props) {
  const { label, className, ...remaining } = props
  return <button className={`btn btn-primary ${className || ''}`} type="submit" {...remaining || ''}>{label}</button>
}

export function HelpText ({ message, className }) {
  return <small className={`form-text text-muted ${className || ''}`}>{message}</small>
}

// end functional components

// class components

function formField (WrappedComponent, errorMessage) {
  return class extends PureComponent {
    constructor (props) {
      super(props)
      this.state = this.getInitialState()
    }
    componentDidUpdate () {
      if (this.props.isValid === false) this.setState({ borderClass: 'error-border', inValidClass: 'show' })
      else this.setState(this.getInitialState())
    }
    getInitialState () {
      const initialState = { borderClass: '', inValidClass: 'hide' }
      return { ...initialState }
    }
    render () {
      const { wrapperClass, label, isValid, ...remaining } = this.props
      return (
        <div className={wrapperClass || ''}>
          <label>{label}</label>
          {(this.props.required) ? <span className="text-danger">*</span> : ''}
          <WrappedComponent {...remaining || ''}/>
          <ErrorMessage className={this.state.inValidClass} message={errorMessage}/>
        </div>
      )
    }
  }
}

export class Input extends PureComponent {
  render () {
    const { formRef, type, placeholder, className, ...remaining } = this.props
    return <input type={type || 'text'} ref={formRef} className={`form-control ${className || ''}`} placeholder={placeholder || ''} {...remaining}/>
  }
}

export class RadioButtons extends PureComponent {
  render () {
    const { type, className, radioLabels, name, value, ...remaining } = this.props
    return (
      radioLabels.map(label => (
        <div className={`form-check ${className || ''}`}>
          <label className="form-check-label">
            <input type="radio" value={value || label} className="form-check-input" name={name} {...remaining || ''}/>{label}
          </label>
        </div>
      ))
    )
  }
}

export class ErrorMessage extends PureComponent {
  render () {
    const { message, className } = this.props
    return <div className={`invalid-feedback ${className || ''}`}>{message}</div>
  }
}

function passInput (PasswordComponent) {
  return class extends PureComponent {
    componentDidMount () {
      this.checkPasswords()
    }
    changeHandler (e) {
      this.checkPasswords()
      if (this.props.onChange) this.props.onChange(e)
    }
    checkPasswords () {
      const { passInput, confirmPassInput } = window
      if (passInput && confirmPassInput) {
        if (passInput.value !== confirmPassInput.value) confirmPassInput.setCustomValidity("Passwords Don't Match")
        else confirmPassInput.setCustomValidity('')
      }
    }
    render () {
      const { onChange, ...remaining } = this.props
      return <PasswordComponent onChange={this.changeHandler.bind(this)} {...remaining || ''}/>
    }
  }
}

export class FileUpload extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      errorMessage: '',
      imageUrl: ''
    }
  }

  changeHandler (e) {
    const { target } = e
    this.setState({ errorMessage: '', imageUrl: '' })
    const { validExtensions, maxSize } = this.props
    const file = target.files[0]
    if (file) {
      const { valid, errorMessage } = checkFileValidity(target, validExtensions, maxSize)
      if (!valid) {
        this.setState({ errorMessage })
        target.value = ''
        return
      }
      if (this.props.isImage) this.setState({ imageUrl: URL.createObjectURL(file) })
    }
    if (this.props.onChange) this.props.onChange(e)
  }

  render () {
    const { formRef, isImage, className, onChange, ...remaining } = this.props

    const imagePreview = (isImage) ? <img alt="" className="img-thumbnail image-preview" src={this.state.imageUrl}/> : ''

    return (
            <>
                {imagePreview}
                <input type="file" ref={formRef} className={`form-control-file ${className || ''}`} onChange={this.changeHandler.bind(this)} {...remaining}/>
                <ErrorMessage message={this.state.errorMessage}/>
            </>
    )
  }
}

/* ------------------------------------------------------------------------------------------------ */

const EmailInput = ({ type, ...remaining }) => <Input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" {...remaining || ''}/>
const PasswordInput = ({ type, onChange, ...remaining }) => {
  return (
        <>
            <Input formRef={ref => { window.passInput = ref }} onChange={onChange} type="password" pattern="^(?=.*\d).+$" {...remaining || ''}/>
            <HelpText message="Password must contain atleast 1 numeric character"/>
        </>
  )
}
const ConfirmPasswordInput = ({ type, onChange, ...remaining }) => <Input formRef={ref => { window.confirmPassInput = ref } } onChange={onChange} type="password" {...remaining || ''}/>

const REQUIRED_MESSAGE = 'This field is required'
export const TextInputField = formField(Input, REQUIRED_MESSAGE)
export const RadioButtonField = formField(RadioButtons, REQUIRED_MESSAGE)
export const EmailInputField = formField(EmailInput, 'Please enter valid email')
export const PasswordInputField = formField(passInput(PasswordInput), 'Please enter valid password')
export const ConfirmPasswordInputField = formField(passInput(ConfirmPasswordInput), "Passwords don't match")
export const FileUploadField = formField(FileUpload)
