var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  getPollGroupsFor: function(userId) {
    $.get("/users/" + userId + "/api/polls", {}, function(results){
      ApiActions.receivePollGroups(results);
    });
  },

  checkPolls: function(pollIds) {
    console.log("Got into ApiUtil.checkPolls");
    ApiActions.checkPolls(pollIds);
  },

  uncheckAll: function() {
    ApiActions.uncheckAll();
  },

  uncheckPolls: function(pollIds) {
    console.log("Got into ApiUtil.uncheckPolls");
    ApiActions.uncheckPolls(pollIds);
  },

  fetchPollAndAnswerChoices: function(pollId) {
    console.log("Got into ApiUtil.fetchPollAndAnswerChoices");
    $.get("/api/polls/" + pollId, {}, function(pollEditData) {
      console.log("...Got into success callback for fetchPollAndAnswerChoices");
      ApiActions.fetchPollAndAnswerChoices(pollEditData);
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
    this.uncheckAll();
    $.ajax({
      url: "api/polls/group",
      data: {polls: checkedPolls},
      method: "PATCH",
      complete: callBack
    });
  },

  ungroup: function(checkedPolls, callBack) {
    this.uncheckAll();
    $.ajax({
      url: "api/polls/ungroup",
      data: {polls: checkedPolls},
      method: "POST",
      complete: callBack
    });
  },

  addAnswerChoice: function(pollId) {
    $.post("api/polls/" + pollId + "/answer_choices", {}, function(answer_choice) {
        this.fetchPollAndAnswerChoices(parseInt(answer_choice.poll_id));
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
        //alert("Got into the first success function");
        $.ajax({
          url: "api/polls/" + pollId,
          type: "PATCH",
          data: {poll: poll},
          complete: function(){
            //alert("Got into the second success function!");
            that.fetchPollAndAnswerChoices(pollId);
          }
        });
      }
    });
  }
};

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
