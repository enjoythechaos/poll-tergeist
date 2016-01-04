var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var PollGroupStore = new Store(AppDispatcher);
var PollGroupConstants = require('../constants/poll_group_constants');

var _pollGroups = {};

PollGroupStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case (PollGroupConstants.RECEIVE_POLLGROUPS):
      this.receivePollGroups(payload.pollGroups);
      this.__emitChange();
      break;
  }
};

PollGroupStore.getPollGroups = function() {
  return _pollGroups;
};

PollGroupStore.receivePollGroups = function(pollGroups) {
  _pollGroups = pollGroups;
};

module.exports = PollGroupStore;
