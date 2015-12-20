var React = require('react');

var PollForm = React.createClass({
  generateAnswerChoices: function() {
    var answerChoices = [];
    for(var answerChoiceId in this.props.answerChoices) {
      if (this.props.answerChoices.hasOwnProperty(answerChoiceId) && answerChoiceId !== 'nextId') {
        answerChoices.push(
          <div>
            <label>
              Answer Choice:
              <input key={this.props.answerChoices[answerChoiceId]}
                     type='text'
                     onChange={this.props._updateAnswerChoice.bind(null, answerChoiceId)}
                     value={this.props.answerChoices[answerChoiceId].answerText}
              ></input>
            </label>
            <button type='submit' onClick={this.props._deleteAnswerChoice.bind(null, answerChoiceId)}>Delete</button>
          </div>
        );
      }
    }
    return answerChoices;
  },

  _fixCursor: function(e) {
    e.target.value = e.target.value;
  },

  render: function() {
    var answerChoices = this.generateAnswerChoices();
    return(
      <div>
        <label>
          Poll Question:
          <input type='text' onChange={this.props._updateQuestionText} value={this.props.questionText} autoFocus onFocus={this._fixCursor}></input>
          <button type='submit' onClick={this.props._deletePollForm}>Delete Poll</button>
        </label>
        {answerChoices}
        <br></br>
        <button type='submit' onClick={this.props._addAnswerChoice}>Add Answer</button>
      </div>
    );
  }
});

module.exports = PollForm;
