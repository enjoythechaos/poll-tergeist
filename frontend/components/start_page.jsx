var React = require('react');
var StartPageTopBar = require('./start_page_top_bar');

var StartPage = React.createClass({
  render: function() {
    return (
        <div>
          <StartPageTopBar/>
          <div className="splash-container clearfix">
          </div>
        </div>
    );
  }
});

module.exports = StartPage;
