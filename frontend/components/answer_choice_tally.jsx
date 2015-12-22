var React = require('react');

var AnswerChoiceTally = React.createClass({
  render: function() {
    return(
      <div>
        {this.props.answerChoiceText} : {this.props.count}
      </div>
    );
  }
});

module.exports = AnswerChoiceTally;
