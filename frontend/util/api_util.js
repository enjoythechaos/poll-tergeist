var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  getPollGroupsFor: function(userId) {
    $.get("/users/" + userId + "/api/polls", {}, function(results){
      ApiActions.receivePollGroups(results.pollGroups);
    });
  },

  fetchPollResult: function(pollId) {
    $.get("api/results/" + pollId, {}, function(result){
      ApiActions.receivePollResult(result.pollResult);
    });
  },

  saveTitle: function(pollGroupId, title, callBack) {
    $.ajax({
      url: "api/poll_groups/" + pollGroupId,
      data: {title: title, id: pollGroupId},
      method: "PATCH",
      complete: function(response) {
        this.getPollGroupsFor(response.responseText);
      }.bind(this)
    });
  },

  fetchPollAndAnswerChoices: function(pollId) {
    $.get("/api/polls/" + pollId, {}, function(result) {
      ApiActions.fetchPollAndAnswerChoices(result.pollData);
    });
  },

  deleteAnswerChoice: function(answerChoiceId) {
    $.ajax({
      url: "api/answer_choices/" + answerChoiceId,
      method: "DELETE",
      complete: function(answer_choice) {
        this.fetchPollAndAnswerChoices(parseInt(answer_choice.poll_id));
      }.bind(this)
    });
  },

  group: function(checkedPolls, callBack) {
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
      method: "POST",
      complete: function(results){
        ApiActions.receivePollGroups(results.responseJSON.pollGroups);
      }
    });
  },

  addAnswerChoice: function(pollId) {
    $.post("api/polls/" + pollId + "/answer_choices", {}, function(answer_choice) {
        this.fetchPollAndAnswerChoices(parseInt(answer_choice.poll_id));
    }.bind(this));
  },

  createResponse: function(answerChoiceId) {
    $.post("api/responses", {answerChoiceId: answerChoiceId}, function(pollId) {
      this.fetchPollResult(pollId);
    }.bind(this));
  },

  updatePollAndAnswerChoices: function(pollEditData) {
    var poll = pollEditData.pollEditData.poll;
    var pollId = poll.id;
    var answerChoices = pollEditData.pollEditData.answerChoices;
    var that = this;
    $.ajax({
      url: "api/answer_choices/update_batch",
      data: {answerChoices: answerChoices},
      type: "PATCH",
      complete: function() {
        $.ajax({
          url: "api/polls/" + pollId,
          type: "PATCH",
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
