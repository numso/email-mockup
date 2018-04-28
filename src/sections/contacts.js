import React from 'react'
import styled from 'styled-components'

import users from '../data/users'

const Table = styled.table`
  border-collapse: collapse;
`

const TH = styled.th`
  border-bottom: 2px solid #888;
  cursor: pointer;
  padding: 15px;
  text-align: left;
`

const SortIndicator = styled.div`
  border: 7px solid transparent;
  ${props => (props.ascending ? 'border-bottom' : 'border-top')}: 7px solid;
  height: 0;
  position: relative;
  right: -4px;
  top: ${props => (props.ascending ? '-3px' : '3px')};
  width: 0;
`

const TD = styled.td`
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  padding: 15px;
`

const Flex = styled.div`
  display: flex;
`

const CenteredAndSpaced = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`

const headers = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'office', label: 'Office' },
  { key: 'status', label: 'Status' }
]

function filterAndSort (users, { sort, ascending, filter }) {
  const filteredUsers = users.filter(user => {
    if (!filter) return true
    return user.status === filter
  })
  filteredUsers.sort(
    (a, b) => (ascending ? a[sort] > b[sort] : a[sort] < b[sort])
  )
  return filteredUsers
}

export default class Contacts extends React.Component {
  constructor () {
    super()
    this.state = {
      sort: 'name',
      ascending: true,
      filter: '',
      recipients: []
    }
    this.handleStartEmail = this.handleStartEmail.bind(this)
  }

  updateSort (key) {
    if (this.state.sort === key) {
      this.setState({ ascending: !this.state.ascending })
    } else {
      this.setState({ ascending: true, sort: key })
    }
  }

  handleUserChecked (userId) {
    const { recipients } = this.state
    if (recipients.includes(userId)) {
      this.setState({ recipients: recipients.filter(id => id !== userId) })
    } else {
      this.setState({ recipients: [...recipients, userId] })
    }
  }

  handleStartEmail () {
    this.props.onSelect(this.state.recipients)
    this.setState({ recipients: [] })
  }

  render () {
    const usersToShow = filterAndSort(users, this.state)
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <TH />
              {headers.map(header => (
                <TH
                  onClick={() => this.updateSort(header.key)}
                  key={header.key}
                >
                  <Flex>
                    {header.label}
                    {this.state.sort === header.key && (
                      <SortIndicator ascending={this.state.ascending} />
                    )}
                  </Flex>
                </TH>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersToShow.map(user => (
              <tr key={user.id}>
                <TD onClick={() => this.handleUserChecked(user.id)}>
                  <input
                    type='checkbox'
                    checked={this.state.recipients.includes(user.id)}
                    onChange={() => this.handleUserChecked(user.id)}
                  />
                </TD>
                {headers.map(header => (
                  <TD
                    key={header.key}
                    onClick={() => this.handleUserChecked(user.id)}
                  >
                    {user[header.key]}
                  </TD>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <CenteredAndSpaced>
          <div>
            <label>Status: </label>
            <select
              value={this.state.filter}
              onChange={e => this.setState({ filter: e.target.value })}
            >
              <option value=''>All</option>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </select>
          </div>
          <button
            onClick={this.handleStartEmail}
            disabled={this.state.recipients.length === 0}
          >
            Email Users
          </button>
        </CenteredAndSpaced>
      </div>
    )
  }
}
