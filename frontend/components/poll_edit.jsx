var React = require('react');
var ApiUtil = require('../util/api_util');
var PollStore = require('../stores/poll');

var PollEdit = React.createClass({
  getInitialState: function() {
    return ({question: "", answerChoices: []});
  },

  _onChange: function() {
    var question = PollStore.getPoll();
    var answerChoices = PollStore.getAnswerChoices();
    this.setState({question: PollStore.getPoll(), answerChoices: PollStore.getAnswerChoices().map(function(ac){return ac.body;})});
  },

  componentDidMount: function() {
    PollStore.addListener(this._onChange);
    ApiUtil.fetchPollAndAnswerChoices(parseInt(this.props.params.pollId));
  },

  _updateAnswerChoice: function(i, e) {
    var newAnswerChoices = this.state.answerChoices;
    newAnswerChoices[i] = e.target.value;
    this.setState({answerChoices: newAnswerChoices});
  },

  _deleteAnswerChoice: function(i, e) {
    e.preventDefault();
    var newAnswerChoices = this.state.answerChoices;
    newAnswerChoices.splice(i, 1);
    this.setState({answerChoices: newAnswerChoices});
  },

  _addAnswerChoice: function(e) {
    e.preventDefault();
    var newAnswerChoices = this.state.answerChoices;
    newAnswerChoices.push("");
    this.setState({answerChoices: newAnswerChoices});
  },

  _updatePoll: function() {
    alert("This will eventually update the poll.");
  },

  render: function() {
    var answerChoiceContent = [];
    for(var i = 0; i < this.state.answerChoices.length; i++) {
      answerChoiceContent.push(
        <div>
          <input type='text' onChange={this._updateAnswerChoice.bind(null, i)} value={this.state.answerChoices[i]}></input>
          <button type='submit' onClick={this._deleteAnswerChoice.bind(null, i)}>Delete Answer Choice</button>
        </div>
      );
    }
    return (
      <div>
        <label>
          Question:
          <input type='text' onChange={this._updatePollQuestion} value={this.state.question}></input>
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
