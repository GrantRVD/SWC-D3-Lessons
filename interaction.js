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
	cat_image.style.width = (cat_image.offsetWidth + 30) + 'px';
};

function workout() {
	cat_image.style.width = (cat_image.offsetWidth - 30) + 'px';
};