var React = require('react');
var ApiUtil = require('../util/api_util');

var PollGroupStore = require('../stores/poll_group_store');
var PollStore = require('../stores/poll_store');

var NavBarTop = require('./nav_bar_top');
var SideBar = require('./side_bar');
var PollGroup = require('./poll_group');
var Poll = require('./poll');

var Auth = require('./auth');

var PollIndexPage = React.createClass({
  mixins: [Auth],

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
    //this.resetCheckedPolls();
    ApiUtil.group(this.state.checkedPolls);
  },

  _ungroup: function() {
    //this.resetCheckedPolls();
    ApiUtil.ungroup(this.state.checkedPolls);
  },

  _deletePollBatch: function() {
    //this.resetCheckedPolls();
    ApiUtil.deletePollBatch(this.state.checkedPolls);
  },

  _deleteResponses: function() {
    //this.resetCheckedPolls();
    ApiUtil.deleteResponses(this.state.checkedPolls);
  },

  resetCheckedPolls: function() {
    this.setState({checkedPolls: []});
  },

  getPollGroupContent: function() {
    return (
      this.state.pollGroups.map(function(pollGroup){
        return (
          <PollGroup key={pollGroup.pollGroupId}
                     pollGroupId={pollGroup.pollGroupId}
                     title={pollGroup.pollGroupTitle}
                     isChecked={false}
                     polls={pollGroup.polls}
                     _check={this._check}
                     _uncheck={this._uncheck}
                     _isChecked={this._isChecked}
          />
        );
      }.bind(this))
    );
  },

  render: function() {
    if (this.state.pollGroups === null) {
      return (<div></div>);
    }
    return (
      <div>
        <NavBarTop/>
        <SideBar _goToNewPolls={this._goToNewPolls}/>
        <div>
          <button type='submit' onClick={this._group}>Group</button>
          <button type='submit' onClick={this._ungroup}>Ungroup</button>
          <button type='submit' onClick={this._deletePollBatch}>Delete</button>
          <button type='submit' onClick={this._deleteResponses}>Delete Responses</button>
        </div>
        <div>
          {this.getPollGroupContent()}
        </div>
      </div>
    );
  }
});

window.PollIndexPage = PollIndexPage;

module.exports = PollIndexPage;
