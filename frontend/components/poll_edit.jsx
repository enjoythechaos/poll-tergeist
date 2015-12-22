var React = require('react');
var ApiUtil = require('../util/api_util');
var PollStore = require('../stores/poll_store');

var PollEdit = React.createClass({
  getInitialState: function() {
    return ({pollData: null});
  },

  _onChange: function() {
    this.setState({pollData: PollStore.getPollData()});
  },

  componentDidMount: function() {
    PollStore.addListener(this._onChange);
    ApiUtil.fetchPollAndAnswerChoices(parseInt(this.props.params.pollId));
  },

  _updateAnswerChoice: function(i, e) {
    var newPollData = this.state.pollData;
    newPollData.answerChoices[i].body = e.target.value;
    this.setState({pollData: newPollData});
  },

  _deleteAnswerChoice: function(answerChoiceId, e) {
    debugger;
    e.preventDefault();
    this._updatePoll();
    ApiUtil.deleteAnswerChoice(answerChoiceId);
  },

  _addAnswerChoice: function(e) {
    e.preventDefault();
    var pollId = this.state.pollData.poll.id;
    this._updatePoll();
    ApiUtil.addAnswerChoice(pollId);
  },

  _updatePoll: function() {
    ApiUtil.updatePollAndAnswerChoices(this.state.pollData);
  },

  _updatePollQuestion: function(e) {
    this.state.pollData.poll.question = e.target.value;
    this.setState({pollData: this.state.pollData});
  },

  render: function() {
    if (this.state.pollData === null) {
      return (<div></div>);
    }
    debugger;
    var answerChoiceContent = [];
    for(var i = 0; i < this.state.pollData.answerChoices.length; i++) {
      answerChoiceContent.push(
        <div>
          <input type='text' onChange={this._updateAnswerChoice.bind(null, i)} value={this.state.pollData.answerChoices[i].body}></input>
          <button type='submit' onClick={this._deleteAnswerChoice.bind(null, this.state.pollData.answerChoices[i].id)}>Delete Answer Choice</button>
        </div>
      );
    }

    return (
      <div>
        <label>
          Question:
          <input type='text' onChange={this._updatePollQuestion} value={this.state.pollData.poll.question}></input>
        </label>
        {answerChoiceContent}
        <br></br>
        <button type='submit' onClick={this._addAnswerChoice}>Add Answer Choice</button>
        <br></br>
        <button type='submit' onClick={this._updatePoll}>Update Poll</button>
      </div>
    );
  }
});

module.exports = PollEdit;
