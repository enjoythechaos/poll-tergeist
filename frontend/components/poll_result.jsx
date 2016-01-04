var React = require('react');
var ApiUtil = require('../util/api_util');
var AnswerChoiceTally = require('./answer_choice_tally');
var PollResultStore = require('../stores/poll_result_store');
var NavBarTop = require('./nav_bar_top');
var Auth = require('./auth');
var BarChart = require('react-chartjs').Bar;

var PollResult = React.createClass({
  mixins: [Auth],

  getInitialState: function() {
    return {pollResult: null};
  },

  _onChange: function() {
    this.setState({pollResult: PollResultStore.getPollResult()});
  },

  componentDidMount: function() {
    var pollId = this.props.params.pollId;

    this.listenerToken = PollResultStore.addListener(this._onChange);
    ApiUtil.fetchPollResult(pollId);
  },

  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  getChart: function() {
    var labels = [];
    var data = [];
    debugger;
    for(var i=0; i < this.state.pollResult.results.length; i++) {
      labels.push(String.fromCharCode("A".charCodeAt(0) + i));
      data.push(this.state.pollResult.results[i].count);
    }


    var chartData = {
    labels: labels,
    datasets: [
        {
            label: "poll data",
            fillColor: "rgba(204,221,255, 1)",
            strokeColor: "rgba(0,0,119, 1)",
            highlightFill: "rgba(204,221,255, 1)",
            highlightStroke: "rgba(204,221,255,1)",
            data: data
        }
      ]
    };

    var chartOptions = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    };
    return (
      <div>
        <BarChart data={chartData} options={chartOptions} width="600" height="400"/>
      </div>
    );
  },

  getResults: function() {
    return this.state.pollResult.results.map(function(result, i){
      return (
          <div className="poll-result-answer-choice clearfix">
            <div style={{width: 200, display: 'inline-block'}}>
              {String.fromCharCode("A".charCodeAt(0) + i)}
            </div>
            <div style={{width: 500, display: 'inline-block'}}>
              {result.answerChoiceText}
            </div>
            <div style={{width: 100, display: 'inline-block'}}>
              {result.count}
            </div>
          </div>
      )
    })
  },

  render: function() {
    if (this.state.pollResult === null) {
      return (<div>Fetching Poll Results</div>);
    }
   debugger;
   return (
     <div>
       <div>
         <NavBarTop userId={this.state.currentUser.id}/>
       </div>
       <div className="center">
         <div className="poll-result-question">
           {this.state.pollResult.question}
         </div>
         <center>{this.getChart()}</center>
         {this.getResults()}
       </div>
     </div>
   )
  }
});

module.exports = PollResult;
