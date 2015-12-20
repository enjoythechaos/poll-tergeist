var React = require('react');
var ApiUtil = require('../util/api_util');

var PollGroupStore = require('../stores/poll_group');
var PollStore = require('../stores/poll');

var NavBarTop = require('./nav_bar_top');
var SideBar = require('./side_bar');
var PollGroup = require('./poll_group');
var Poll = require('./poll');

var PollIndexPage = React.createClass({
  getInitialState: function() {
    return {pollGroups: null};
  },

  _onChange: function() {
    this.setState({pollGroups: PollGroupStore.getPollGroups()});
  },

  _goToNewPolls: function() {
    this.props.history.pushState(null, "users/" + this.props.params.userId + "/polls/new", null);
  },

  componentDidMount: function() {
    PollGroupStore.addListener(this._onChange);
    var userId = parseInt(this.props.params.userId);
    ApiUtil.getPollGroupsFor(userId);
  },

  _reload: function() {
    this.props.history.pushState(null, this.props.location.pathname, null);
  },

  _group: function() {
    ApiUtil.group(PollStore.checkedPolls(), ApiUtil.getPollGroupsFor.bind(null, parseInt(this.props.params.userId)));
  },

  _ungroup: function() {
    ApiUtil.ungroup(PollStore.checkedPolls(), ApiUtil.getPollGroupsFor.bind(null, parseInt(this.props.params.userId)));
  },

  render: function() {
    if (this.state.pollGroups === null) {
      return (<div></div>);
    }
    var pollGroupContent = [];
    for (var i = 0; i < this.state.pollGroups.pollGroups.length; i++) {
      var newPollGroup = <PollGroup pollGroupId={this.state.pollGroups.pollGroups[i].pollGroupId} title={this.state.pollGroups.pollGroups[i].pollGroupTitle} isChecked={false} polls={this.state.pollGroups.pollGroups[i].polls}/>;
      pollGroupContent.push(newPollGroup);
    }
    // for(var i = 0; i < this.state.pollGroups.length; i++) {
    //   var newPollGroup = <PollGroup pollGroupId={this.state.pollGroups[i][0].poll_group_id} isChecked={false} polls={this.state.pollGroups[i]}/>;
    //   pollGroupContent.push(newPollGroup);
    // }

    return (
      <div>
        <NavBarTop/>
        <SideBar _goToNewPolls={this._goToNewPolls}/>
        <div>
          <button type='submit' onClick={this._unlock}>Unlock</button>
          <button type='submit' onClick={this._lock}>Lock</button>
          <button type='submit' onClick={this._group}>Group</button>
          <button type='submit' onClick={this._ungroup}>Ungroup</button>
          <button type='submit' onClick={this._clearResults}>Clear Results</button>
          <button type='submit' onClick={this._delete}>Delete</button>
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
