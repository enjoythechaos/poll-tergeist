var React = require('react');
var ReactDOM = require('react-dom');

var RouterBase = require('react-router');
var Route = RouterBase.Route;
var IndexRoute = RouterBase.IndexRoute;
var Router = RouterBase.Router;

var PollStore = require('./stores/poll_store');

var PollIndexPage = require('./components/poll_index_page');
var MultiPollForm = require('./components/multi_poll_form');
var PollEdit = require('./components/poll_edit');
var AnswerPoll = require('./components/answer_poll');
var PollResult = require('./components/poll_result');
var StartPage = require('./components/start_page');
var Thanks = require('./components/thanks');

var routes = (
  <Router>
    <Route path="/results/:pollId" component={PollResult}/>
    <Route path="/answer/:pollId" component={AnswerPoll}/>
    <Route path="/users/:userId/polls">
      <IndexRoute component={PollIndexPage}/>
      <Route path="/users/:userId/polls/new" component={MultiPollForm}></Route>
      <Route path="/users/:userId/polls/:pollId/edit" component={PollEdit}></Route>
    </Route>
    <Route path="/thanks" component={Thanks}/>
    <Route path="/" component={StartPage}/>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(routes, document.getElementById('content'));
});
