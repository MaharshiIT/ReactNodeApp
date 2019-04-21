import axios from 'axios'

export default async function apiCall () {
  try {
    // loadingIndicatorReducer
    this.props.setIndicatorVisibility('show')
    const response = await axios({ ...arguments[0] }) // {method,url,data,options/headers}

    this.props.setIndicatorVisibility('hide')

    return { data: response.data, error: false }
  } catch (e) {
    this.props.setIndicatorVisibility('hide')
    return { data: e.toString(), error: true }
  }
}

export function isValidField (fields) {
  if (fields.validity) return fields.validity.valid
  return [...fields].every(field => field.validity.valid)
}

export function checkValid (formElement) {
  let formValid = true
  let fieldValues = {}

  this.fields.forEach(field => {
    if (isValidField(formElement[field])) {
      this.setState({ [`is_valid_${field}`]: true })
      fieldValues[field] = formElement[field].value
    } else {
      this.setState({ [`is_valid_${field}`]: false })
      formValid = false
    }
  })

  return { fieldValues, formValid }
}

export function redirect (url) {
  this.props.history.push(url)
}

export function setLoggedUser () {
  if (localStorage.user) this.props.setUser(localStorage.user, localStorage.photo)
}
