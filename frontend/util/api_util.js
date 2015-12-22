var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  getPollGroupsFor: function(userId) {
    // I think this is okay for refactoring.
    $.get("/api/users/" + userId + "/polls", {}, function(results){
      ApiActions.receivePollGroups(results.pollGroups);
    });
  },

  fetchPollResult: function(pollId) {
    // I think this shouldn't need refactoring.
    $.get("/api/results/" + pollId, {}, function(result){
      ApiActions.receivePollResult(result.pollResult);
    });
  },

  saveTitle: function(pollGroupId, title, callBack) {
    // I think this shouldn't need refactoring.
    $.ajax({
      url: "/api/poll_groups/" + pollGroupId,
      data: {title: title, id: pollGroupId},
      method: "PATCH",
      complete: function(response) {
        this.getPollGroupsFor(response.responseText);
      }.bind(this)
    });
  },

  fetchPollAndAnswerChoices: function(pollId) {
    // No conflict here.
    $.get("/api/polls/" + pollId, {}, function(result) {
      ApiActions.fetchPollAndAnswerChoices(result.pollData);
    });
  },

  deleteAnswerChoice: function(answerChoiceId) {
    $.ajax({
      // This looks like it won't need to be refactored.
      url: "api/answer_choices/" + answerChoiceId,
      method: "DELETE",
      complete: function(answer_choice) {
        this.fetchPollAndAnswerChoices(parseInt(answer_choice.poll_id));
      }.bind(this)
    });
  },

  group: function(checkedPolls, callBack) {
    // This should be okay.
    $.ajax({
      url: "api/polls/group",
      data: {polls: checkedPolls},
      method: "PATCH",
      complete: function(results){
        ApiActions.receivePollGroups(results.responseJSON.pollGroups);
      }
    });
  },

  ungroup: function(checkedPolls, callBack) {
    $.ajax({
      url: "api/polls/ungroup",
      data: {polls: checkedPolls},
      method: "PATCH",
      complete: function(results){
        ApiActions.receivePollGroups(results.responseJSON.pollGroups);
      }
    });
  },

  addAnswerChoice: function(pollId) {
    // This should be okay.
    $.post("api/polls/" + pollId + "/answer_choices", {}, function(answer_choice) {
        this.fetchPollAndAnswerChoices(parseInt(answer_choice.poll_id));
    }.bind(this));
  },

  createResponse: function(answerChoiceId) {
    // This should be okay.
    $.post("api/responses", {answerChoiceId: answerChoiceId}, function(pollId) {
      this.fetchPollResult(pollId);
    }.bind(this));
  },

  updatePollAndAnswerChoices: function(pollData) {
    var poll = pollData.poll;
    var pollId = poll.id;
    var answerChoices = pollData.answerChoices;
    var that = this;
    // This should be okay.
    $.ajax({
      url: "api/answer_choices/update_batch",
      data: {answerChoices: answerChoices},
      type: "PATCH",
      complete: function() {
        $.ajax({
          url: "api/polls/" + pollId,
          type: "POST",
          data: {poll: poll},
          complete: function(){
            that.fetchPollAndAnswerChoices(pollId);
          }
        });
      }
    });
  }
};

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
