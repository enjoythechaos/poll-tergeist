var React = require('react');

var SideBar = React.createClass({
  _toCreatePoll: function() {
    this.props._goToNewPolls();
  },

  render: function() {
    return (
      <div>
        <button type='submit' onClick={this._toCreatePoll}>Create Poll</button>
      </div>
    );
  }
});

module.exports = SideBar;
