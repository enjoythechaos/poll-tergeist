# Polltergeist

## Minimum Viable Product

Polltergeist is a web application inspired by Poll Everywhere using Ruby on Rails and React.js.  Polltergeist allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, view, edit, and delete polls
- [ ] Group polls together into poll groups
- [ ] View the results of polls

It also allows visitors to answer polls anonymously by providing the poll's identifier.

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Poll Model, Poll Pages, JSON API (2.5 days)

In Phase 1, I will set up authentication using our auth model.  I will also set up JSON APIs for the Polls controller.  I will also set up the poll model and model-level validations, which basically ensure that a user is logged in to create a poll, and must be the author of the polls she is trying to view, edit, or delete.  I will also create the new, edit, show, and index pages for polls.  I will leave the extension of Polls to PollGroups and AnswerChoices for Phase 2, but the forms will be set up to include AnswerChoices.

I'll construct the pages in roughly this order:

- [ ] Home Page
- [ ] New User Page
- [ ] Sign In Page
- [ ] Poll Index Page (sans flux actions.)
- [ ] New Polls Form
- [ ] Edit Poll Form

### Phase 2: Flux Functionality, PollGroup and AnswerChoices, AnswerPoll. (2.5 Days)

Here I will add the model for AnswerChoices and PollGroups, and implement the Flux pattern to facilitate these actions.  Finally, I will create the components that allow a user to answer a poll anonymously, which will involve some new React components, the implementation of the Response model, and the Flux code that creates the Response objects from the user input.


### Phase 3: CSS, Bootstrap and Splash Page (2 days)

I will spend two days making the app look as good as possible.

### Phase 4: Bonus Features (1+ days)

I will implement bonus features if possible:

- [ ] Spiffy display of poll results
- [ ] Options for question types other than multiple choice
- [ ] Reports about responses
- [ ] The ability to submit answers using text messaging and/or twitter.
