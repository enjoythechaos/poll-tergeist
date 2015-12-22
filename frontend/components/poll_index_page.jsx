var React = require('react');
var ApiUtil = require('../util/api_util');

var PollGroupStore = require('../stores/poll_group_store');
var PollStore = require('../stores/poll_store');

var NavBarTop = require('./nav_bar_top');
var SideBar = require('./side_bar');
var PollGroup = require('./poll_group');
var Poll = require('./poll');

var PollIndexPage = React.createClass({
  getInitialState: function() {
    return {pollGroups: null, checkedPolls: []};
  },

  _onChange: function() {
    this.setState({pollGroups: PollGroupStore.getPollGroups()});
  },

  _goToNewPolls: function() {
    this.props.history.pushState(null, "users/" + this.props.params.userId + "/polls/new", null);
  },

  componentDidMount: function() {
    this.listenerToken = PollGroupStore.addListener(this._onChange);
    var userId = parseInt(this.props.params.userId);
    ApiUtil.getPollGroupsFor(userId);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  _check: function(pollId, e) {
    var idx = this.state.checkedPolls.indexOf(pollId);
    if (idx !== -1) {
      this.state.checkedPolls.splice(idx, 1);
    }
    this.state.checkedPolls.push(pollId);
    this.setState({checkedPolls: this.state.checkedPolls});
  },

  _uncheck: function(pollId, e) {
    var idx = this.state.checkedPolls.indexOf(pollId);
    this.state.checkedPolls.splice(idx, 1);
    this.setState({checkedPolls: this.state.checkedPolls});
  },

  _isChecked: function(pollId) {
    (this.state.checkedPolls.indexOf(pollId) !== -1);
  },

  _group: function() {
    this.setState({checkedPolls: []});
    ApiUtil.group(this.state.checkedPolls, ApiUtil.getPollGroupsFor.bind(null, parseInt(this.props.params.userId)));
  },

  _ungroup: function() {
    this.setState({checkedPolls: []});
    ApiUtil.ungroup(this.state.checkedPolls, ApiUtil.getPollGroupsFor.bind(null, parseInt(this.props.params.userId)));
  },

  render: function() {
    if (this.state.pollGroups === null) {
      return (<div></div>);
    }
    var pollGroupContent = [];
    for (var i = 0; i < this.state.pollGroups.length; i++) {
      var newPollGroup = <PollGroup key={this.state.pollGroups[i].pollGroupId}
                                    pollGroupId={this.state.pollGroups[i].pollGroupId}
                                    title={this.state.pollGroups[i].pollGroupTitle}
                                    isChecked={false}
                                    polls={this.state.pollGroups[i].polls}
                                    _check={this._check}
                                    _uncheck={this._uncheck}
                                    _isChecked={this._isChecked}
                        />;
      pollGroupContent.push(newPollGroup);
    }
    return (
      <div>
        <NavBarTop/>
        <SideBar _goToNewPolls={this._goToNewPolls}/>
        <div>
          <button type='submit' onClick={this._group}>Group</button>
          <button type='submit' onClick={this._ungroup}>Ungroup</button>
        </div>
        <div>
          {pollGroupContent}
        </div>
      </div>
    );
  }
});

window.PollIndexPage = PollIndexPage;

module.exports = PollIndexPage;
