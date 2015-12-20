var PollActions = require('../actions/multi_poll_form_actions');

var PollUtil = {
  createBatch: function(pollFormData, callBack) {
    $.ajax({
      url: "users/" + pollFormData.authorId + "/api/polls/create_batch",
      data: {batch: pollFormData},
      type: "PUT",
      complete: callBack
    });
  }
};
module.exports = PollUtil;
