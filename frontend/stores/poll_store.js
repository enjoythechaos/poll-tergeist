var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var PollStore = new Store(AppDispatcher);
var PollConstants = require('../constants/poll_constants');

var _poll = {};
var _answerChoices = [];
var _pollData = {};

PollStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case (PollConstants.RECEIVE_POLL_DATA):
      debugger;
      _pollData = payload.pollData;
      this.__emitChange();
      break;
  }
};

PollStore.getPoll = function() {
  return _poll;
};

PollStore.getAnswerChoices = function() {
  return _answerChoices;
};

PollStore.getPollData = function() {
  return _pollData;
};

window.PollStore = PollStore;

module.exports = PollStore;
