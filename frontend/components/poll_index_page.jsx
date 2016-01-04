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
    this.setState({pollGroups: PollGroupStore.getPollGroups(), checkedPolls: []});
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
    ApiUtil.group(this.state.checkedPolls);
  },

  resetCheckedPolls: function() {
    this.setState({checkedPolls: []});
  },

  _ungroup: function() {
    ApiUtil.ungroup(this.state.checkedPolls);
  },

  _deletePollBatch: function() {
    ApiUtil.deletePollBatch(this.state.checkedPolls);
  },

  _deleteResponses: function() {
    ApiUtil.deleteResponses(this.state.checkedPolls);
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
        <div>
          <NavBarTop userId={this.props.params.userId}/>
        </div>
        <div className="center">
          <div className="poll-index-button-bar clearfix">
            <div className="poll-index-left-buttons">
              <div className="poll-index-button-slot">
                <button type="button" className="btn btn-default" onClick={this._goToNewPolls}>Create Poll</button>
              </div>
              <div className="poll-index-double-button-slot">
                <div className="btn-group" role="group" aria-label="...">
                  <button type="button" className="btn btn-default" onClick={this._group} disabled={this.state.checkedPolls.length === 0}>Group</button>
                  <button type="button" className="btn btn-default" onClick={this._ungroup} disabled={this.state.checkedPolls.length === 0}>Ungroup</button>
                </div>
              </div>
            </div>
            <div className="poll-index-right-buttons">
              <div className="btn-group" role="group" aria-label="...">
                <button type="button" className="btn btn-default" onClick={this._deletePollBatch} disabled={this.state.checkedPolls.length === 0}>Delete Polls</button>
                <button type="button" className="btn btn-default" onClick={this._deleteResponses} disabled={this.state.checkedPolls.length === 0}>Delete Responses</button>
              </div>
            </div>
          </div>
          <div>
            {this.getPollGroupContent()}
          </div>
        </div>
      </div>
    );
  }
});

window.PollIndexPage = PollIndexPage;

module.exports = PollIndexPage;
