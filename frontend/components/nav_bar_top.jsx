var React = require('react');
var ApiUtil = require('../util/api_util');
var History = require('react-router').History;
var ApiUtil = require('../util/api_util');
var Auth = require('./auth');

var NavBarTop = React.createClass({
  mixins: [Auth, History],

  getInitialState: function() {
    return null;
  },

  _toPollIndex: function(e) {
    e.preventDefault();
    this.history.pushState(null, "/users/" + this.state.currentUser.id + "/polls");
  },

  _logOut: function(e) {
    e.preventDefault();
    ApiUtil.logOut(function(response){
      this.history.pushState(null, "/", null);
    }.bind(this));
  },

  render: function() {
    return (
      <div className="top-bar clearfix">
        <div className="top-bar-nav">
          <div className="logo">
            P o <span className="first-l">l</span> <span className="second-l">l</span> t e r g e i s t
          </div>
          <div className="top-bar-right-group">
            <ul className="top-bar-list">
            <li role="presentation"><a onClick={this._toPollIndex}>Polls</a></li>
            <li role="presentation"><a onClick={this._logOut}>Log Out</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NavBarTop;
