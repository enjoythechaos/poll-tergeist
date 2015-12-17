## Router Heirarchy:

<Route path="/" component={App}>
  <IndexRoute component={PollIndex} />
  <Route path="users/new" component={NewUser} />
  <Route path="session/new" component={NewSession} />
  <Route path="polls" component={PollIndex} />
  <Route path="polls/:pollId/edit" component={EditPoll} />
  <Route path="polls/:pollId" component={PollShow} />
  <Route path="polls/new" component={MultiPollForm} />
  <Route path="answer/:postIdentifier" component={AnswerPoll} />
</Route>
