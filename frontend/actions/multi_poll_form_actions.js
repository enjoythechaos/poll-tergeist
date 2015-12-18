var MultiPollFormConstants = require('../constants/multi_poll_form_constants');
var AppDispatcher = require('../dispatcher/dispatcher.js');

var MultiPollFormActions = {
  addPoll: function() {
    AppDispatcher.dispatch({
      actionType: MultiPollFormConstants.ADD_POLL
    });
  },

  deletePoll: function(pollId) {
    AppDispatcher.dispatch({
      actionType: MultiPollFormActions.DELETE_POLL,
      pollId: pollId
    });
  },

  addAnswerChoice: function(pollId) {
    AppDispatcher.dispatch({
      actionType: MultiPollFormConstants.ADD_ANSWER_CHOICE,
      pollId: pollId
    });
  },

  deleteAnswerChoice: function(pollId, answerId) {
    AppDispatcher.dispatch({
      actiontype: MultiPollFormConstants.DELETE_ANSWER_CHOICE,
      pollId: pollId,
      answerId: answerId
    });
  },

  updatePollQuestion: function(pollId, questionText) {
    AppDispatcher.dispatch({
      actionType: MultiPollFormConstants.UPDATE_POLL_QUESTION,
      pollId: pollId,
      questionText: questionText
    });
  },

  updateAnswerChoice: function(pollId, answerId, answerText) {
    AppDispatcher.dispatch({
      actionType: MultiPollFormConstants.UPDATE_ANSWER_CHOICE,
      pollId: pollId,
      answerId: answerId,
      answerText: answerText
    });
  }
};

module.exports = MultiPollFormActions;
