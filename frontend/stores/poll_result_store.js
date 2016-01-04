var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var PollResultStore = new Store(AppDispatcher);
var PollResultConstants = require('../constants/poll_result_constants');

var _pollResult = {};

PollResultStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case (PollResultConstants.RECEIVE_POLL_RESULT):
      _pollResult = payload.pollResult;
      this.__emitChange();
      break;
  }
};

PollResultStore.getPollResult = function() {
  return _pollResult;
};

module.exports = PollResultStore;
