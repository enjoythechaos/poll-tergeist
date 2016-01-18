var React = require('react');
var PollStore = require('../stores/poll_store');
var ApiUtil = require('../util/api_util');
var History = require('react-router').History;

var Poll = React.createClass({
  mixins: [History],

  _onClick: function(e) {
    if (e.target.checked) {
      this.props._check(this.props.poll.id);
    } else {
      this.props._uncheck(this.props.poll.id);
    }
  },

  _redirectToLive: function(e) {
    e.preventDefault();
    debugger;
    this.history.pushState(null, "/answer/" + this.props.poll.url_string, null);
  },

  _redirectToPollEdit: function(e) {
    e.preventDefault();
    this.history.pushState(null, "/users/" + this.props.poll.author_id + "/polls/" + this.props.poll.id + "/edit", null);
  },

  _redirectToPollResult: function(e) {
    e.preventDefault();
    this.history.pushState(null, "/results/" + this.props.poll.id, null);
  },

  render: function() {
    if (!this.props.visible) {
      return (<div></div>);
    }
    return (
      <div className="poll-index-element poll-index-poll">
        <div className="symbol-slot">
          <input type='checkbox' checked={this.props._isChecked(this.props.poll.id)} onClick={this._onClick}></input>
        </div>
        <div className="title-slot">
          {this.props.poll.question}
        </div>
        <div className="first-option">
        <a type='submit' onClick={this._redirectToPollEdit}>Edit</a>
        </div>
        <div className="second-option">
          <a type='submit' onClick={this._redirectToLive}>Live</a>
        </div>
        <div className="third-option">
          <a type='submit' onClick={this._redirectToPollResult}>Results</a>
        </div>
      </div>
    );
  }
});

module.exports = Poll;
