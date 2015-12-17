var React = require('react');
var ReactDOM = require('react-dom');

var RouterBase = require('react-router');
var Route = RouterBase.Route;
var IndexRoute = RouterBase.IndexRoute;
var Router = RouterBase.Router;

//var PollStore = require('./stores/poll');

//var PollIndexPage = require('./components/poll_index_page');
//var MultiPollForm = require('./components/multi_poll_form');
//var PollEdit = require('./components/poll_edit');

// var routes = (
//   <Route path="/users/:userId/polls">
//     <IndexRoute component={PollIndexPage}/>
//     <Route path="/users/:userId/polls/new" component={MultiPollForm}></Route>
//     <Route path="/users/:userId/polls/:pollId/edit" component={PollEdit}></Route>
//   </Route>
// );
//
// document.addEventListener('DOMContentLoaded', function(){
//   ReactDOM.render(<Router>{routes}</Router>, document.getElementById('content'));
// });
