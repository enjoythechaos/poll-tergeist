var React = require('react');
var PollStore = require('../stores/poll_store');
var ApiUtil = require('../util/api_util');
var AnswerChoices = require('./answer_choices');
var History = require('react-router').History;

var AnswerPoll = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return {pollData: null, selectedAnswerChoiceId: null};
  },

  _onChange: function() {
    this.setState({pollData: PollStore.getPollData()});
  },

  componentDidMount: function() {
    this.listenerToken = PollStore.addListener(this._onChange);
    ApiUtil.fetchPollAndAnswerChoicesByPollIdentifier(this.props.params.pollId);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  _selectAnswer: function(answerChoiceId, e) {
    this.setState({selectedAnswerChoiceId: answerChoiceId});
  },

  _createResponse: function() {
    ApiUtil.createResponse(this.state.selectedAnswerChoiceId, function(){
      debugger;
      this.history.pushState(null, "/thanks", null);
    }.bind(this));
  },

  render: function() {
    if (this.state.pollData === null) {
      return (<div></div>);
    }

    return (
      <div className="center">
        <div className="poll-result-question">
          {this.state.pollData.poll.question}
        </div>
        <div>
          <AnswerChoices answerChoices={this.state.pollData.answerChoices} _selectAnswer={this._selectAnswer}/>
          <button type="button" className="btn btn-default" onClick={this._createResponse}>Submit Answer</button>
        </div>
      </div>
    );
  }
});

module.exports = AnswerPoll;
