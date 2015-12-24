var React = require('react');
var Bootstrap = require('bootstrap');
var History = require('react').History;
var StartPageTopBar = React.createClass({
  mixins: [History],

  _logInClicked: function(e) {
    e.preventDefault();
    debugger;
    location.replace("session/new");
  },

  _signUpClicked: function(e) {
    e.preventDefault();
    location.replace("user/new");
  },

  render: function() {
    return (
      <nav className="navbar navbar-default">
        <ul className="nav nav-pills navbar-left">
          <li><a>Polltergeist</a></li>
        </ul>
        <ul className="nav nav-pills navbar-right">
          <li role="presentation"><a onClick={this._logInClicked}>Log In</a></li>
          <li role="presentation"><a onClick={this._signUpClicked}>Sign Up</a></li>
        </ul>
      </nav>
    );
  }
});

module.exports = StartPageTopBar;
