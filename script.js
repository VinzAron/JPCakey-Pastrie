
/* Mobile navigation */
const navigation = document.querySelector("#site-nav");
const navigationToggle = document.querySelector(".nav-toggle");

function closeNavigation() {
    if (!navigation || !navigationToggle) return;

    navigation.classList.remove("is-open");
    navigationToggle.setAttribute("aria-expanded", "false");
    navigationToggle.setAttribute("aria-label", "Open navigation");
}

if (navigation && navigationToggle) {
    navigationToggle.addEventListener("click", () => {
        const isOpen =
            navigationToggle.getAttribute("aria-expanded") === "true";

        navigationToggle.setAttribute("aria-expanded", String(!isOpen));
        navigationToggle.setAttribute(
            "aria-label",
            isOpen ? "Open navigation" : "Close navigation"
        );

        navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeNavigation);
    });
}

/* Highlight the current page in the navigation */
const currentPage = window.location.pathname.split("/").pop() || "index.html";

const pageLinks = {
    "index.html": "Home",
    "menu.html": "Menu",
    "about.html": "About",
    "contact.html": "Contact"
};

if (navigation) {
    navigation.querySelectorAll("a").forEach((link) => {
        const href = link.getAttribute("href");

        if (href && href === currentPage) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

/* Contact form */
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) return;

        const formData = new FormData(contactForm);

        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        const subject = encodeURIComponent(
            `JPCakey order inquiry from ${name}`
        );

        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\n${message}`
        );

        const formStatus = document.querySelector("#form-status");

        if (formStatus) {
            formStatus.textContent =
                "Your email app is opening with your note ready to send.";
        }

        window.location.href =
            `mailto:jpcakey@gmail.com?subject=${subject}&body=${body}`;
    });
}
