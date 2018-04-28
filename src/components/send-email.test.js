/* eslint-env jest */

import sendEmail from './send-email'

describe('SendEmail', () => {
  it('does not crash with invalid data', () => {
    window.alert = jest.fn()
    sendEmail(['badId'], null, undefined)
    expect(window.alert).toHaveBeenCalledWith(
      'To: Unknown\n\nSubject: null\n\nundefined'
    )
  })
})
