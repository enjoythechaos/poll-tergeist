var React = require('react');
var PollStore = require('../stores/poll');
var ApiUtil = require('../util/api_util');

var Poll = React.createClass({
  getInitialState: function() {
    return {checked: PollStore.isChecked(this.props.poll.id)};
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
  },

  render: function() {
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
