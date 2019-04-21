import React from 'react'
import { shallow, mount } from 'enzyme'
import { Input, FileUpload, PasswordInputField } from './Form'

describe('Input render test', () => {
  it('should render correctly', () => {
    const component = shallow(<Input/>)
    expect(component).toMatchSnapshot()
  })
})

describe('File Upload test', () => {
  it('should pass file validity check', () => {
    const component = shallow(<FileUpload validExtensions={['jpg', 'jpeg', 'png', 'bmp']} maxSize={3}/>)
    const fileInput = component.find("input[type='file']")

    fileInput.simulate('change', { target: { files: [{
      name: 'aa.bb.cc.JPG',
      size: 3145728
    }] } })

    expect(component.state('errorMessage')).toBe('')
  })
})

describe('Password Input test', () => {
  it('should pass password validity', () => {
    const component = mount(<PasswordInputField value="aaa1"/>)
    const passInput = component.find("input[type='password']")

    expect(new RegExp(passInput.prop('pattern')).test(component.prop('value'))).toBeTruthy()
  })
})
