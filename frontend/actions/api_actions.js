var PollGroupConstants = require('../constants/poll_group_constants');
var PollConstants = require('../constants/poll_constants');
var PollResultConstants = require('../constants/poll_result_constants');
var AppDispatcher = require('../dispatcher/dispatcher');
var PollResultStore = require('../stores/poll_result_store');

var ApiActions = {
  receivePollGroups: function(pollGroups) {
    AppDispatcher.dispatch({
      actionType: PollGroupConstants.RECEIVE_POLLGROUPS,
      pollGroups: pollGroups
    });
  },

  receivePollResult: function(pollResult) {
    AppDispatcher.dispatch({
      actionType: PollResultConstants.RECEIVE_POLL_RESULT,
      pollResult: pollResult
    });
  },

  fetchPollAndAnswerChoices: function(pollData) {
    AppDispatcher.dispatch({
      actionType: PollConstants.RECEIVE_POLL_DATA,
      pollData: pollData
    });
  }
};

window.ApiActions = ApiActions;

module.exports = ApiActions;
