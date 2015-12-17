var React = require('react');
var Poll = require('./poll');
var ApiUtil = require('../util/api_util');
var PollStore = require('../stores/poll');

var PollGroup = React.createClass({
  getInitialState: function() {
    return {checked: false, pollIds: []};
  },

  componentDidMount: function() {
    var pollIds = [];
    for(var i = 0; i < this.props.polls.length; i++) {
      pollIds.push(this.props.polls[i].id);
    }
    this.setState({pollIds: pollIds});
  },

  _onClick: function(e) {
    console.log(e);
    if (e.target.checked) {
      ApiUtil.checkPolls(this.state.pollIds);
    } else {
      ApiUtil.uncheckPolls(this.state.pollIds);
    }
    this.setState({checked: !this.state.checked});
  },

  render: function() {
    var childPolls = [];
    for (var i = 0; i < this.props.polls.length; i++) {
      var newChildPoll = <Poll poll={this.props.polls[i]} isChecked={false}/>;
      childPolls.push(newChildPoll);
    }

    return (
      <div>
        <div>
          <input type='checkbox' checked={this.state.checked} onClick={this._onClick}></input>
          This is a poll group!
        </div>
        <div>
          {childPolls}
        </div>
      </div>
    );
  }
});

window.PollGroup = PollGroup;

module.exports = PollGroup;
