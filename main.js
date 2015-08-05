d3.json("http://bost.ocks.org/mike/nations/nations.json", function(nations) {
	// Get the chart area in the HTML file
	var chart = d3.select("#chart_area");
	var svgFrame = chart.append("svg");
	var canvas = svgFrame.append("g");

	// Set margins, width, and height.
	var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5};
	var frame_width = 960;
	var frame_height = 350;
	var canvas_width = frame_width - margin.left - margin.right;
	var canvas_height = frame_height - margin.top - margin.bottom;

	// Apply settings to elements
	svgFrame.attr("width", frame_width);
	svgFrame.attr("height", frame_height);

	// Shift the cnavas and make it slightly smaller
	canvas.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Create logarithmic scale for income
	var xScale = d3.scale.log(); // income
	xScale.domain([250, 1e5]); // set minimum and maximum
	xScale.range([0, canvas_width]); // min and max range on page

	// Create linear scale for lifespan
	var yScale = d3.scale.linear()
		.domain([10, 85])
		.range([canvas_height, 0]);

	// Create the x & y axes
	var xAxis = d3.svg.axis().orient("bottom").scale(xScale);
	var yAxis = d3.svg.axis().orient("left").scale(yScale);

	// Push x-axis to the page
	canvas.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + canvas_height + ")")
		.call(xAxis);

	// Push y-axis to the page
	canvas.append("g")
		.attr("class", "y axis")
		.call(yAxis);

});

// Some mucking about with circles and DOM
var circFrame = d3.select("#practice");
var circ = circFrame.append("circle");
circ.style({"r": 40, "fill": "green", "stroke": "black", "cx": 40, "cy": 40});