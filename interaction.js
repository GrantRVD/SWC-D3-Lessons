var cat_image = document.getElementById('cat');
var feed_button = document.getElementById('feed');

cat_image.addEventListener("click", function() {
	meow();
	sleep();
});

feed_button.addEventListener("click", feed)

function meow() {
	alert("meow!");
};

function feed() {
	alert("This offering pleases me, hooman.");
}