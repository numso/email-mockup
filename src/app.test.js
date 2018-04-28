/* eslint-env jest */

import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import App from './app'

Enzyme.configure({ adapter: new Adapter() })

describe('<App />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<App />)
    expect(wrapper.find('Contacts').length).toBe(1)
    expect(wrapper.find('button').prop('disabled')).toBeTruthy()
    expect(wrapper.find('EmailTemplate').length).toBe(0)
    expect(wrapper.find('Contacts tbody tr').length).toBe(5)
    expect(
      wrapper.find('Contacts tbody tr').map(row =>
        row
          .find('td')
          .at(1)
          .text()
      )
    ).toEqual([
      'Bubba Jones',
      'Frank Frank',
      'Fritz Mummelhummer',
      'Myrmal Kizzie Blaukenship',
      'Trixie Dorkl Fussenbinger'
    ])
  })

  it('can sort and filter contacts', () => {
    const wrapper = mount(<App />)
    expect(wrapper.find('Contacts tbody tr').length).toBe(5)
    wrapper
      .find('Contacts select')
      .simulate('change', { target: { value: 'active' } })
    expect(wrapper.find('Contacts tbody tr').length).toBe(3)
    wrapper
      .find('Contacts thead th')
      .at(1)
      .simulate('click')
    expect(
      wrapper.find('Contacts tbody tr').map(row =>
        row
          .find('td')
          .at(1)
          .text()
      )
    ).toEqual([
      'Trixie Dorkl Fussenbinger',
      'Fritz Mummelhummer',
      'Bubba Jones'
    ])
    wrapper
      .find('Contacts thead th')
      .at(2)
      .simulate('click')
    expect(
      wrapper.find('Contacts tbody tr').map(row =>
        row
          .find('td')
          .at(2)
          .text()
      )
    ).toEqual(['bubba@jones.fake', 'fritz@mummel.fake', 'trixie@fussen.fake'])
  })

  it('can select/unselect a contact and enter email mode', () => {
    const wrapper = mount(<App />)
    expect(wrapper.find('button').prop('disabled')).toBeTruthy()
    expect(wrapper.find('EmailTemplate').length).toBe(0)
    wrapper
      .find('Contacts tbody tr td')
      .first()
      .simulate('click')
    expect(wrapper.find('button').prop('disabled')).toBeFalsy()
    wrapper
      .find('Contacts tbody tr td')
      .first()
      .simulate('click')
    expect(wrapper.find('button').prop('disabled')).toBeTruthy()
    wrapper
      .find('Contacts tbody tr td')
      .at(1)
      .simulate('click')
    expect(wrapper.find('button').prop('disabled')).toBeFalsy()
    wrapper.find('button').simulate('click')
    expect(wrapper.find('EmailTemplate').length).toBe(1)
  })

  it('can send an email', () => {
    window.alert = jest.fn()
    const wrapper = mount(<App />)
    wrapper
      .find('Contacts tbody tr td input')
      .first()
      .simulate('change')
    wrapper.find('button').simulate('click')
    expect(
      wrapper
        .find('button')
        .last()
        .prop('disabled')
    ).toBeTruthy()
    wrapper
      .find('EmailTemplate input')
      .simulate('change', { target: { value: 'MySubject' } })
    expect(
      wrapper
        .find('button')
        .last()
        .prop('disabled')
    ).toBeTruthy()
    wrapper
      .find('EmailTemplate textarea')
      .simulate('change', { target: { value: 'What a great message' } })
    expect(
      wrapper
        .find('button')
        .last()
        .prop('disabled')
    ).toBeFalsy()
    expect(window.alert).not.toHaveBeenCalled()
    wrapper
      .find('button')
      .last()
      .simulate('click')
    expect(window.alert).toHaveBeenCalledWith(
      'To: Bubba Jones\n\nSubject: MySubject\n\nWhat a great message'
    )
  })
})
