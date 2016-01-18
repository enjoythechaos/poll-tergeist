var React = require('react');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var History = require('react-router').History;

var StartPageTopBar = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return { showLogInModal: false, showSignUpModal: false, username: "", password: "", errors: null };
  },

  closeLogIn: function() {
    this.setState({ showLogInModal: false, username: "", password: "", errors: null });
  },

  closeSignUp: function() {
    this.setState({ showSignUpModal: false, username: "", password: "", errors: null });
  },

  openLogIn: function() {
    this.setState({ showLogInModal: true, showSignUpModal: false });
  },

  openSignUp: function() {
    this.setState({ showSignUpModal: true, showLogInModal: false })
  },

  _logIn: function() {
    var options = {
      username: this.state.username,
      password: this.state.password,
      complete: function(response) {
        if (response.status === 200) {
          this.history.pushState(null, "/users/" + response.responseJSON.id + "/polls", null);
        } else {
          this.setState({errors: response.responseJSON});
        }
      }.bind(this),
    }
    ApiUtil.logIn(options);
  },

  _guestLogIn: function() {
    this.setState({username: "guest", password: "password"})
    var options = {
      username: "guest",
      password: "password",
      complete: function(response) {
        if (response.status === 200) {
          this.history.pushState(null, "/users/" + response.responseJSON.id + "/polls", null);
        } else {
          this.setState({errors: response.responseJSON});
        }
      }.bind(this),
    }
    this.setState({errors: "Regenerating the sample data for you.  This should only take a few seconds."})
    ApiUtil.logIn(options);
  },

  _signUp: function() {
    var options = {
      username: this.state.username,
      password: this.state.password,
      complete: function(response) {
        if (response.status === 200) {
          this.history.pushState(null, "/users/" + response.responseJSON.id + "/polls", null);
        } else {
          this.setState({errors: response.responseJSON});
        }
      }.bind(this),
    }
    ApiUtil.signUp(options);
  },

  _updateUsername: function(e) {
    e.preventDefault();
    this.setState({username: e.target.value});
  },

  _updatePassword: function(e) {
    e.preventDefault();
    this.setState({password: e.target.value});
  },

  getErrorText: function() {
    if (this.state.errors !== null) {
      return (<div className="error">{this.state.errors}</div>);
    }
  },

  render: function() {
    return (
      <div>
        <div className="top-bar clearfix">
          <div className="top-bar-nav">
            <div className="logo">
              P o <span className="first-l">l</span> <span className="second-l">l</span> t e r g e i s t
            </div>
            <div className="top-bar-right-group">
              <ul className="top-bar-list">
                <li><a onClick={this.openSignUp}>Sign Up</a></li>
                <li><a onClick={this.openLogIn}>Log In</a></li>
              </ul>
            </div>
          </div>
        </div>

        <Modal show={this.state.showLogInModal} onHide={this.closeLogIn} dialogClassName="my-modal">
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
            {this.getErrorText()}
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>
                <div className="my-modal-line clearfix">
                  <div className="my-modal-first-field">Username:</div><div className="my-modal-second-field"><input type='text' value={this.state.username} onChange={this._updateUsername}></input></div>
                </div>
                <div className="my-modal-line clearfix">
                  <div className="my-modal-first-field">Password:</div><div className="my-modal-second-field"><input type='password' value={this.state.password} onChange={this._updatePassword}></input></div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this._guestLogIn}>Guest Log In</Button>
            <Button onClick={this._logIn}>Log In</Button>
            <Button onClick={this.closeLogIn}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showSignUpModal} onHide={this.closeSignUp} dialogClassName="my-modal">
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
            {this.getErrorText()}
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>
                <div className="my-modal-line clearfix">
                  <div className="my-modal-first-field">Username:</div><div className="my-modal-second-field"><input type='text' value={this.state.username} onChange={this._updateUsername}></input></div>
                </div>
                <div className="my-modal-line clearfix">
                  <div className="my-modal-first-field">Password:</div><div className="my-modal-second-field"><input type='password' value={this.state.password} onChange={this._updatePassword}></input></div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this._signUp}>Sign Up</Button>
            <Button onClick={this.closeSignUp}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
});

module.exports = StartPageTopBar;
