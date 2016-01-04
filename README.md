# Polltergeist

Polltergeist is a web application inspired by Poll Everywhere using Ruby on Rails and React.js.  Polltergeist allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, view, edit, and delete polls
- [ ] Group polls together into poll groups
- [ ] View the results of polls

It also allows visitors to answer polls anonymously by providing the poll's identifier.

# Splash Page

Clicking on "Sign Up" will allow you to create a new account.

Clicking "Log In" will allow you to sign in using a previously-created account, or to log in as a guest user.

The guest account regenerates all sample data from scratch each time someone logs in with it.

# Poll Index Page

Clicking on "Create Poll" will take you to a page that allows you to create one or more polls.

Selecting polls allows you to group, ungroup, or delete them, or delete the responses to the polls.  Removing all the polls from a poll group via grouping or ungrouping will cause the poll group to be deleted, except for the "Ungrouped" poll group.  These four actions are accomplished via custom controller actions and the buttons for performing them will not be active unless at least one box is checked.

The list of polls for each poll group can be either hidden or shown.

The title of a poll group can be changed from this page.

You can also edit a poll or view its results.

# New Polls Page

Entering text into the light blue box immediately creates a form for a new poll, and the text the user began to enter now appears in the "question" section of the form with no disruption to the typing.  The poll starts with two answer choices, and answer choices can be added or deleted.  Additional poll forms can be created by returning to the light blue box.  When "Create Polls" is clicked, a custom controller action creates the polls and the associated answer choices.

The controller action also generates a random number, which can be used in conjuction with the username to form a URL that can be used for answering the poll.  For example, http://polltergeist.io/#/answer/GUEST96 directs to a poll created by the guest user.

# Edit Polls Page

This page allows a user to modify the question text of a poll, as well as its answer choices.  When a user deletes an answer choice, the answer choice is removed from the display and its id is added to a list of answer choices to delete when the form is submitted.  When a user creates an answer choice, a new answer choice object with a null id is created within the page and added to the list.  When the form is submitted, the custom controller action first updates the question text, and then uses the presence or absence of a pre-existing id to decide whether an answer choice needs to be updated or created, and then deletes the necessary answer choices.  A user's decision to edit a poll can be cancelled before she submits her changes.

# Answer Poll

This page is accessed using the poll's url string, e.g., http://polltergeist.io/#/answer/GUEST509.  The header bar is absent from this page because a user need not be logged in to answer a poll, and the fact that a user need not create an account to respond to a poll is a selling point of the service.

# Poll Result

This page displays a graph of that illustrates the breakdown of the responses.  The graphs are react-chartjs components.  The page also displays the number of results for each answer choice.
