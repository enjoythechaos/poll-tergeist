var React = require('react');
var AnswerChoice = require('./answer_choice');

var AnswerChoices = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.answerChoices.map(function(answerChoice){
          return <AnswerChoice key={answerChoice.id} answerChoice={answerChoice} _selectAnswer={this.props._selectAnswer}/>;
        }.bind(this))}
      </div>
    );
  }
});

module.exports = AnswerChoices;
