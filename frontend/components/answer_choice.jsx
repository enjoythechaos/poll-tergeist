var React = require('react');

var AnswerChoice = React.createClass({
  render: function() {
    return (
      <div>
        <input key={this.props.answerChoice.id}
               type='radio'
               name='answer'
               onClick={this.props._selectAnswer.bind(null, this.props.answerChoice.id)}
        />
        {this.props.answerChoice.body}
      </div>
    );
  }
});

module.exports = AnswerChoice;
