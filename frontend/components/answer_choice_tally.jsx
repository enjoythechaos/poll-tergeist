var React = require('react');
var Auth = require('./auth');

var AnswerChoiceTally = React.createClass({
  mixins: [Auth],
  
  render: function() {
    return(
      <div>
        {this.props.answerChoiceText} : {this.props.count}
      </div>
    );
  }
});

module.exports = AnswerChoiceTally;
