import React from 'react'
import styled from 'styled-components'

import Card from './components/card'
import sendEmail from './components/send-email'
import Contacts from './sections/contacts'
import EmailTemplate from './sections/email-template'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  font-weight: normal;
  text-align: center;
  letter-spacing: 3px;
  margin-bottom: 0;
`

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      recipients: null
    }
    this.handleContactsSelected = this.handleContactsSelected.bind(this)
    this.handleSendEmail = this.handleSendEmail.bind(this)
  }

  handleContactsSelected (recipients) {
    this.setState({ recipients })
  }

  handleSendEmail (subject, message) {
    const { recipients } = this.state
    this.setState({ recipients: null })
    sendEmail(recipients, subject, message)
  }

  render () {
    return (
      <Wrapper>
        <Title>Send Some Emails!</Title>
        <Card title='Contacts' color='#6041ad'>
          <Contacts onSelect={this.handleContactsSelected} />
        </Card>
        {this.state.recipients && (
          <Card title='Email' color='#208427'>
            <EmailTemplate onSend={this.handleSendEmail} />
          </Card>
        )}
      </Wrapper>
    )
  }
}
