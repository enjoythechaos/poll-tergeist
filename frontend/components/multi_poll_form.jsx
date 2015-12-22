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
    var options = {
      data: this.state.pollFormData,
      userId: this.props.params.userId,
      success: function() {
        this.props.history.pushState(null, "/users/" + this.props.params.userId + "/polls");
      }.bind(this)
    };
    debugger;
    PollUtil.createBatch(options);
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
    var pollFormToUpdate = this.state.pollFormData[pollFormIndex];
    var answerChoiceToUpdate = pollFormToUpdate.answerChoices[answerChoiceIndex];
    answerChoiceToUpdate.answerText = e.target.value;
    //this.state.pollFormData[pollFormIndex].answerChoices[answerChoiceIndex].answerText = e.target.value;
    this.setState({pollFormData: this.state.pollFormData});
  },

  _updateQuestionText: function(pollFormIndex, e) {
    this.state.pollFormData[pollFormIndex].questionText = e.target.value;
    this.setState({pollFormData: this.state.pollFormData});
  },

  getMultiPollForm: function() {
    return (
      this.state.pollFormData.map(function(pollForm, idx){
        return (
          <PollForm
            key={idx}
            _deletePollForm={this._deletePollForm.bind(this, idx)}
            _deleteAnswerChoice={this._deleteAnswerChoice.bind(this, idx)}
            _updateAnswerChoice={this._updateAnswerChoice.bind(this, idx)}
            _addAnswerChoice={this._addAnswerChoice.bind(this, idx)}
            _updateQuestionText={this._updateQuestionText.bind(this, idx)}
            answerChoices={pollForm.answerChoices}
            questionText={pollForm.questionText}
            id={idx}
          />
        );
      }.bind(this))
    );
  },

  render: function() {
    return (
      <div>
        {this.getMultiPollForm()}
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
