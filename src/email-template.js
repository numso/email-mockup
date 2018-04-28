import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: center;
`

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      subject: '',
      message: ''
    }
  }

  render () {
    return (
      <Wrapper>
        <div>
          <label>Subject</label>
          <input
            value={this.state.subject}
            onChange={e => this.setState({ subject: e.target.value })}
          />
          <label>Message</label>
          <textarea
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
          />
          <button
            disabled={!this.state.subject || !this.state.message}
            onClick={() =>
              this.props.onSend(this.state.subject, this.state.message)
            }
          >
            Email
          </button>
        </div>
      </Wrapper>
    )
  }
}
