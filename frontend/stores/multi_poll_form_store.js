var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var MultiPollFormStore = new Store(AppDispatcher);
var MultiPollFormConstants = require('../constants/multi_poll_form_constants');

var _contents = {
  nextKey: 0
};

MultiPollFormStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case (MultiPollFormConstants.ADD_POLL):
      _contents[_contents.nextKey] = {
        questionText: "",
        answerChoices: {
          0: "",
          1: "",
          nextKey: 2
        }
      };
      _contents.nextKey++;
      this.__emitChange();
      break;

    case (MultiPollFormConstants.DELETE_POLL):
      delete _contents[payload.pollId];
      this.__emitChange();
      break;

    case (MultiPollFormConstants.ADD_ANSWER_CHOICE):
      _contents[payload.pollId].nextKey = {answerText: ""};
      _contents[payload.pollId].nextKey++;
      this.__emitChange();
      break;

    case (MultiPollFormConstants.DELETE_ANSWER_CHOICE):
      delete _contents[payload.pollId][payload.answerId];
      this.__emitChange();
      break;

    case (MultiPollFormConstants.UPDATE_POLL_QUESTION):
      _contents[payload.pollId].questionText = payload.questionText;
      this.__emitChange();
      break;

    case (MultiPollFormConstants.UPDATE_ANSWER_CHOICE):
      _contents[payload.pollId][payload.answerId] = payload.answerText;
      this.__emitChange();
      break;
  }
};

window.MultiPollFormStore = MultiPollFormStore;

module.exports = MultiPollFormStore;
