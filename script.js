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

function slideTo(position) {
	const slider = document.querySelector(".banner-slider");
	slider.scrollTo({
		left: position,
		behavior: "smooth",
	});
}

function selectSlide(index) {
	const slides = document.querySelectorAll(".slider-item");
	const navButtons = document.querySelectorAll(".banner-slider-nav-btn");

	const slideWidth = slides[0].clientWidth;
	const newScrollPosition = slideWidth * index;

	slideTo(newScrollPosition);

	navButtons.forEach((btn, idx) => {
		btn.classList.toggle("active", idx === index);
	});
}

let currentSlideIndex = 0;
function autoSlide() {
	const slides = document.querySelectorAll(".slider-item");
	const totalSlides = slides.length;

	setInterval(() => {
		currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
		selectSlide(currentSlideIndex);
	}, 5000);
}

autoSlide();
