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
    this.listenerToken = PollGroupStore.addListener(this._onChange);
    var userId = parseInt(this.props.params.userId);
    ApiUtil.getPollGroupsFor(userId);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
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
      var newPollGroup = <PollGroup key={this.state.pollGroups.pollGroups[i].pollGroupId} pollGroupId={this.state.pollGroups.pollGroups[i].pollGroupId} title={this.state.pollGroups.pollGroups[i].pollGroupTitle} isChecked={false} polls={this.state.pollGroups.pollGroups[i].polls}/>;
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
