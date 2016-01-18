var React = require('react');
var StartPageTopBar = require('./start_page_top_bar');

var StartPage = React.createClass({
  render: function() {
    return (
        <div>
          <StartPageTopBar/>
          <div className="splash-container clearfix">
            <div className="splash-text clearfix">
              Create polls, administer them to your audience, then view the results.
            </div>
          </div>
        </div>
    );
  }
});

module.exports = StartPage;
