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

  getSymbolContent: function() {
    var symbolContent = <div className="symbol-slot">&nbsp;</div>;
    if (this.props.polls.length > 0) {
      if (this.state.showChildren) {
        symbolContent = <div onClick={this._toggleShow} className="glyphicon glyphicon-triangle-bottom symbol-slot"></div>;
      } else {
        symbolContent = <div onClick={this._toggleShow} className="glyphicon glyphicon-triangle-right symbol-slot"></div>;
      }
    }
    return symbolContent;
  },

  getTitleContent: function() {
    if (this.state.title !== 'Ungrouped' && this.state.editTitle) {
      return <input type='text' size='60' value={this.state.title} onChange={this._updateTitle}></input>;
    } else {
      return <b>{this.state.title}</b>;
    }
  },

  getEditSave: function() {
    var editContent = "";
    if (this.state.title !== 'Ungrouped') {
      if (this.state.editTitle) {
        editContent = <a onClick={this._saveTitle}>Save</a>;
      } else {
        editContent = <a onClick={this._openEdit}>Edit</a>;
      }
    }
    return editContent;
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

  _openEdit: function(e) {
    e.preventDefault();
    this.setState({editTitle: true});
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
    return (
      <div>
        <div className="poll-index-element poll-index-pollgroup">
          <div className="symbol-slot">
            {this.getSymbolContent()}
          </div>
          <div className="title-slot">
            {this.getTitleContent()}
          </div>
          <div className="first-option">
            {this.getEditSave()}
          </div>
          <div className="second-option">
          </div>
        </div>
        {this.getChildPolls()}
      </div>
    );
  }
});

module.exports = PollGroup;
