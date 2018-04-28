import React from 'react'
import styled from 'styled-components'

import EmailTemplate from './email-template'
import sendEmail from './send-email'
import allUsers from './users'

const Wrapper = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: center;
`

const headers = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'office', label: 'Office' },
  { key: 'status', label: 'Status' }
]

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      sort: 'name',
      ascending: true,
      filter: '',
      selectedUsers: [],
      recipients: null
    }
    this.handleStartEmail = this.handleStartEmail.bind(this)
    this.handleSendEmail = this.handleSendEmail.bind(this)
  }

  updateSort (key) {
    if (this.state.sort === key) {
      this.setState({ ascending: !this.state.ascending })
    } else {
      this.setState({ ascending: true, sort: key })
    }
  }

  handleUserChecked (userId) {
    if (this.state.selectedUsers.includes(userId)) {
      this.setState({
        selectedUsers: this.state.selectedUsers.filter(id => id !== userId)
      })
    } else {
      this.setState({ selectedUsers: [...this.state.selectedUsers, userId] })
    }
  }

  handleStartEmail () {
    this.setState({ selectedUsers: [], recipients: this.state.selectedUsers })
  }

  handleSendEmail (subject, message) {
    const { recipients } = this.state
    this.setState({ recipients: null })
    sendEmail(recipients, subject, message)
  }

  render () {
    const users = allUsers.filter(user => {
      if (!this.state.filter) return true
      return user.status === this.state.filter
    })
    users.sort(
      (a, b) =>
        this.state.ascending
          ? a[this.state.sort] > b[this.state.sort]
          : a[this.state.sort] < b[this.state.sort]
    )
    return (
      <Wrapper>
        <div>
          <select
            value={this.state.filter}
            onChange={e => this.setState({ filter: e.target.value })}
          >
            <option value=''>All</option>
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
          <table>
            <thead>
              <tr>
                <th />
                {headers.map(header => (
                  <th
                    onClick={() => this.updateSort(header.key)}
                    key={header.key}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <input
                      type='checkbox'
                      checked={this.state.selectedUsers.includes(user.id)}
                      onChange={() => this.handleUserChecked(user.id)}
                    />
                  </td>
                  {headers.map(header => (
                    <td key={header.key}>{user[header.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={this.handleStartEmail}
            disabled={this.state.selectedUsers.length === 0}
          >
            Email Users
          </button>
          {this.state.recipients && (
            <EmailTemplate onSend={this.handleSendEmail} />
          )}
        </div>
      </Wrapper>
    )
  }
}
