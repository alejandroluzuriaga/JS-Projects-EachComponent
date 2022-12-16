import './style.css';
import {IMAGES} from './constants';

// Setup app
const appElement = document.querySelector('#app');

const getCarouselTemplate = () =>`
<div id="carousel" class = "carousel">
  <ul class="scrollable-set"></ul>
  <div class="image-preview"></div>
</div> `

appElement.innerHTML += getCarouselTemplate();

// Logic

const scrollableSet = document.querySelector('.scrollable-set');
const imagePrevElement = document.querySelector('.image-preview');
const getscrollableElementTemplate = (image, index) =>{
  return `
  <li role="button" class = "clickable">
    <img id='image-${index}'src="${image.src}" alt="${image.alt}" />
  </li>`
}
let actualImageIndex = 0;
let imageInterval;

const setupScrollableSet = () =>{
  IMAGES.forEach((image, index) =>{
    const template = getscrollableElementTemplate(image, index);
    scrollableSet.innerHTML += template;
  })
}

const setupCarouselInterval = () =>{
   imageInterval = setInterval(() =>{
    (actualImageIndex === IMAGES.length-1) ?  actualImageIndex = 0 : actualImageIndex += 1;
    setupImagePreview(IMAGES[actualImageIndex].src);
  }, 4000)
}

const resetCarouselPreview = () =>{
  clearInterval(imageInterval);
  setupCarouselInterval();
}

const setupImagePreview = (src) =>{
  imagePrevElement.style.backgroundImage = `url(${src})`;
  const selectedImage = document.querySelector(`img[src="${src}"]`);
  selectedImage.scrollIntoView({behavior: 'smooth'});
  
  resetCarouselPreview();
}

const handleChangePreview = (event) =>{
  const image = event.target;
  const imageIndex = Number(image.id.split('-')[1]);
  actualImageIndex = imageIndex;

  setupImagePreview(image.getAttribute('src'));
}

const addScrollableListeners = () =>{
  const scrollables = document.querySelectorAll('li.clickable');
  scrollables.forEach((scrollable)=> scrollable.addEventListener('click', handleChangePreview));

}


setupScrollableSet();
setupImagePreview(IMAGES[0].src);
addScrollableListeners();
setupCarouselInterval();