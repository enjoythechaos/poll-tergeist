var React = require('react');
var ApiUtil = require('../util/api_util');

var PollGroupStore = require('../stores/poll_group');

var NavBarTop = require('./nav_bar_top');
var SideBar = require('./side_bar');
var PollGroup = require('./poll_group');
var Poll = require('./poll');

var PollIndexPage = React.createClass({
  getInitialState: function() {
    return {pollGroups: []};
  },

  _onChange: function() {
    this.setState({pollGroups: PollGroupStore.getPollGroups()});
  },

  componentDidMount: function() {
    PollGroupStore.addListener(this._onChange);
    var userId = parseInt(this.props.params.userId);
    ApiUtil.getPollGroupsFor(userId);
  },

  render: function() {
    var pollGroupContent = [];
    for(var i = 0; i < this.state.pollGroups.length; i++) {
      var newPollGroup = <PollGroup showChildren={true} pollGroupId={this.state.pollGroups[i][0].poll_group_id} isChecked={false} polls={this.state.pollGroups[i]}/>;
      pollGroupContent.push(newPollGroup);
    }

    return (
      <div>
        <NavBarTop/>
        <SideBar/>
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
