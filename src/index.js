$(".features").slick({
	autoplay: true,
	autoplaySpeed: 2000,
	mobileFirst: true,
	responsive: [
		{
			breakpoint: 765,
			settings: "unslick",
		},
	],
});
const nav = document.querySelector(".mobile-nav");
document.querySelector(".close").addEventListener("click", function (e) {
	e.preventDefault();
	nav.classList.toggle("opened");
});
document.querySelector(".fa-bars").addEventListener("click", function (e) {
	e.preventDefault();
	nav.classList.toggle("opened");
});
var waypoint = new Waypoint({
	element: document.querySelector(".hero h1"),
	handler: function () {
		document.querySelector("nav").classList.toggle("fixed");
	},
});
