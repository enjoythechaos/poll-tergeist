var React = require('react');

var StartPageTopBar = React.createClass({
  _logInClicked: function(e) {
    e.preventDefault();
    alert("You just clicked the Log In button.");
  },

  _signUpClicked: function(e) {
    e.preventDefault();
    alert("You just clicked the Sign Up button.");
  },

  render: function() {
    return (
      <div>
        <button type='submit' onClick={this._logInClicked}>Log In</button>
        <button type='submit' onClick={this._signUpClicked}>Sign Up</button>
      </div>
    );
  }
});

module.exports = StartPageTopBar;
