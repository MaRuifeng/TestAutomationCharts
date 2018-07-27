$(function () {

	var uiDataArray = [];
	var consoleDataArray = [];
	var windowsDataArray = [];
	var linuxDataArray = [];
	var aixDataArray = [];

	var uiPassRateDataPoints = [];
	var consolePassRateDataPoints = [];
	var windowsPassRateDataPoints = [];
	var linuxPassRateDataPoints = [];
	var aixPassRateDataPoints = [];

	var uiTestCountDataPoints = [];
	var consoleTestCountDataPoints = [];
	var windowsTestCountDataPoints = [];
	var linuxTestCountDataPoints = [];
	var aixTestCountDataPoints = [];

	var sprintSet = new Set(); 

	// Data retrieval
	var dataURL = "http://9.51.163.190:9081/RTCWebClient/v0.1/api/testResult/getBuildPassRates?pageNumber=1&pageSize=20&testPhase=BVT";
	var sprintURL ="http://9.51.163.190:9081/RTCWebClient/v0.1/api/testResult/getAllSprints";
	var requests = []; // for final callback after multiple ajax events

    // Report details
    var BASE_URL = "http://9.51.163.190/ccssd-test"

	// Sprint Selection
	// $.ajax({
 //        url: sprintURL,
 //        type: "GET",
 //        contentType: 'application/json; charset=utf-8',
 //        success: function(resultJson, statusCode, request) {
	// 		$(document).ready(function() {
	// 			$.each(resultJson['Result']['Sprints'], function(key, value){
	// 				$("#sprintDropdown").append("<option>" + value + "</option>");
	// 			});
	// 	    });
 //        },
 //        error : function(jqXHR, textStatus, errorThrown) {
 //        	console.log(errorThrown);
 //        },
 //        timeout: 120000
 //    });

    // UI
	requests.push($.ajax({
            url: dataURL + "&testCategory=Cucumber_UI",
            type: "GET",
            contentType: 'text/plain',
            // contentType: 'application/json; charset=utf-8',
            success: function(resultJson, statusCode, request) {
            	uiDataArray = resultJson['Result']['Items'];
                $.each(uiDataArray, function(key, value){
                	var buildDate = new Date(Date.parse(value['Build Timestamp']));
                	var buildDateStr = buildDate.toLocaleDateString('en-GB', {month: 'short', day: 'numeric'}).split(' ').join('-');
                	var sprint = value['Sprint'];
                	sprintSet.add(sprint);
                	var buildNumber = value['Build Version'];
                	var passRate = value['Pass Rates'][0]['Pass Rate'];
                	var testCount = value['Pass Rates'][0]['Test Count'];
                	uiPassRateDataPoints.push({label: buildDateStr, y: passRate});
                    uiTestCountDataPoints.push({label: buildDateStr, y: testCount});
	            });
	            $("#ui_cucumber-tab").find(".chart").renderChart(uiTestCountDataPoints, uiPassRateDataPoints);
            },
            error : function(jqXHR, textStatus, errorThrown) {
            	console.log(errorThrown);
            },
            timeout: 120000
        }));

    // Console
	requests.push($.ajax({
            url: dataURL + "&testCategory=Cucumber_Console",
            type: "GET",
            contentType: 'text/plain',
            //contentType: 'application/json; charset=utf-8',
            success: function(resultJson, statusCode, request) {
            	consoleDataArray = resultJson['Result']['Items'];
                $.each(consoleDataArray, function(key, value){
                	var buildDate = new Date(Date.parse(value['Build Timestamp']));
                	var buildDateStr = buildDate.toLocaleDateString('en-GB', {month: 'short', day: 'numeric'}).split(' ').join('-');
                	sprintSet.add(value['Sprint']);
                	var passRate = value['Pass Rates'][0]['Pass Rate'];
                	var testCount = value['Pass Rates'][0]['Test Count'];
                	consolePassRateDataPoints.push({label: buildDateStr, y: passRate});
                    consoleTestCountDataPoints.push({label: buildDateStr, y: testCount});
	            });
	            $("#console_cucumber-tab").find(".chart").renderChart(consoleTestCountDataPoints, consolePassRateDataPoints);
            },
            error : function(jqXHR, textStatus, errorThrown) {
            	console.log(errorThrown);
            },
            timeout: 120000
        }));

    // Windows Kitchen
	requests.push($.ajax({
            url: dataURL + "&testCategory=KitchenTest_Windows",
            type: "GET",
            contentType: 'text/plain',
            //contentType: 'application/json; charset=utf-8',
            success: function(resultJson, statusCode, request) {
            	windowsDataArray = resultJson['Result']['Items'];
                $.each(windowsDataArray, function(key, value){
                	var buildDate = new Date(Date.parse(value['Build Timestamp']));
                	var buildDateStr = buildDate.toLocaleDateString('en-GB', {month: 'short', day: 'numeric'}).split(' ').join('-');
                	sprintSet.add(value['Sprint']);
                	var passRate = value['Pass Rates'][0]['Pass Rate'];
                	var testCount = value['Pass Rates'][0]['Test Count'];
                	windowsPassRateDataPoints.push({label: buildDateStr, y: passRate});
                    windowsTestCountDataPoints.push({label: buildDateStr, y: testCount});
	            });
	            $("#windows_kitchen-tab").find(".chart").renderChart(windowsTestCountDataPoints, windowsPassRateDataPoints);
            },
            error : function(jqXHR, textStatus, errorThrown) {
            	console.log(errorThrown);
            },
            timeout: 120000
        }));

    // Linux Kitchen
	requests.push($.ajax({
            url: dataURL + "&testCategory=KitchenTest_Linux",
            type: "GET",
            contentType: 'text/plain',
            //contentType: 'application/json; charset=utf-8',
            success: function(resultJson, statusCode, request) {
            	linuxDataArray = resultJson['Result']['Items'];
                $.each(linuxDataArray, function(key, value){
                	var buildDate = new Date(Date.parse(value['Build Timestamp']));
                	var buildDateStr = buildDate.toLocaleDateString('en-GB', {month: 'short', day: 'numeric'}).split(' ').join('-');
                	sprintSet.add(value['Sprint']);
                	var passRate = value['Pass Rates'][0]['Pass Rate'];
                	var testCount = value['Pass Rates'][0]['Test Count'];
                	linuxPassRateDataPoints.push({label: buildDateStr, y: passRate});
                    linuxTestCountDataPoints.push({label: buildDateStr, y: testCount});
	            });
	            $("#linux_kitchen-tab").find(".chart").renderChart(linuxTestCountDataPoints, linuxPassRateDataPoints);
            },
            error : function(jqXHR, textStatus, errorThrown) {
            	console.log(errorThrown);
            },
            timeout: 120000
        }));

    // AIX Kitchen
	requests.push($.ajax({
            url: dataURL + "&testCategory=KitchenTest_AIX",
            type: "GET",
            contentType: 'text/plain',
            //contentType: 'application/json; charset=utf-8',
            success: function(resultJson, statusCode, request) {
            	aixDataArray = resultJson['Result']['Items'];
                $.each(aixDataArray, function(key, value){
                	var buildDate = new Date(Date.parse(value['Build Timestamp']));
                	var buildDateStr = buildDate.toLocaleDateString('en-GB', {month: 'short', day: 'numeric'}).split(' ').join('-');
                	sprintSet.add(value['Sprint']);
                	var passRate = value['Pass Rates'][0]['Pass Rate'];
                	var testCount = value['Pass Rates'][0]['Test Count'];
                	aixPassRateDataPoints.push({label: buildDateStr, y: passRate});
                    aixTestCountDataPoints.push({label: buildDateStr, y: testCount});
	            });
	            $("#aix_kitchen-tab").find(".chart").renderChart(aixTestCountDataPoints, aixPassRateDataPoints);
            },
            error : function(jqXHR, textStatus, errorThrown) {
            	console.log(errorThrown);
            },
            timeout: 120000
        }));

    // Summary table
    $.when.apply(undefined, requests).then(function() {
    	var allDataArray = [];
    	$.merge(allDataArray, uiDataArray);
    	$.merge(allDataArray, consoleDataArray);
    	$.merge(allDataArray, windowsDataArray);
    	$.merge(allDataArray, linuxDataArray);
    	$.merge(allDataArray, aixDataArray);
		$(document).ready(function() {
			 // sprint dropdown
		 	 $.each(Array.from(sprintSet), function(key, value){
				$("#sprintDropdown").append("<option>" + value + "</option>");
			 });
		     // data table		
			 $('#summaryTable').DataTable({
			 	data: allDataArray,
		        columns: [
		            { title: "Test Phase", data: "Pass Rates.0.Test Phase" },
		            { title: "Sprint", data: "Sprint" },
		            { title: "Build Tag", data: "Build Name" },
		            { title: "Date", data: 'Build Timestamp', render: function (data, type, full, meta) {
		            	var buildDate = new Date(Date.parse(data));
                		return buildDate.toLocaleDateString('en-GB', {month: 'short', day: 'numeric', year: 'numeric'}).split(' ').join('-');
		            }},
		            { title: "Test Category", data: "Pass Rates.0.Test Category" },
		            { title: "Test Count", data: "Pass Rates.0.Test Count" },
		            { title: "Pass Rate(%)", data: "Pass Rates.0.Pass Rate", render: function ( data, type, full, meta ) {
		            	return "<strong style='color:blue'>" + (data * 100).toFixed(1) + "%</strong>";
    				}},
    				{ title: "Details", data: null, render: function (data, type, full, meta) {
    					    var BUILD = data["Build Name"];
						    var TEST_PHASE = data["Pass Rates"][0]["Test Phase"].toLowerCase();
						    var RESULT_CATEGORY = "";
						    var RESULT_DIR = "";
						    var reportURL = "";
						    if ( data["Pass Rates"][0]["Test Category"].toLowerCase().indexOf("kitchen") != -1) {
						    	RESULT_CATEGORY = 'kitchen-result';
						    	var FILE_NAME = data["Pass Rates"][0]["Test Category"] + "-summary";
						    	if ( data["Pass Rates"][0]["Test Category"].toLowerCase().indexOf("aix") != -1) {
						    		RESULT_DIR = "aix";
						    	}
						    	if ( data["Pass Rates"][0]["Test Category"].toLowerCase().indexOf("windows") != -1) {
						    		RESULT_DIR = "windows";
						    	}
						    	if ( data["Pass Rates"][0]["Test Category"].toLowerCase().indexOf("linux") != -1) {
						    		RESULT_DIR = "linux";
						    	}
						    	reportURL = BASE_URL + "/" + BUILD + "/" + TEST_PHASE + "/" + RESULT_CATEGORY + "/" + RESULT_DIR + "/" + FILE_NAME + ".html";
						    }
						    if ( data["Pass Rates"][0]["Test Category"].toLowerCase().indexOf("cucumber") != -1) {
						    	RESULT_CATEGORY = 'cucumber-result';
						    	if ( data["Pass Rates"][0]["Test Category"].toLowerCase().indexOf("ui") != -1) {
						    		RESULT_DIR = "ui";
						    	}
						    	if ( data["Pass Rates"][0]["Test Category"].toLowerCase().indexOf("console") != -1) {
						    		RESULT_DIR = "console";
						    	}
						    	reportURL = BASE_URL + "/" + BUILD + "/" + TEST_PHASE + "/" + RESULT_CATEGORY + "/" + RESULT_DIR + "/summary.html";
						    }
						    return "<a href=" + reportURL+" target='_blank' style='color:CornflowerBlue'>Link</a>";	
    				}}
		        ]
		    });

			// Event listener for the customized filter
		    $('#sprintDropdown').change( function() {
		    	$('#summaryTable').DataTable().draw();
		    } );
		});
    });
	
	// Render tabs	
	$(function() {
		$("#tabs").tabs();
	});

	/* Chart rendering function */
	(function( $ ){
	   $.fn.renderChart = function(testCountDataPoints, passRateDataPoints) {
	      this.CanvasJSChart({
				title: {
					text: "Test Result Trend"
				},
				dataPointWidth: 40,
				// width: 1600, // fix width and height to aovid chart resizing problem
				// height: 300,
				toolTip:{   
					content: function(e){
					return "<strong>Pass Rate: "+(e.entries[0].dataPoint.y*100).toFixed(1) + "%</strong>";
					}			
				},
				axisX: {
					// title: "Date",
					labelFontSize: 14,
					labelAngle: -30
				},
				axisY: {
					title: "Pass Rate",
					labelFontSize: 14,
					interval: 0.2,
					valueFormatString: "##%"
				},
				axisY2:{
		            title: "Test Count",
		            // lineColor: "DarkSlateBlue",
		            // titleFontColor: "DarkSlateBlue",
		            // labelFontColor: "DarkSlateBlue",
		            labelFontSize: 14,
		            // interval: 10
	            },
				data: [{
					type: "column", 
					name: "Test Count",
					axisYType: "secondary",
					toolTipContent: "<strong>Test Count: {y}</strong>",
					color: "DeepSkyBlue",
					showInLegend: true,
					dataPoints: testCountDataPoints 
				},{
					type: "line", //change it to line, area, bar, pie, etc
					name: "Pass Rate",
					// axisYIndex: 0, //Defaults to Zero
					lineColor: "DarkSlateGrey",
					showInLegend: true,
					dataPoints: passRateDataPoints 
				}]
		    });
	      return this;
	   }; 
	})( jQuery );

    /* Custom filtering function which search data based on selected dropdown list value */
	$.fn.dataTable.ext.search.push(
	    function( settings, data, dataIndex ) {
	    	var selectedSprint = $('#sprintDropdown').find(":selected").text();
	        var sprintValue = data[1] // use data for the sprint column
	        if ( (selectedSprint == sprintValue) || (selectedSprint == 'All') ) return true; 
	        return false;
	    });
});