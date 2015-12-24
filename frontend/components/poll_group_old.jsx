var React = require('react');
var Poll = require('./poll');
var ApiUtil = require('../util/api_util');
var PollStore = require('../stores/poll_store');

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

  normalGroupNotBeingEdited: function() {
    var showHide;
    if (this.state.showChildren) {
      showHide = <div onClick={this._toggleShow} className="glyphicon glyphicon-triangle-bottom symbol-slot"></div>;
    } else {
      showHide = <div onClick={this._toggleShow} className="glyphicon glyphicon-triangle-right symbol-slot"></div>;
    }
    return (
      <div>
        {showHide} {this.props.title} <a onClick={this._openEdit}>Edit</a>
      </div>
    );
  },

  normalGroupBeingEdited: function() {
    return (
      <div>
        <input type='text' value={this.state.title} onChange={this._updateTitle}></input>
        <a type='submit' onClick={this._saveTitle}>Save</a>
      </div>
    );
  },

  ungroupedWithChildren: function() {
    var showHide;
    if (this.state.showChildren) {
      showHide = <div onClick={this._toggleShow} className="glyphicon glyphicon-triangle-bottom symbol-slot"></div>;
    } else {
      showHide = <div onClick={this._toggleShow} className="glyphicon glyphicon-triangle-right symbol-slot"></div>;
    }
    return (
      <div>
        {showHide} {this.props.title}
      </div>
    );
  },

  ungroupedNoChildren: function() {
    // No need to display a hide button if there are no children.  There is
    // always a "Ungrouped" group for a user, so this one may not have children.
    // Other groups will be deleted when they have no children.
    return (
      <div>
        {this.props.title}
      </div>
    );
  },

  getSymbolContent: function() {
    var symbolContent = "";
    if (this.props.title === 'Ungrouped') {
      if (this.props.polls.length > 0) {
        if (this.props.showChildren) {
          symbolContent = <div onClick={this._toggleShow} className="glyphicon glyphicon-triangle-bottom symbol-slot"></div>;
        } else {
          symbolContent = <div onClick={this._toggleShow} className="glyphicon glyphicon-triangle-right symbol-slot"></div>;
        }
      }
    }
  }

  getTitleContent: function() {
    var titleContent;

    if (!this.state.editTitle) {
      if (this.state.title !== 'Ungrouped') {
        titleContent = this.normalGroupNotBeingEdited();
      } else {
        if (this.props.polls.length > 0) {
          titleContent =  this.ungroupedWithChildren();
        } else {
          titleContent = this.ungroupedNoChildren();
        }
      }
    } else {
      titleContent = this.normalGroupBeingEdited();
    }
    return titleContent;
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
    ApiUtil.saveTitle(this.props.pollGroupId, this.state.title, this.props._rerenderAll);
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
  },

  _openEdit: function(e) {
    e.preventDefault();
    this.setState({editTitle: true});
  },

  _closeEdit: function(e) {
    e.preventDefault();
    this.setState({editTitle: false});
  },

  getChildPolls: function() {
    return (
      this.props.polls.map(function(poll, i) {
        return (
          <Poll poll={poll}
                key={poll.id}
                isChecked={false}
                visible={this.state.showChildren}
                _check={this.props._check}
                _uncheck={this.props._uncheck}
                _isChecked={this.props._isChecked}
          />
        );
      }.bind(this))
    );
  },

  render: function() {
    var titleContent = this.getTitleContent();

    return (
      <div>
        {this.getTitleContent()}
        <div>
          {this.getChildPolls()}
        </div>
      </div>
    );
  }
});

window.PollGroup = PollGroup;

module.exports = PollGroup;
