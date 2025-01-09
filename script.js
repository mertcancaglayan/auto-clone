const mobileNavbar = document.querySelector(".mobile-navbar");
const mobileNavCloseBtn = document.querySelector(".mobile-close-btn");
const mobileMenuShowBtn = document.querySelector("#mobile-menu-show-btn");

let showMobileNavbar = false;

function mobileNavbarToggle() {
	showMobileNavbar = !showMobileNavbar;
	mobileNavbar.style.display = showMobileNavbar ? "block" : "none";
}

mobileMenuShowBtn.addEventListener("click", mobileNavbarToggle);
mobileNavCloseBtn.addEventListener("click", mobileNavbarToggle);
