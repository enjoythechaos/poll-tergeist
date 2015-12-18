var MultiPollFormActions = require('../actions/multi_poll_form_actions');

var MultiPollFormUtil = {
  addPoll: function() {
    MultiPollFormActions.addPoll();
  },

  deletePoll: function(pollId) {
    MultiPollFormActions.deletePoll(pollId);
  },

  addAnswerChoice: function(pollId) {
    MultiPollFormActions.addAnswerChoice(pollId);
  },

  deleteAnswerChoice: function(pollId, answerId) {
    MultiPollFormActions.deleteAnswerChoice(pollId, answerId);
  },

  updatePollQuestion: function(pollId, e) {
    MultiPollFormActions.updatePollQuestion(pollId, e.target.value);
  },

  updateAnswerChoice: function(pollId, answerId, questionText) {
    MultiPollFormActions.updateAnswerChoice(pollId, answerId, questionText);
  }
};

module.exports = MultiPollFormUtil;
