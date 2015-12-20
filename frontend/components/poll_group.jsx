var React = require('react');
var Poll = require('./poll');
var ApiUtil = require('../util/api_util');
var PollStore = require('../stores/poll');

var PollGroup = React.createClass({
  getInitialState: function() {
    return {isChecked: false, pollIds: [], showChildren: true};
  },

  componentDidMount: function() {
    var pollIds = [];
    for(var i = 0; i < this.props.polls.length; i++) {
      pollIds.push(this.props.polls[i].id);
    }
    this.setState({pollIds: pollIds, showChildren: true, checked: false});
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

  _toggleShow: function(e) {
    e.preventDefault();
    this.setState({showChildren: !this.state.showChildren});
  },

  render: function() {
    var childPolls = [];
    for (var i = 0; i < this.props.polls.length; i++) {
      var newChildPoll = <Poll poll={this.props.polls[i]} isChecked={false} visible={this.state.showChildren}/>;
      childPolls.push(newChildPoll);
    }

    var showHideText = this.state.showChildren ? "Hide" : "Show";

    //<input type='checkbox' checked={this.state.checked} onClick={this._onClick}></input>

    return (
      <div>
        <div>
          <button type='submit' onClick={this._toggleShow}>{showHideText}</button>
          {this.props.title}
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
