var React = require('react');

var PollForm = React.createClass({

  _fixCursor: function(e) {
    e.target.value = e.target.value;
  },

  getAnswerChoices: function() {
    return (
      this.props.answerChoices.map(function(answerChoice, idx){
        return (
          <div key={idx}>
            <label>
              Answer Choice:
              <input type='text'
                     onChange={this.props._updateAnswerChoice.bind(null, idx)}
                     value={answerChoice.answerText}
              ></input>
            </label>
            <button type='submit' onClick={this.props._deleteAnswerChoice.bind(null, idx)}>Delete</button>
          </div>
        );
      }.bind(this))
    );
  },

  render: function() {

    return(
      <div>
        <label>
          Poll Question:
          <input type='text' onChange={this.props._updateQuestionText} value={this.props.questionText} autoFocus onFocus={this._fixCursor}></input>
          <button type='submit' onClick={this.props._deletePollForm}>Delete Poll</button>
        </label>
        {this.getAnswerChoices()}
        <br></br>
        <button type='submit' onClick={this.props._addAnswerChoice}>Add Answer</button>
      </div>
    );
  }
});

module.exports = PollForm;
