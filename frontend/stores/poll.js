var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var PollStore = new Store(AppDispatcher);
var PollConstants = require('../constants/poll_constants');

var _checkedPolls = {};
var _poll = {};
var _answerChoices = [];
var _pollEditData = {};

PollStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case (PollConstants.CHECK_POLLS):
      for(var i = 0; i < payload.pollIds.length; i++) {
        _checkedPolls[payload.pollIds[i]] = true;
      }
      this.__emitChange();
      break;
    case (PollConstants.UNCHECK_POLLS):
      for(var i = 0; i < payload.pollIds.length; i++) {
        if (_checkedPolls[payload.pollIds[i]]) {
          delete _checkedPolls[payload.pollIds[i]];
        }
      }
      this.__emitChange();
      break;
    case (PollConstants.RECEIVE_EDIT_POLL_DATA):
      _pollEditData = payload.pollEditData;
      _checkedPolls = {};
      this.__emitChange();
      break;
    case (PollConstants.UNCHECK_ALL):
      _checkedPolls = {};
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

PollStore.getPollEditData = function() {
  return _pollEditData;
};

window.PollStore = PollStore;

module.exports = PollStore;
