var React = require('react');
var StartPageTopBar = require('./start_page_top_bar');

var StartPage = React.createClass({
  render: function() {
    return (
      <div>
        <StartPageTopBar/>
      </div>
    );
    //Splash component will go beneath the StartPageTopBar.
  }
});

module.exports = StartPage;
