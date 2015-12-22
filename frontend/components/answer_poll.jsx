var React = require('react');
var PollStore = require('../stores/poll_store');
var ApiUtil = require('../util/api_util');
var AnswerChoices = require('./answer_choices');

var AnswerPoll = React.createClass({
  getInitialState: function() {
    return {pollData: null, selectedAnswerChoiceId: null};
  },

  _onChange: function() {
    this.setState({pollData: PollStore.getPollData()});
  },

  componentDidMount: function() {
    this.listenerToken = PollStore.addListener(this._onChange);
    ApiUtil.fetchPollAndAnswerChoices(this.props.params.pollId);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  _selectAnswer: function(answerChoiceId, e) {
    this.setState({selectedAnswerChoiceId: answerChoiceId});
  },

  _createResponse: function() {
    ApiUtil.createResponse(this.state.selectedAnswerChoiceId);
  },

  render: function() {
    if (this.state.pollData === null) {
      return (<div></div>);
    }

    return (
      <div>
        <div>
          {this.state.pollData.poll.question}
        </div>
        <AnswerChoices answerChoices={this.state.pollData.answerChoices} _selectAnswer={this._selectAnswer}/>
        <button type='submit' onClick={this._createResponse}>Submit Answers</button>
      </div>
    );
  }
});

module.exports = AnswerPoll;
