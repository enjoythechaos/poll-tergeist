var React = require('react');

var PollForm = React.createClass({

  _fixCursor: function(e) {
    e.target.value = e.target.value;
  },

  getAnswerChoices: function() {
    return (
      this.props.answerChoices.map(function(answerChoice, idx){
        return (
          <div key={idx} className="poll-form-line clearfix">
            <div className="poll-form-first-field">
              Answer Choice:
            </div>
            <div className="poll-form-text-field">
              <input type='text'
                     size='60'
                     onChange={this.props._updateAnswerChoice.bind(null, idx)}
                     value={answerChoice.answerText}
              ></input>
            </div>
            <div className="poll-form-button-field">
              <button type='button' className="btn btn-default" onClick={this.props._deleteAnswerChoice.bind(null, idx)}>Delete</button>
            </div>
          </div>
        );
      }.bind(this))
    );
  },

  render: function() {

    return(
      <div className="poll-form clearfix">
        <div className="poll-form-line clearfix">
          <div className="poll-form-first-field">
            Poll Question:
          </div>
          <div className="poll-form-text-field">
            <input type='text' size='60' onChange={this.props._updateQuestionText} value={this.props.questionText} autoFocus onFocus={this._fixCursor}></input>
          </div>
          <div className="poll-form-button-field">
            <button type='button' className="btn btn-default" onClick={this.props._deletePollForm}>Delete Poll</button>
          </div>
        </div>
        {this.getAnswerChoices()}
        <br></br>
        <div className="poll-form-line clearfix">
          <div className="poll-form-first-field">
            <button type='button' className="btn btn-default" onClick={this.props._addAnswerChoice}>Add Answer</button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PollForm;
