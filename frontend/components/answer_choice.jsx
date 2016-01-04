var React = require('react');

var AnswerChoice = React.createClass({
  render: function() {
    return (
      <div className="poll-result-answer-choice">
        <div style={{width: 100, display: 'inline-block'}}>
          <input key={this.props.answerChoice.id}
                 type='radio'
                 name='answer'
                 onClick={this.props._selectAnswer.bind(null, this.props.answerChoice.id)}
          />
        </div>
        <div style={{width: 600, display: 'inline-block'}}>
          {this.props.answerChoice.body}
        </div>
      </div>
    );
  }
});

module.exports = AnswerChoice;
