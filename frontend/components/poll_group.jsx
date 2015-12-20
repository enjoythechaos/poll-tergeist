var React = require('react');
var Poll = require('./poll');
var ApiUtil = require('../util/api_util');
var PollStore = require('../stores/poll');

var PollGroup = React.createClass({
  getInitialState: function() {
    return {isChecked: false, pollIds: [], showChildren: true, editTitle: false, title: this.props.title};
  },

  componentDidMount: function() {
    var pollIds = [];
    for(var i = 0; i < this.props.polls.length; i++) {
      pollIds.push(this.props.polls[i].id);
    }
    this.setState({isChecked: false, pollIds: [], showChildren: true, editTitle: false, title: this.props.title});
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

  _saveTitle: function(e) {
    this.setState({editTitle: false});
    ApiUtil.saveTitle(this.props.pollGroupId, this.state.title);
  },

  _toggleShow: function(e) {
    e.preventDefault();
    this.setState({showChildren: !this.state.showChildren});
  },

  _updateTitle: function(e) {
    e.preventDefault();
    this.setState({title: e.target.value});
  },

  _revertTitle: function(e) {
    e.preventDefault();
    this._closeEdit();
    // this.setState({editTitle: false});
  },

  _openEdit: function(e) {
    e.preventDefault();
    this.setState({editTitle: true});
  },

  _closeEdit: function(e) {
    e.preventDefault();
    this.setState({editTitle: false});
  },

  render: function() {
    var childPolls = [];
    for (var i = 0; i < this.props.polls.length; i++) {
      var newChildPoll = <Poll poll={this.props.polls[i]} isChecked={false} visible={this.state.showChildren}/>;
      childPolls.push(newChildPoll);
    }

    var showHideText = this.state.showChildren ? "Hide" : "Show";
    var titleContent;
    if (!this.state.editTitle) {
      if (this.state.title !== 'Ungrouped') {
        titleContent = (
          <div>
            <button type='submit' onClick={this._toggleShow}>{showHideText}</button>
            {this.props.title}
            <button type='submit' onClick={this._openEdit}>Edit</button>
          </div>
        );
      } else {
        titleContent = (
          <div>
            <button type='submit' onClick={this._toggleShow}>{showHideText}</button>
            {this.props.title}
          </div>
        );
      }
    } else {
      titleContent = (
        <div>
          <input type='text' value={this.state.title} onChange={this._updateTitle}></input>
          <button type='submit' onClick={this._saveTitle}>Save</button>
        </div>
      );
    }

    return (
      <div>
        {titleContent}
        <div>
          {childPolls}
        </div>
      </div>
    );
  }
});

window.PollGroup = PollGroup;

module.exports = PollGroup;
