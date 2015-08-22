d3.json("https://raw.githubusercontent.com/IsaKiko/D3-visualising-data/gh-pages/code/nations.json", function(nations) {
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

	// Keep an index corresponding to the year of data currently displayed
	var year_idx = parseInt(document.getElementById("year_slider").value)-1950;

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

	// Create sqrt scale for population
	var rScale = d3.scale.sqrt()
		.domain([0, 5e8])
		.range([0, 40]);

	// Create color scale for encoding region
	var cScale = d3.scale.category20();

	// Create the x & y axes
	var xAxis = d3.svg.axis().orient("bottom").scale(xScale);
	var yAxis = d3.svg.axis().orient("left").scale(yScale);

	// Add a D3 tooltip
	var tooltip = d3.select("body")
		.append("div")
		.style("position", "absolute")
		.style("visibility", "hidden");

	// Push x-axis to the page
	canvas.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + canvas_height + ")")
		.call(xAxis)
			.append("text")
			.attr("class", "x label")
			.attr("text-anchor", "end")
			.attr("x", canvas_width)
			.attr("y", - 6)
			.text("income per capita, inflation-adjusted (dollars)");

	// Push y-axis to the page
	canvas.append("g")
		.attr("class", "y axis")
		.call(yAxis)
			.append("text")
			.attr("class", "y label")
			.attr("text-anchor", "end")
			.attr("y", 6)
			.attr("dy", ".75em")
			.attr("transform", "rotate(-90)")
			.text("income per capita, inflation-adjusted (dollars)");

	// Start adding some data
	var data_canvas = canvas.append("g").attr("class", "data_canvas");

	//var filtered_nations = nations.filter(function(nation){ 
	//	return nation.population[nation.population.length-1][1] > 10000000; });

	// Create variable just for Sub-Saharan Africa
	var ssAfrica = nations.filter(function(nation) {
		return nation.name === "Sub-Saharan Africa"; });

	// Initialize filtered_nations to be all nations because all checkboxes are checked.
	var filtered_nations = nations.map(function(nation) {return nation;});

	// Variables for calculating and storing the averages for each region.
	var region_names = ["Sub-Saharan Africa", "South Asia", "Middle East & North Africa", "America", "East Asia & Pacific", "Europe & Central Asia"];
	var region_data = [];
	for (var i in region_names) {
		var filtered_nations_by_regions = nations.filter(function(nation) {
			return (nation.region == region_names[i]);
		});
		region_data[i] = calc_mean(filtered_nations_by_regions);
	}
	var filtered_reg_nations = region_data.map(function(region) {return region;});

	d3.select("#year_slider").on("input", function() {
		year_idx = parseInt(this.value) - 1950;
		d3.select("#year_display").attr("value", this.value);
		update();
	});

	// Populate the display for first time.
	update();

	d3.selectAll("label").attr("style", function() {return "background-color:" + cScale(this.children[0].value) + ";";});

	// Add callback for checkboxes
	d3.selectAll(".region_cb")
		.on("change", function() {
		var type = this.value;
		if (this.checked) {
			var new_nations = nations.filter(function(nation) {return nation.region === type;});
			filtered_nations = filtered_nations.concat(new_nations);
			filtered_reg_nations = filtered_reg_nations.concat(region_data.filter(function(avg) {return avg.region == type;}));
			this.parentNode.style.backgroundColor = cScale(this.value);
;	
		}
		else {
			filtered_nations = filtered_nations.filter(function(nation) {return nation.region != type;});
			filtered_reg_nations = filtered_reg_nations.filter(function(nation) {return nation.region != type;});
			this.parentNode.style.backgroundColor = "transparent";
		}

		update();
	})

	// This function will update the display when called, based on what options the user selects.
	function update() {
		var dot = data_canvas.selectAll(".dot").data(filtered_nations, function(d) {return d.name});

		// Add stuff the user wants.
		dot.enter().append("circle").attr("class","dot")
			.attr("fill", function(d) {return cScale(d.region); })
			.attr("stroke", "gray")
			.on("mouseover", function(d) {return tooltip
				.style("visibility", "visible")
				.style("font-family", "verdana")
				.text(d.name);})
			.on("mousemove", function() {return tooltip
				.style("top", (d3.event.pageY-10)+"px")
				.style("left", (d3.event.pageX+10)+"px");})
			.on("mouseout", function() {return tooltip.style("visibility", "hidden"); });

		// Remove stuff the user doesn't want.
		dot.exit().remove();

		// Update data if year has changed
		dot.transition().ease("linear").duration(200)
			.attr("cx", function(d) {return xScale(d.income[year_idx]); }) 
			.attr("cy", function(d) {return yScale(d.lifeExpectancy[year_idx]); })
			.attr("r", function(d) {return rScale(d.population[year_idx]); });

		// Below here is code to add crosses for regional averages.
		var cross = data_canvas.selectAll(".cross").data(filtered_reg_nations, function(d) {return d.region});

		cross.enter().append("path")
			.attr("class","cross")
			.attr("fill", function(d) {return cScale(d.region); })
			.attr("stroke", "black")
		cross.exit().remove();

		// Position will encode averages, size will encode regional total population.
		cross.transition().ease("linear").duration(200)
			.attr("transform", function(d) {return "translate(" + xScale(d.mean_income[year_idx]) + "," + yScale(d.mean_lifeExpectancy[year_idx]) + ")"; })
			.attr("d", d3.svg.symbol().type("cross").size(function(d) {return rScale(d.total_population[year_idx]);}));


	}

	// This function is to calculate the mean of a given region.
	function calc_mean(region_data) {
	var mean_income = [];
	var mean_lifeExpectancy = [];
	var total_population = [];

	for (var year_idx2 in region_data[0].years) {
		var sum_income = 0;
		var sum_lifeExpectancy = 0;
		var sum_population = 0;

		for (var k in region_data) {
			var kpop = region_data[k].population[year_idx2];
			var kincome = region_data[k].income[year_idx2];
			var klife = region_data[k].lifeExpectancy[year_idx2];
			sum_income += kpop*kincome; 
			sum_lifeExpectancy += kpop*klife;
			sum_population += kpop;             
		}

		mean_income[year_idx2] = sum_income/sum_population;
		mean_lifeExpectancy[year_idx2] = sum_lifeExpectancy/sum_population;
		total_population[year_idx2] = sum_population;
	}
	averageData = {
		region: region_data[0].region,
		years: region_data[0].years,
		mean_income: mean_income,
		mean_lifeExpectancy: mean_lifeExpectancy,
		total_population: total_population
	};

	return averageData;
}

});

// Some mucking about with circles and DOM
//var circFrame = d3.select("#practice");
//var circ = circFrame.append("circle");
//circ.style({"r": 40, "fill": "green", "stroke": "black", "cx": 40, "cy": 40});