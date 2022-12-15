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
  <li>
    <img id='image-${index}'src="${image.src}" alt="${image.alt}" />
  </li>`
}


const setupScrollableSet = () =>{
  IMAGES.forEach((image, index) =>{
    const template = getscrollableElementTemplate(image, index);
    scrollableSet.innerHTML += template;
  })
}

setupScrollableSet();