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
};

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
