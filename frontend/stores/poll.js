var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var PollStore = new Store(AppDispatcher);
var PollConstants = require('../constants/poll_constants');

var _checkedPolls = {};
var _poll = {};
var _answerChoices = [];

PollStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case (PollConstants.CHECK_POLLS):
      console.log("Got to PollStore.__onDispatch case PollConstants.CHECK_POLLS");
      console.log(payload.pollIds);
      for(var i = 0; i < payload.pollIds.length; i++) {
        _checkedPolls[payload.pollIds[i]] = true;
      }
      this.__emitChange();
      break;
    case (PollConstants.UNCHECK_POLLS):
      console.log("Got to PollStore.__onDispatch case PollConstants.UNCHECK_POLLS");
      for(var i = 0; i < payload.pollIds.length; i++) {
        if (_checkedPolls[payload.pollIds[i]]) {
          delete _checkedPolls[payload.pollIds[i]];
        }
      }
      this.__emitChange();
      break;
    case (PollConstants.RECEIVE_EDIT_POLL_DATA):
      console.log("Got to PollStore.__onDispatch case PollConstants.RECEIVE_EDIT_POLL_DATA");
      _poll = payload.pollEditData.pollEditData.poll.question;
      _answerChoices = payload.pollEditData.pollEditData.answerChoices;
      console.log(payload);
      this.__emitChange();
      break;
  }
};

PollStore.isChecked = function(pollId) {
  return (typeof(_checkedPolls[pollId]) !== 'undefined');
};

PollStore.checkedPolls = function() {
  return _checkedPolls;
};

PollStore.getPoll = function() {
  return _poll;
};

PollStore.getAnswerChoices = function() {
  return _answerChoices;
};

window.PollStore = PollStore;

module.exports = PollStore;
