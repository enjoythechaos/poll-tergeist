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
      <nav className="clearfix navbar-default">
        <ul className="nav nav-pills navbar-left">
          <li><a>Polltergeist</a></li>
        </ul>
        <ul className="nav nav-pills navbar-right">
          <li role="presentation"><a onClick={this._toPollIndex}>Polls</a></li>
          <li role="presentation"><a onClick={this.__toLogOut}>Log Out</a></li>
        </ul>
      </nav>
    );
  }
});

module.exports = NavBarTop;
