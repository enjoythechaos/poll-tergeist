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

  //   for (var pollForm in pollFormData) {
  //     var cond1 = pollFormData.hasOwnProperty(pollForm);
  //     var cond2 = (pollForm !== 'nextId');
  //     var cond3 = (pollForm !== 'authorId');
  //     debugger;
  //
  //     if (cond1 && cond2 && cond3) {
  //       $.post("users/" + pollFormData.authorId + "/api/polls", {poll: {questionText: pollFormData[pollForm].questionText}}, function(poll) {
  //         var answerChoices = [];
  //         // var staticPollForm = pollFormData[pollForm];
  //         for(var answerChoice in pollFormData[staticPollForm].answerChoices) {
  //           if (pollFormData[staticPollForm].answerChoices.hasOwnProperty(answerChoice) && answerChoice !== 'nextId') {
  //             answerChoices.push({poll_id: poll.id, answerText: answerChoice.answerText});
  //           }
  //         }
  //         alert("staticPollForm = " + pollForm);
  //         debugger;
  //         $.ajax({
  //           url: "api/answer_choices/create_batch",
  //           data: {answerChoices: answerChoices},
  //           type: "PUT",
  //           complete: function() {
  //             alert("created a set of answer choices.");
  //           }
  //         });
  //       });
  //     }
  //   }
  //
  // }

module.exports = PollUtil;
