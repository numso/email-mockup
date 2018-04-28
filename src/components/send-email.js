import users from '../data/users'

export default function sendEmail (recipientIds, subject, message) {
  const recipients = recipientIds.map(id => {
    const user = users.find(user => user.id === id) || {}
    return user.name || 'Unknown'
  })
  window.alert(`To: ${recipients}\n\nSubject: ${subject}\n\n${message}`)
}
