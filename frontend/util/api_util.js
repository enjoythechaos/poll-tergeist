var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  logIn: function(options) {
    $.ajax({
      url: "/api/session",
      method: "POST",
      data: {user: {username: options.username, password: options.password}},
      complete: options.complete
    });
  },

  signUp: function(options) {
    $.ajax({
      url: "/api/users",
      method: "POST",
      data: {user: {username: options.username, password: options.password}},
      complete: options.complete
    });
  },

  logOut: function(callBack) {
    $.ajax({
      url: "/api/session",
      type : "DELETE",
      complete: callBack
    });
  },

  getCurrentUser: function(callBack) {
    $.ajax({
      url: "/api/session",
      method: "GET",
      complete: callBack
    });
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

  fetchPollAndAnswerChoicesByPollIdentifier: function(pollId) {
    var m = pollId.match(/^([a-zA-Z]+)([0-9]+)$/)
    if (m !== null) {
      $.get("/api/polls/" + pollId + "/get_by_poll_identifier", {}, function(result) {
        ApiActions.fetchPollAndAnswerChoices(result.pollData);
      });
    }
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
    $.ajax({
      url: "api/polls/delete_responses",
      data: {polls: checkedPolls},
      method: "DELETE",
      complete: function(results) {
        ApiActions.receivePollGroups(results.responseJSON.pollGroups);
      }
    });
  },

  addAnswerChoice: function(pollId) {
    $.post("api/polls/" + pollId + "/answer_choices", {}, function(answer_choice) {
        this.fetchPollAndAnswerChoices(parseInt(answer_choice.poll_id));
    }.bind(this));
  },

  createResponse: function(answerChoiceId, callBack) {
    $.post("api/responses", {answerChoiceId: answerChoiceId}, callBack);
  },

  updatePollAndAnswerChoices: function(pollData, callBack) {
    var poll = pollData.poll;
    var pollId = poll.id;
    var answerChoices = pollData.answerChoices;
    var that = this;
    $.ajax({
      url: "/api/polls/update_with_answer_choices",
      data: pollData,
      type: "PATCH",
      complete: callBack
      // complete: function(response) {
      //   ApiActions.fetchPollAndAnswerChoices(response.responseJSON.pollData);
      // }
    });
  }
};

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
