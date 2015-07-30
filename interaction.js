// Stuff for lesson 05
var cat_image = document.getElementById('cat');
var feed_button = document.getElementById('feed');
var workout_button = document.getElementById('workout');

cat_image.addEventListener("click", function() {
	meow();
	sleep();
});

feed_button.addEventListener("click", feed);
workout_button.addEventListener("click", workout);

function meow() {
	alert("meow!");
};

function feed() {
	cat_image.style.width = (cat_image.offsetWidth + 30.0) + 'px';
};

function workout() {
	cat_image.style.width = (cat_image.offsetWidth - 30.0) + 'px';
};

// Stuff for Lesson 06
var cat_object = {
	weight: 5,
	past_weight_values: [4.5, 5.1, 4.9],
	name: "Princess Caroline"
};

cat_object.height = 10

var cat_list = [cat_object];
cat_list.push({weight: 5, past_weight_values: [5.9, 5.3, 6.1], name: "Snowball"});