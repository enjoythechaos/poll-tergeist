var React = require('react');
var PollForm = require('./poll_form');

var MultiPollForm = React.createClass({
  getInitialState: function() {
    return({pollForms: [], newQuestionText: ""});
  },

  _createAll: function() {

  },

  _addPollForm: function(e) {
    var newPollForms = this.state.pollForms;
    var questionRef = "question-" + (this.state.pollForms.length + 1);
    newPollForms.push(<PollForm questionRef={questionRef} questionText={e.target.value}/>);
    this.setState({pollForms: newPollForms, newQuestionText: ""});
  },

  _deletePollForm: function(i, e) {
    e.preventDefault();
    var newPollForms = this.state.pollForms;
    newPollForms.splice(i, 1);
    this.setState({pollForms: newPollForms});
  },

  render: function(){
    var pollFormContent = [];
    for (var i = 0; i < this.state.pollForms.length; i++) {
      pollFormContent.push(
        <div>
          {this.state.pollForms[i]}
          <button type='submit' onClick={this._deletePollForm.bind(null, i)}>Delete Poll Question</button>
        </div>
      );
    }
    return (
      <div>
        {pollFormContent}
        <label>
          Add a Poll<br></br>
        <input type='text' onChange={this._addPollForm} value={this.state.newQuestionText}></input>
        </label>
        <br></br>
        <button onClick={this._createAll}>Create</button>
      </div>
    );
  }
});

module.exports = MultiPollForm;
