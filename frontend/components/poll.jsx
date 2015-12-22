var React = require('react');
var PollStore = require('../stores/poll_store');
var ApiUtil = require('../util/api_util');

var Poll = React.createClass({

  _onClick: function(e) {
    if (e.target.checked) {
      this.props._check(this.props.poll.id);
    } else {
      this.props._uncheck(this.props.poll.id);
    }
  },

  render: function() {
    if (!this.props.visible) {
      return (<div></div>);
    }
    return (
      <div>
        <div>
          <input type='checkbox' checked={this.props._isChecked(this.props.poll.id)} onClick={this._onClick}></input>
          {this.props.poll.question}
        </div>
      </div>
    );
  }
});

module.exports = Poll;
