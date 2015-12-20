var PollGroupConstants = require('../constants/poll_group_constants');
var PollConstants = require('../constants/poll_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var ApiActions = {
  receivePollGroups: function(pollGroupsObject) {
    AppDispatcher.dispatch({
      actionType: PollGroupConstants.RECEIVE_POLLGROUPS,
      pollGroupsObject: pollGroupsObject
    });
  },

  uncheckAll: function() {
    AppDispatcher.dispatch({
      actionType: PollConstants.UNCHECK_ALL
    });
  },

  checkPolls: function(pollIds) {
    AppDispatcher.dispatch({
      actionType: PollConstants.CHECK_POLLS,
      pollIds: pollIds
    });
  },

  uncheckPolls: function(pollIds) {
    AppDispatcher.dispatch({
      actionType: PollConstants.UNCHECK_POLLS,
      pollIds: pollIds
    });
  },

  fetchPollAndAnswerChoices: function(pollEditData) {
    AppDispatcher.dispatch({
      actionType: PollConstants.RECEIVE_EDIT_POLL_DATA,
      pollEditData: pollEditData
    });
  }
};

window.ApiActions = ApiActions;

module.exports = ApiActions;
