var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  getCurrentUser: function(callBack) {
    $.get("/api/session", {}, callBack);
  },

  getPollGroupsFor: function(userId) {
    $.get("/api/users/" + userId + "/polls", {}, function(results){
      ApiActions.receivePollGroups(results.pollGroups);
    });
  },

  fetchPollResult: function(pollId) {
    $.get("/api/results/" + pollId, {}, function(result){
      ApiActions.receivePollResult(result.pollResult);
    });
  },

  saveTitle: function(pollGroupId, title, callBack) {
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
    $.get("/api/polls/" + pollId, {}, function(result) {
      ApiActions.fetchPollAndAnswerChoices(result.pollData);
    });
  },

  deleteAnswerChoice: function(answerChoiceId) {
    $.ajax({
      url: "api/answer_choices/" + answerChoiceId,
      method: "DELETE",
      complete: function(answer_choice) {
        this.fetchPollAndAnswerChoices(parseInt(answer_choice.responseJSON.poll_id));
      }.bind(this)
    });
  },

  group: function(checkedPolls) {
    $.ajax({
      url: "api/polls/group",
      data: {polls: checkedPolls},
      method: "PATCH",
      complete: function(results){
        ApiActions.receivePollGroups(results.responseJSON.pollGroups);
      }
    });
  },

  ungroup: function(checkedPolls) {
    $.ajax({
      url: "api/polls/ungroup",
      data: {polls: checkedPolls},
      method: "PATCH",
      complete: function(results){
        ApiActions.receivePollGroups(results.responseJSON.pollGroups);
      }
    });
  },

  deletePollBatch: function(checkedPolls) {
    $.ajax({
      url: "api/polls/delete_batch",
      data: {polls: checkedPolls},
      method: "DELETE",
      complete: function(results){
        ApiActions.receivePollGroups(results.responseJSON.pollGroups);
      }
    });
  },

  deleteResponses: function(checkedPolls) {
    console.log("Got into ApiUtil.deleteResponses");
    $.ajax({
      url: "api/polls/delete_responses",
      data: {polls: checkedPolls},
      method: "DELETE",
      complete: function(results){
        console.log("Got into ApiUtil.deleteResponses success callback");
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

  updatePollAndAnswerChoices: function(pollData, callBack) {
    var poll = pollData.poll;
    var pollId = poll.id;
    var answerChoices = pollData.answerChoices;
    var that = this;
    $.ajax({
      url: "api/answer_choices/update_batch",
      data: {answerChoices: answerChoices},
      type: "PATCH",
      complete: function() {
        $.ajax({
          url: "api/polls/" + pollId,
          type: "PUT",
          data: {poll: poll},
          complete: function(){
            //callBack();
            that.fetchPollAndAnswerChoices(pollId);
          }
        });
      }
    });
  }
};

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
