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
    var pollData = PollStore.getPollData();
    pollData.toBeDeleted = [];
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

  _deleteAnswerChoice: function(i, e) {
    e.preventDefault();
    var answerChoiceId = this.state.pollData.answerChoices[i].id;
    this.state.pollData.toBeDeleted.push(answerChoiceId);
    this.setState({pollData: this.state.pollData});
    this.state.pollData.answerChoices.splice(i, 1);
    this.setState({pollData: this.state.pollData});
  },

  _addAnswerChoice: function(e) {
    e.preventDefault();
    var pollId = this.state.pollData.poll.id;
    this.state.pollData.answerChoices.push({id: null, poll_id: pollId, letter: "Z", body: ""});
    this.setState({pollData: this.state.pollData});
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
          <div key={i} className="poll-form-line clearfix">
            <div className="poll-form-first-field">
              Answer Choice:
            </div>
            <div className="poll-form-text-field">
              <input type='text' size='60' onChange={this._updateAnswerChoice.bind(null, i)} value={answerChoice.body}></input>
            </div>
            <div className="poll-form-button-field">
              <button type='button' className="btn btn-default" onClick={this._deleteAnswerChoice.bind(null, i)}>Delete Answer Choice</button>
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
          <button type='button' className="btn btn-default" onClick={this._backToPollIndex}>Cancel</button>
        </div>
      </div>
    );
  }
});

module.exports = PollEdit;
