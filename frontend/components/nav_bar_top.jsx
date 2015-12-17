var React = require('react');

var NavBarTop = React.createClass({
  _toPollIndex: function(e) {
    e.preventDefault();
    alert('You just clicked the button to navigate to polls');
  },

  _toLogOut: function(e) {
    e.preventDefault();
    alert('You just clicked the button to Log Out');
  },

  render: function() {
    return (
      <div>
        <button type='submit' onClick={this._toPollIndex}>Polls</button>
        <button type='submit' onClick={this._toLogOut}>Log Out</button>
      </div>
    );
  }
});

module.exports = NavBarTop;
