var React = require('react');
var ApiUtil = require('../util/api_util');
var PollStore = require('../stores/poll_store');
var History = require('react-router').History;
var Auth = require('./auth');

var PollEdit = React.createClass({
  mixins: [History, Auth],

  getInitialState: function() {
    return ({pollData: null});
  },

  _onChange: function() {
    this.setState({pollData: PollStore.getPollData()});
  },

  componentDidMount: function() {
    this.listenerToken = PollStore.addListener(this._onChange);
    ApiUtil.fetchPollAndAnswerChoices(parseInt(this.props.params.pollId));
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  _updateAnswerChoice: function(i, e) {
    var newPollData = this.state.pollData;
    newPollData.answerChoices[i].body = e.target.value;
    this.setState({pollData: newPollData});
  },

  _deleteAnswerChoice: function(answerChoiceId, e) {
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
    ApiUtil.updatePollAndAnswerChoices(this.state.pollData, ApiUtil.fetchPollAndAnswerChoices.bind(null, parseInt(this.props.params.pollId)));
  },

  _updatePollButton: function() {
    ApiUtil.updatePollAndAnswerChoices(this.state.pollData, function(){
      this.history.pushState(null, "/users/" + this.state.pollData.poll.author_id + "/polls", null);
    }.bind(this));
  },

  _updatePollQuestion: function(e) {
    this.state.pollData.poll.question = e.target.value;
    this.setState({pollData: this.state.pollData});
  },

  getAnswerChoices: function() {
    return (
      this.state.pollData.answerChoices.map(function(answerChoice, i){
        return (
          <div key={answerChoice.id}>
            <input type='text' onChange={this._updateAnswerChoice.bind(null, i)} value={answerChoice.body}></input>
            <button type='submit' onClick={this._deleteAnswerChoice.bind(null, answerChoice.id)}>Delete Answer Choice</button>
          </div>
        );
      }.bind(this))
    );
  },

  render: function() {
    if (this.state.pollData === null) {
      return (<div></div>);
    }

    return (
      <div>
        <label>
          Question:
          <input type='text' onChange={this._updatePollQuestion} value={this.state.pollData.poll.question}></input>
        </label>
        {this.getAnswerChoices()}
        <br></br>
        <button type='submit' onClick={this._addAnswerChoice}>Add Answer Choice</button>
        <br></br>
        <button type='submit' onClick={this._updatePollButton}>Update Poll</button>
      </div>
    );
  }
});

module.exports = PollEdit;
