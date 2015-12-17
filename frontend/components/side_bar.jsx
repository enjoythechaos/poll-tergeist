var React = require('react');

var SideBar = React.createClass({
  _toCreatePoll: function() {
    alert("You just clicked the button to create a poll");
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
