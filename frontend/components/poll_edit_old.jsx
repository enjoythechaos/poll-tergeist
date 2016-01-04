var React = require('react');
var ApiUtil = require('../util/api_util');
var PollStore = require('../stores/poll_store');
var History = require('react-router').History;
var Auth = require('./auth');
var NavBarTop = require('./nav_bar_top');

var PollEdit = React.createClass({
  mixins: [History, Auth],

  getInitialState: function() {
    return ({pollData: null});
  },

  _onChange: function() {
    this.setState({pollData: PollStore.getPollData()});
  },

  _backToPollIndex: function() {
    this.history.pushState(null, "/users/" + this.state.pollData.poll.author_id + "/polls", null);
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
          <div key={answerChoice.id} className="poll-form-line clearfix">
            <div className="poll-form-first-field">
              Answer Choice:
            </div>
            <div className="poll-form-text-field">
              <input type='text' size='60' onChange={this._updateAnswerChoice.bind(null, i)} value={answerChoice.body}></input>
            </div>
            <div className="poll-form-button-field">
              <button type='button' className="btn btn-default" onClick={this._deleteAnswerChoice.bind(null, answerChoice.id)}>Delete Answer Choice</button>
            </div>
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
        <NavBarTop/>
        <div className="center clearfix">
          <center><h2>Edit Poll {this.state.pollData.poll.url_string}</h2></center>
          <div className="poll-form clearfix">
            <div className="poll-form-line clearfix">
              <div className="poll-form-first-field">
                Question:
              </div>
              <div className="poll-form-text-field">
                <input type='text' size='60' onChange={this._updatePollQuestion} value={this.state.pollData.poll.question}></input>
              </div>
            </div>
            {this.getAnswerChoices()}
            <button type='button' className="btn btn-default" onClick={this._addAnswerChoice}>Add Answer Choice</button>
          </div>
          <button type='button' className="btn btn-default" onClick={this._updatePollButton}>Update Poll</button>
          <button type='button' className="btn btn-default" onClick={this._backToPollIndex}>Back to Poll Index Page</button>
        </div>
      </div>
    );
  }
});

module.exports = PollEdit;
