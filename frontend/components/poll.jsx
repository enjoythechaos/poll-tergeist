var React = require('react');
var PollStore = require('../stores/poll');
var ApiUtil = require('../util/api_util');

var warn = console.warn;
console.warn = function(warning) {
  if (/(setState)/.test(warning)) {
    throw new Error(warning);
  }
  warn.apply(console, arguments);
};

var Poll = React.createClass({
  getInitialState: function() {
    return {checked: false};
  },

  _onPollStoreUpdate: function() {
    this.setState({checked: PollStore.isChecked(this.props.poll.id)});
  },

  _onClick: function(e) {
    if (e.target.checked) {
      ApiUtil.checkPolls([this.props.poll.id]);
    } else {
      ApiUtil.uncheckPolls([this.props.poll.id]);
    }
  },

  componentDidMount: function() {
    PollStore.addListener(this._onPollStoreUpdate);
    this.setState({checked: PollStore.isChecked(this.props.poll.id)});
  },

  render: function() {
    if (!this.props.visible) {
      return (<div></div>);
    }
    return (
      <div>
        <div>
          <input type='checkbox' checked={this.state.checked} onClick={this._onClick}></input>
          {this.props.poll.question}
        </div>
      </div>
    );
  }
});

module.exports = Poll;
