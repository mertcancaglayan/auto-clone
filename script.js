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

function bannerSlideTo(position) {
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

	bannerSlideTo(newScrollPosition);

	navButtons.forEach((btn, idx) => {
		btn.classList.toggle("active", idx === index);
	});
}

let currentSlideIndex = 0;
function bannerAutoSlide() {
	const slides = document.querySelectorAll(".slider-item");
	const totalSlides = slides.length;

	setInterval(() => {
		currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
		selectSlide(currentSlideIndex);
	}, 5000);
}

bannerAutoSlide();

let showOverlay = false;

const overlay = document.querySelector(".overlay");
const iframe = overlay.querySelector("iframe");

function openOverlay(videoUrl) {
	overlay.style.display = "flex";
	iframe.src = videoUrl;
	document.body.style.overflow = "hidden";
}

function closeOverlay() {
	overlay.style.display = "none";
	iframe.src = "";
	document.body.style.overflow = "";
}

function toggleVideoOverlay(videoUrl) {
	showOverlay = !showOverlay;

	if (showOverlay) {
		openOverlay(videoUrl);
	} else {
		closeOverlay();
	}
}

function slide(direction) {
	const sliderContainer = document.querySelector(".slider-container");
	const sliderCard = document.querySelector(".slider-card");

	const slideGap = parseInt(getComputedStyle(sliderContainer).gap, 10); 

	const slideWidth = sliderCard.offsetWidth + slideGap;

	const maxScrollLeft = sliderContainer.scrollWidth - sliderContainer.clientWidth;

	if (direction === "prev") {
		if (sliderContainer.scrollLeft === 0) return;
		sliderContainer.scrollBy({
			left: -slideWidth,
			behavior: "smooth",
		});
	} else if (direction === "next") {
		if (sliderContainer.scrollLeft === maxScrollLeft) return;
		sliderContainer.scrollBy({
			left: slideWidth,
			behavior: "smooth",
		});
	}
}
