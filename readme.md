# Email Mockup

### Dependencies
1. node >= 8.9.4
2. yarn >= 1.4.0 or npm >= 5.6.0

### Running the project
1. `yarn` (or `npm install`)
2. `yarn start` (or `npm start`)
3. Navigate to http://localhost:3000

### Running the tests
1. `yarn test` (or `npm test`)

### Instructions
1. Begin with a static list of at least 5 users, each one should have an id, full name, an office, and a status (active or inactive).  Store this information in an appropriate object.
2. Create a page to list these users - the default sort order is alphabetically by name.
3. The user list should be sortable by name and office
4. The user list should be filterable by status
5. Each user should have a checkbox to the left of their data
6. The page should have a button called "Email Users"
7. When the button is clicked, the page collects the info of the users who were selected by the checkbox and adds a simple form to the page with a textbox labeled "Subject" and a textarea labeled "Message".
8. On successful filling in of the form, and clicking of an "Email" button, do an alert on the page with the recipients, subject, and message shown. (Don't worry about actually sending off emails)
