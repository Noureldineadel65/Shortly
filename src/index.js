var waypoint = new Waypoint({
	element: document.querySelector("h1"),
	handler: function () {
		document.querySelector(".desk").classList.toggle("fixed");
	},
});

document.querySelector(".content").addEventListener("click", function (e) {
	if (!e.target.classList.contains("mobile-nav-link")) {
		document.querySelector(".mob").classList.remove("open");
	}
});

document.querySelector(".mobile-nav").addEventListener("click", function (e) {
	e.preventDefault();
	document.querySelector(".mob").classList.toggle("open");
});
const input = document.querySelector("#shorten-input");
const button = document.querySelector("#shorten-button");
function makeid(length) {
	var result = "";
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
}
function removeError() {
	input.classList.remove("error");
	document.querySelector(".error-message").style.display = "none";
}

function addLink(value) {
	// https://rel.ink/67gn48
	removeError();
	const link = `https://rel.ink/${makeid(Math.floor(Math.random() * 7 + 1))}`;
	const html = `<div class="shortened">
	<a href="#" class="link">${value}</a>
	<a href="#" class="shortened-link">${link}</a>
	<button class="btn square copy">Copy</button>
  </div>`;
	document.querySelector(".shortened-links").innerHTML += html;
	input.value = "";
}
function addError() {
	input.classList.add("error");
	document.querySelector(".error-message").style.display = "block";
}
button.addEventListener("click", function () {
	const reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
	if (reg.test(input.value)) {
		addLink(input.value);
	} else {
		addError();
	}
});
document
	.querySelector(".shortened-links")
	.addEventListener("click", function (e) {
		if (e.target.classList.contains("copy")) {
			const bg = getComputedStyle(e.target).backgroundColor;

			e.target.innerHTML = "Copied!";
			e.target.style.backgroundColor = "#222";
			setTimeout(() => {
				e.target.style.backgroundColor = "hsl(180, 66%, 49%)";
				e.target.innerHTML = "Copy";
			}, 1500);
		}
	});
