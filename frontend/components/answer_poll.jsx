var React = require('react');
var PollStore = require('../stores/poll');
var ApiUtil = require('../util/api_util');

var TakePoll = React.createClass({
  getInitialState: function() {
    return {pollData: null, selectedAnswerChoiceId: null};
  },

  _onChange: function() {
    this.setState({pollData: PollStore.getPollEditData()});
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
    debugger;
  },

  _createResponse: function() {
    ApiUtil.createResponse(this.state.selectedAnswerChoiceId);
  },

  render: function() {
    if (this.state.pollData === null) {
      return (<div></div>);
    }

    var pollContent,
    pollContent = [(
      <div>
        {this.state.pollData.pollEditData.poll.question}
      </div>
    )];

    for (var i=0; i < this.state.pollData.pollEditData.answerChoices.length; i++) {
      pollContent.push(
        <div>
          <input key={this.state.pollData.pollEditData.answerChoices[i].id} type='radio' name='answer' onClick={this._selectAnswer.bind(null, this.state.pollData.pollEditData.answerChoices[i].id)}></input>{this.state.pollData.pollEditData.answerChoices[i].body}
        </div>
      );
    }

    pollContent.push(
      <div>
        <button type='submit' onClick={this._createResponse}>Submit Answers</button>
      </div>
    );

    return (
      <div>
        {pollContent}
      </div>
    );
  }
});

module.exports = TakePoll;
