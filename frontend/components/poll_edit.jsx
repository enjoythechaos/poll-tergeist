var React = require('react');
var ApiUtil = require('../util/api_util');
var PollStore = require('../stores/poll');

var PollEdit = React.createClass({
  getInitialState: function() {
    return ({pollEditData: {}});
    //return ({pollEditData: PollStore.getPollEditData()});
  },

  _onChange: function() {
    this.setState({pollEditData: PollStore.getPollEditData()});
  },

  componentDidMount: function() {
    PollStore.addListener(this._onChange);
    ApiUtil.fetchPollAndAnswerChoices(parseInt(this.props.params.pollId));
  },

  _updateAnswerChoice: function(i, e) {
    var newPollEditData = this.state.pollEditData;
    newPollEditData.pollEditData.answerChoices[i].body = e.target.value;
    this.setState({pollEditData: newPollEditData});
  },

  _deleteAnswerChoice: function(answerChoiceId, e) {
    e.preventDefault();
    this._updatePoll();
    ApiUtil.deleteAnswerChoice(answerChoiceId);
  },

  _addAnswerChoice: function(e) {
    e.preventDefault();
    var pollId = this.state.pollEditData.pollEditData.poll.id;
    this._updatePoll();
    ApiUtil.addAnswerChoice(pollId);
  },

  _updatePoll: function() {
    ApiUtil.updatePollAndAnswerChoices(this.state.pollEditData);
  },

  _updatePollQuestion: function(e) {
    this.state.pollEditData.pollEditData.poll.question = e.target.value;
    this.setState({pollEditData: this.state.pollEditData});
  },

  render: function() {
    if (this.state.pollEditData.pollEditData === undefined) {
      return (<div></div>);
    }
    var answerChoiceContent = [];
    for(var i = 0; i < this.state.pollEditData.pollEditData.answerChoices.length; i++) {
      answerChoiceContent.push(
        <div>
          <input type='text' onChange={this._updateAnswerChoice.bind(null, i)} value={this.state.pollEditData.pollEditData.answerChoices[i].body}></input>
          <button type='submit' onClick={this._deleteAnswerChoice.bind(null, this.state.pollEditData.pollEditData.answerChoices[i].id)}>Delete Answer Choice</button>
        </div>
      );
    }
    return (
      <div>
        <label>
          Question:
          <input type='text' onChange={this._updatePollQuestion} value={this.state.pollEditData.pollEditData.poll.question}></input>
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
