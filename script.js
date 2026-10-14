// Keep the four views in one document and in sync with the URL hash.
const views = [...document.querySelectorAll("[data-page]")];
const viewLinks = [...document.querySelectorAll("[data-view]")];
const navigation = document.querySelector("#site-nav");
const navigationToggle = document.querySelector(".nav-toggle");

function showView(name, updateHistory = true) {
	const selectedView = views.find((view) => view.dataset.page === name) ?? views[0];
	const selectedName = selectedView.dataset.page;

	views.forEach((view) => {
		view.hidden = view !== selectedView;
	});
	document.body.dataset.activeView = selectedName;

	viewLinks.forEach((link) => {
		if (link.closest(".site-nav")) {
			if (link.dataset.view === selectedName) {
				link.setAttribute("aria-current", "page");
			} else {
				link.removeAttribute("aria-current");
			}
		}
	});

	closeNavigation();
	window.scrollTo({ top: 0, behavior: "smooth" });

	if (updateHistory && window.location.hash !== `#${selectedName}`) {
		window.history.pushState(null, "", `#${selectedName}`);
	}
}

function closeNavigation() {
	navigation.classList.remove("is-open");
	navigationToggle.setAttribute("aria-expanded", "false");
	navigationToggle.setAttribute("aria-label", "Open navigation");
}

viewLinks.forEach((link) => {
	link.addEventListener("click", (event) => {
		const name = link.dataset.view;
		if (!name) return;
		event.preventDefault();
		showView(name);
	});
});

navigationToggle.addEventListener("click", () => {
	const isOpen = navigationToggle.getAttribute("aria-expanded") === "true";
	navigationToggle.setAttribute("aria-expanded", String(!isOpen));
	navigationToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
	navigation.classList.toggle("is-open", !isOpen);
});

window.addEventListener("popstate", () => {
	showView(window.location.hash.slice(1), false);
});

window.addEventListener("hashchange", () => {
	showView(window.location.hash.slice(1), false);
});

const initialView = window.location.hash.slice(1);
showView(initialView, false);

// A static site cannot deliver mail itself, so prepare a message for the visitor's email app.
document.querySelector("#contact-form").addEventListener("submit", (event) => {
	event.preventDefault();
	const form = event.currentTarget;
	if (!form.reportValidity()) return;

	const formData = new FormData(form);
	const subject = encodeURIComponent(`JPCakey order inquiry from ${formData.get("name")}`);
	const body = encodeURIComponent(
		`Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`
	);
	document.querySelector("#form-status").textContent = "Your email app is opening with your note ready to send.";
	window.location.href = `mailto:jpcakey@gmail.com?subject=${subject}&body=${body}`;
});
