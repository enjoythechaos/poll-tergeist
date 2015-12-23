var React = require('react');
var ApiUtil = require('../util/api_util');
var AnswerChoiceTally = require('./answer_choice_tally');
var PollResultStore = require('../stores/poll_result_store');
var Auth = require('./auth');

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

    return (
      <div>
        <div>
          {this.state.pollResult.question}
        </div>
        <div>
          {this.state.pollResult.results.map(function(result){
            return (
              <AnswerChoiceTally key={result.answerChoiceId}
                                 answerChoiceText={result.answerChoiceText}
                                 count={result.count} />
            );
          })}
        </div>
      </div>
    );
  }
});

module.exports = PollResult;
