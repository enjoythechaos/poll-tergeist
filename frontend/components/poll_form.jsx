var React = require('react');

var PollForm = React.createClass({
  getInitialState: function() {
    return {questionText: "", answerChoices: ["", ""]};
  },

  _updateQuestionText: function(e) {
    this.setState({questionText: e.target.value});
  },

  _updateAnswerChoice: function(i, e) {
    var newAnswerChoices = this.state.answerChoices;
    newAnswerChoices[i] = e.target.value;
    this.setState({answerChoices: newAnswerChoices});
  },

  _addAnswerChoice: function(e) {
    e.preventDefault();
    var newAnswerChoices = this.state.answerChoices;
    newAnswerChoices.push("");
    this.setState({answerChoiuces: newAnswerChoices});
  },

  _deleteAnswerChoice: function(i, e) {
    e.preventDefault();
    var newAnswerChoices = this.state.answerChoices;
    newAnswerChoices.splice(i, 1);
    this.setState({answerChoices: newAnswerChoices});
  },

  _fixCursor: function(e) {
    if (!this.alreadyFixed) {
      this.setState({questionText: this.props.questionText});
      this.alreadyFixed = true;
    }
  },

  render: function() {
    var answerChoices = [];
    for(var i = 0; i < this.state.answerChoices.length; i++) {
      answerChoices.push(
        <div>
          <label>
            Answer Choice:
            <input type='text' onChange={this._updateAnswerChoice.bind(null, i)} value={this.state.answerChoices[i]}></input>
          </label>
          <button type='submit' onClick={this._deleteAnswerChoice.bind(null, i)}>Delete</button>
        </div>
      );
    }
    return(
      <div>
        <label>
          Poll Question:
          <input type='text' ref={this.props.questionRef} onChange={this._updateQuestionText} value={this.state.questionText} autoFocus onFocus={this._fixCursor}></input>
        </label>
        {answerChoices}
        <br></br>
        <button type='submit' onClick={this._addAnswerChoice}>Add Answer</button>
      </div>
    );
  }
});

module.exports = PollForm;
