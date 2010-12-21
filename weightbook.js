$(document).ready(function() {

	/* UI: Tabs, accordions */
	
	$( "#tabs" ).tabs();
	$( ".accordion" ).accordion({
		autoHeight: false
	});
	
	/* Weight add bar */
	
	$( "#weight-add-close" ).click(function(){
		$( "#weight-add" ).fadeOut();
	});
	$( "input:submit" ).button().click(function(){ 
		$( "#weight-add" ).fadeOut();
		return false;
	});

	$( ".scrollbutton" ).button();
});

var weightData, walkData;
var weightTarget, walkTarget;

function drawCharts(){
	
	var today = new Date();
	
	/* Generate Data */
				
    weightData = new google.visualization.DataTable();
    weightData.addColumn('date', 'Date');
    weightData.addColumn('number', 'Paino');
	weightData.addColumn('number', 'Tavoite');
	
	walkData = new google.visualization.DataTable();
    walkData.addColumn('date', 'Date');
    walkData.addColumn('number', 'Kävely');
	walkData.addColumn('number', 'Tavoite');

	// Initial values
	var weight = 80+Math.random()*10;
	weightTarget = Math.round(weight-2);
	walkTarget = 10000;
	
	// Let's generate month of data back from today
	var amount = 100;
	var date = new Date(today).setDate(today.getDate()-amount-1);
	for (var i=amount;i>0;i--){
		date = new Date(date)
		date.setDate(date.getDate()+1);
		
		weight += Math.random()*-0.2;
		weightTarget = Math.round(weight-2);
		weightData.addRow([date, weight, weightTarget]);
		
		var walk = Math.round(walkTarget/2+Math.random()*walkTarget);
		walkData.addRow([date, walk, walkTarget]);
	}
	
	var weightSummaryData = new google.visualization.DataView(weightData);
	weightSummaryData.setRows(amount-1-20, amount-1);
	weightSummaryData.setColumns([0,1]);

    var weightSummaryChart = new google.visualization.AreaChart(document.getElementById('weight-summary-graph'));
	weightSummaryChart.draw(weightSummaryData,{
		width: 440, 
		height: 200,
		legend: 'none'
       });
	   
	var walkSummaryData = new google.visualization.DataView(walkData);
	walkSummaryData.setRows(amount-1-20, amount-1);
	walkSummaryData.setColumns([0,1]);
	   
	var walkSummaryChart = new google.visualization.ColumnChart(document.getElementById('walk-summary-graph'));
	walkSummaryChart.draw(walkSummaryData,{
		width: 440, 
		height: 200,
		legend: 'none'
       });
	 
	showWeightGraph(30);
	showWalkGraph(30);
}

function showWalkGraph(amount, skip){
	
	if (!skip){
		skip = 0;
	}
	
	var walkDataView = new google.visualization.DataView(walkData);
	var lastIndex = walkDataView.getNumberOfRows()-1 - skip;
	var firstIndex = lastIndex - amount
	walkDataView.setRows(firstIndex, lastIndex);
	
	var walkChart = new google.visualization.AreaChart(document.getElementById('walk-graph'));
	walkChart.draw(walkDataView, {width: 922, height: 300});
	
	if (skip==0){
		$( "#walk-graph-container .scrollbutton.right" ).button('disable');
	}
	
}

function showWeightGraph(amount, skip){
	
	if (!skip){
		skip = 0;
	}
	
	var weightDataView = new google.visualization.DataView(weightData);
	var lastIndex = weightDataView.getNumberOfRows()-1 - skip;
	var firstIndex = lastIndex - amount
	weightDataView.setRows(firstIndex, lastIndex);
	
	var weightChart = new google.visualization.AreaChart(document.getElementById('weight-graph'));
	weightChart.draw(weightDataView, {width: 922, height: 300});
	
	if (skip==0) {
		$("#weight-graph-container .scrollbutton.right").button('disable');
	}
}

