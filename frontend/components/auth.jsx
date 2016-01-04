var ApiUtil = require('../util/api_util');
var History = require('react-router').History;

var Auth = {
  mixins: [ History ],
  componentWillMount: function() {
    ApiUtil.getCurrentUser(function(response){
      if (response.responseJSON.id === 0) {
        // Redirect to the log in page.  There is no logged in user.  This mixin wouldn't
        // have been called unless a user needed to be logged in.
        location.replace("/");
      }
      if (this.props.location !== undefined) {
        var m = this.props.location.pathname.match(/\/users\/([0-9]+).*/);
        if (m === null || m === undefined || parseInt(m[1]) === response.responseJSON.id) {
          // Allow the user through.  They are the authorized user.
          this.setState({currentUser: response.responseJSON});
        } else {
          // Redirect to the log in page, since the user is trying to access a URL that contains a userId,
          // but the currently logged in user isn't the user authorized to view the URL.
          location.replace("/");
        }
      } else {
        // Don't restrict the user.  The logic wouldn't have branched here unless this was a child component,
        // and any restriction should have already been handled by the parent component that had this.props.location defined.
        // Therefore, the child is assuming that the user is authorized and is using Auth to define the current user.
        this.setState({currentUser: response.responseJSON});
      }
    }.bind(this));
  }
};

module.exports = Auth;
