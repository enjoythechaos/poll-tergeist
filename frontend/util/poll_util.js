var PollActions = require('../actions/multi_poll_form_actions');

var PollUtil = {
  createBatch: function(options) {
    $.ajax({
      url: "/api/users/" + options.userId + "/polls/create_batch",
      data: {batch: options.data},
      type: "POST",
      complete: options.success
    });
  }
};
module.exports = PollUtil;
