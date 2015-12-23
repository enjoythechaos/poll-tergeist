var ApiUtil = require('../util/api_util');
var History = require('react-router').History;

var Auth = {
  mixins: [ History ],
  componentWillMount: function() {
    ApiUtil.getCurrentUser(function(response){
      var m = this.props.location.pathname.match(/\/users\/([0-9]+).*/);
      if (m && parseInt(m[1]) !== response.id) {
        console.log("Redirect to Log In page because there isn't a user who is both logged in and authorized to view this page.");
        debugger;
        var m = location.hash.match(/^#(.*)$/);
        location.replace("session/new?url=" + m[1]);
      } else {
        console.log("Allow to go to page.  Either the page doesn't require a certain user to be authorized, or the logged in user is the authorized user for this page.");
      }
    }.bind(this));
  }
};

module.exports = Auth;
