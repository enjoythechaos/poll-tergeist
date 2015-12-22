var React = require('react');
var PollForm = require('./poll_form');
var PollUtil = require('../util/poll_util');

var MultiPollForm = React.createClass({
  getInitialState: function() {
    return({
      pollFormData: [],
      questionText: ""
    });
  },

  _createAll: function(e) {
    e.preventDefault();
    PollUtil.createBatch(this.state.pollFormData, this.props.params.userId, function() {
      this.props.history.pushState(null, "/users/" + this.props.params.userId + "/polls");
    }.bind(this));
  },

  _addPollForm: function(e) {
    this.state.pollFormData.push({
      questionText: e.target.value,
      answerChoices: [{answerText: ""}, {answerText: ""}]
    });
    this.setState({pollFormData: this.state.pollFormData, questionText: ""});
  },

  _deletePollForm: function(pollFormIndex, e) {
    this.state.pollFormData.splice(pollFormIndex, 1);
    this.setState({pollFormData: this.state.pollFormData});
  },

  _deleteAnswerChoice: function(pollFormIndex, answerChoiceIndex) {
    this.state.pollFormData[pollFormIndex].splice(answerChoiceIndex, 1);
    this.setState({pollFormData: this.state.pollFormData});
  },

  _addAnswerChoice: function(pollFormIndex) {
    this.state.pollFormData[pollFormIndex].answerChoices.push({answerText: ""});
    this.setState({pollFormData: this.state.pollFormData});
  },

  _updateAnswerChoice: function(pollFormIndex, answerChoiceIndex, e) {
    this.state.pollFormData[pollFormIndex].answerChoices[answerChoiceIndex].answerText = e.target.value;
    this.setState({pollFormData: this.state.pollFormData});
  },

  _updateQuestionText: function(pollFormIndex, e) {
    this.state.pollFormData[pollFormIndex].questionText = e.target.value;
    this.setState({pollFormData: this.state.pollFormData});
  },

  render: function() {
    var pollFormContent = [];
    for(var pollFormIndex=0; pollFormIndex < this.state.pollFormData.length; pollFormIndex++) {
      pollFormContent.push(
        <div>
          <PollForm
            _deletePollForm={this._deletePollForm.bind(this, pollFormIndex)}
            _deleteAnswerChoice={this._deleteAnswerChoice.bind(this, pollFormIndex)}
            _updateAnswerChoice={this._updateAnswerChoice.bind(this, pollFormIndex)}
            _addAnswerChoice={this._addAnswerChoice.bind(this, pollFormIndex)}
            _updateQuestionText={this._updateQuestionText.bind(this, pollFormIndex)}
            answerChoices={this.state.pollFormData[pollFormIndex].answerChoices}
            questionText={this.state.pollFormData[pollFormIndex].questionText}
            id={pollFormIndex}
          />
        </div>
      );
    }
    return (
      <div>
        {pollFormContent}
        Add a Poll:
        <br></br>
        <input type='text' onChange={this._addPollForm} value={this.state.questionText}/>
        <br></br>
        <button type='submit' onClick={this._createAll}>Create Polls</button>
      </div>
    );
  }
});

module.exports = MultiPollForm;
