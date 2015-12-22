var React = require('react');
var ApiUtil = require('../util/api_util');
var AnswerChoiceTally = require('./answer_choice_tally');
var PollResultStore = require('../stores/poll_result_store');

var PollResult = React.createClass({
  getInitialState: function() {
    return {pollResult: null};
  },

  _onChange: function() {
    this.setState({pollResult: PollResultStore.getPollResult()});
  },

  componentDidMount: function() {
    var pollId = this.props.params.pollId;
    this.listenerToken = PollResultStore.addListener(this._onChange);
    ApiUtil.fetchPollResult(pollId);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  render: function() {
    if (this.state.pollResult === null) {
      return (<div>No poll results</div>);
    }
    var pollResultContent = [];
    pollResultContent.push(
      <div>
        {this.state.pollResult.question}
      </div>
    );
    for(var i=0; i < this.state.pollResult.results.length; i++) {
      pollResultContent.push(
        <AnswerChoiceTally
          key={this.state.pollResult.results[i].answerChoiceId}
          answerChoiceText={this.state.pollResult.results[i].answerChoiceText}
          count={this.state.pollResult.results[i].count}
        />
      );
    }
    return (<div>{pollResultContent}</div>);
  }
});

module.exports = PollResult;
