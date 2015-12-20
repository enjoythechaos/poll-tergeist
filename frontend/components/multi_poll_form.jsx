var React = require('react');
var PollForm = require('./poll_form');
var PollUtil = require('../util/poll_util');

var MultiPollForm = React.createClass({
  getInitialState: function() {
    return({
      pollFormData: {
        authorId: this.props.params.userId,
        nextId: 0
      },
      questionText: ""
    });
  },

  _createAll: function(e) {
    e.preventDefault();
    PollUtil.createBatch(this.state.pollFormData, function(){
      this.props.history.pushState(null, "/users/" + this.props.params.userId + "/polls");
    }.bind(this));
  },

  _addPollForm: function(e) {
    this.state.pollFormData[this.state.pollFormData.nextId] = {
      questionText: e.target.value,
      answerChoices: {
        0: {answerText: ""},
        1: {answerText: ""},
        nextId: 2
      }
    };

    this.state.pollFormData.nextId++;
    this.setState({pollFormData: this.state.pollFormData, questionText: ""});
  },

  _deletePollForm: function(pollId, e) {
    delete this.state.pollFormData[pollId];
    this.setState({pollFormData: this.state.pollFormData});
  },

  _deleteAnswerChoice: function(pollFormId, answerChoiceId) {
    delete this.state.pollFormData[pollFormId].answerChoices[answerChoiceId];
    this.setState({pollFormData: this.state.pollFormData});
  },

  _addAnswerChoice: function(pollFormId) {
    this.state.pollFormData[pollFormId].answerChoices[this.state.pollFormData[pollFormId].answerChoices.nextId] = { answerText: ""};
    this.state.pollFormData[pollFormId].answerChoices.nextId++;
    this.setState({pollFormData: this.state.pollFormData});
  },

  _updateAnswerChoice: function(pollFormId, answerChoiceId, e) {
    this.state.pollFormData[pollFormId].answerChoices[answerChoiceId].answerText = e.target.value;
    this.setState({pollFormData: this.state.pollFormData});
  },

  _updateQuestionText: function(pollFormId, e) {
    this.state.pollFormData[pollFormId].questionText = e.target.value;
    this.setState({pollFormData: this.state.pollFormData});
  },

  render: function() {
    var pollFormContent = [];
    for(var id in this.state.pollFormData) {
      if(this.state.pollFormData.hasOwnProperty(id) && id !== 'nextId' && id !== 'authorId') {
        pollFormContent.push(
          <div>
            <PollForm
              _deletePollForm={this._deletePollForm.bind(this, id)}
              _deleteAnswerChoice={this._deleteAnswerChoice.bind(this, id)}
              _updateAnswerChoice={this._updateAnswerChoice.bind(this, id)}
              _addAnswerChoice={this._addAnswerChoice.bind(this, id)}
              _updateQuestionText={this._updateQuestionText.bind(this, id)}
              answerChoices={this.state.pollFormData[id].answerChoices}
              questionText={this.state.pollFormData[id].questionText}
              id={id}
            />
          </div>
        );
      }
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
