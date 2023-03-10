const sliderContainer = document.querySelector('.slider-container');
const sliderContent = sliderContainer.querySelector('.slider-content');
const sliderItems = sliderContent.querySelector('.slider-items');
const sliderItem = sliderItems.querySelector('.slider-item');

let slideTouched = false;
let currentMouseX = 0;
let lastMouseX = 0;
let lastSliderX = 0;
let moveTo = 0;

const runSlider = () => {
  const space = 30;
  const sliderSizes = onResize();
};

const onResize = () => {
  const boundingCarousel = sliderContent.getBoundingClientRect();
  const sliderSizes = {
    w: boundingCarousel.width,
    h: boundingCarousel.height,
  };
  return sliderSizes;
};

const updateMouseX = (x) => {
  currentMouseX = x;
  currentMouseX < lastMouseX ? (moveTo -= 1.8) : (moveTo += 1.8);

  lastMouseX = currentMouseX;
};

const updateSlider = () => {
  lastSliderX = 0.2 * (moveTo - lastSliderX) + lastSliderX;
  sliderItems.style.transform = `rotateY(${lastSliderX}deg)`;

  requestAnimationFrame(updateSlider);
};

const checkMousePosition = () => {
  sliderItems.addEventListener('mousedown', () => {
    slideTouched = true;
    sliderItems.style.cursor = 'grabbing';
  });

  sliderItems.addEventListener('mouseup', () => {
    slideTouched = false;
    sliderItems.style.cursor = 'grab';
  });

  sliderItems.addEventListener('mouseleave', () => {
    slideTouched = false;
  });

  sliderItems.addEventListener('mousemove', (e) => {
    slideTouched && updateMouseX(e.clientX);
  });

  sliderItems.addEventListener('touchstart', () => {
    slideTouched = true;
  });

  sliderItems.addEventListener('touchend', () => {
    slideTouched = false;
  });

  sliderItems.addEventListener('touchmove', (e) => {
    slideTouched && e.touches[0].clientX;
  });

  updateSlider();
  runSlider();
};

checkMousePosition();
