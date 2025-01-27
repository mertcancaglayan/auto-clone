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
const overlayVideoWrapper = overlay.querySelector(".video-frame-wrapper");
const iframe = overlay.querySelector("iframe");
const overlayCarouselWrapper = overlay.querySelector(".overlay-carousel-wrapper");

function openVideoOverlay(content) {
	overlay.style.display = "flex";
	overlayVideoWrapper.style.display = "block";
	iframe.src = content;
	document.body.style.overflow = "hidden";
}

function openCarouselOverlay(content) {
	overlay.style.display = "flex";
	overlayCarouselWrapper.style.display = "block";

	const carouselItems = document.querySelectorAll(".carousel-item");
	carouselItems[content].scrollIntoView({ behavior: "smooth" });
}

function closeOverlay() {
	overlay.style.display = "none";
	iframe.src = "";
	document.body.style.overflow = "";
	overlayCarouselWrapper.style.display = "none";
	overlayVideoWrapper.style.display = "none";
}

function toggleOverlay(content, type) {
	showOverlay = !showOverlay;

	if (!showOverlay) {
		closeOverlay();
	}

	if (type === "video") {
		openVideoOverlay(content);
	} else if (type === "image") {
		openCarouselOverlay(content);
	}
}

function slide(direction, sliderId) {
	const sliderContainer = document.getElementById(`slider-${sliderId}`);
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

function autoSlider() {
	const videoSlider = document.getElementById("slider-videos");
	const imageSlider = document.getElementById("slider-images");

	const videoMaxScrollLeft = videoSlider.scrollWidth - videoSlider.clientWidth;
	const imageMaxScrollLeft = imageSlider.scrollWidth - imageSlider.clientWidth;

	let videoDirection = "next";
	let imageDirection = "next";

	setInterval(() => {
		if (videoSlider.scrollLeft >= videoMaxScrollLeft) {
			videoDirection = "prev";
		} else if (videoSlider.scrollLeft === 0) {
			videoDirection = "next";
		}
		slide(videoDirection, "videos");

		if (imageSlider.scrollLeft >= imageMaxScrollLeft) {
			imageDirection = "prev";
		} else if (imageSlider.scrollLeft === 0) {
			imageDirection = "next";
		}
		slide(imageDirection, "images");
	}, 5000);
}

autoSlider();

function slideCarousel(direction) {
	const carouselItem = document.querySelector(".carousel-item");
	const carousel = document.querySelector(".carousel");

	const slideWidth = carouselItem.offsetWidth;

	const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

	if (direction === "prev") {
		if (carousel.scrollLeft === 0) return;
		carousel.scrollBy({
			left: -slideWidth,
			behavior: "smooth",
		});
	} else if (direction === "next") {
		if (carousel.scrollLeft === maxScrollLeft) return;
		carousel.scrollBy({
			left: slideWidth,
			behavior: "smooth",
		});
	}
}

const searchArea = document.querySelector(".search");
const menuArea = document.querySelector(".menu");
const navbarLeft = document.querySelector(".navbar-left");

let lastScrollTop = 0;

window.addEventListener("scroll", () => {
	const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

	if (currentScroll === 0) {
		showSearchArea();
		hideScrollTopBtn();
	} else if (currentScroll > lastScrollTop) {
		hideSearchArea();
		showScrollTopBtn();
	}

	lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

function hideSearchArea() {
	searchArea.style.height = 0;
	searchArea.style.opacity = 0;
	menuArea.style.marginBottom = "25px";
}

function showSearchArea() {
	searchArea.style.height = "40px";
	searchArea.style.opacity = 1;
	menuArea.style.marginBottom = 0;
}

const scrollTopBtn = document.querySelector(".scroll-top-btn");

function hideScrollTopBtn() {
	scrollTopBtn.style.opacity = 0;
	scrollTopBtn.style.width = 0;
}

function showScrollTopBtn() {
	scrollTopBtn.style.opacity = 1;
	scrollTopBtn.style.width = "auto";
}

scrollTopBtn.addEventListener("click", scrollTop);

function scrollTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}
