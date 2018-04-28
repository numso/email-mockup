import React from 'react'
import styled from 'styled-components'

const Label = styled.label`
  display: block;
`

const Input = styled.input`
  width: 50%;
  margin-bottom: 15px;
`

const Textarea = styled.textarea`
  resize: vertical;
  width: 100%;
  margin-bottom: 15px;
  min-height: 200px;
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
    const { subject, message } = this.state
    return (
      <div>
        <Label>Subject</Label>
        <Input
          autoFocus
          onChange={e => this.setState({ subject: e.target.value })}
          value={subject}
        />
        <Label>Message</Label>
        <Textarea
          onChange={e => this.setState({ message: e.target.value })}
          value={message}
        />
        <button
          disabled={!subject || !message}
          onClick={() => this.props.onSend(subject, message)}
        >
          Email
        </button>
      </div>
    )
  }
}
