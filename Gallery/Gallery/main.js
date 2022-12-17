import './style.css';
import {MOCK_CARDS} from './constants';

//Setup
const appElement = document.querySelector('#app');

const getContainerTemplate = () =>`
<div id="gallery" class="alex-gallery">
</div>`

appElement.innerHTML += getContainerTemplate();

//Logic
const galleryElement = document.querySelector("#gallery");

const setupStars = (score) =>{
  if (!score){
    return `<p>No rating 💀</p>`
  } else{
  let starContainer = [];
  for(let i=1; i<score; ++i){
    starContainer.push(`<span class="star">⭐</span>`)
  }
  return starContainer.join('');
}
}

const getCardTemplate = (card) =>`
<div class="card">
  <h3>${card.name}</h3>

  <div class="image-container">
    <img src="${card.logo}" alt="${card.name}" />
  </div>

  <span>${card.score.toFixed(2)}</span>

  <div class="score-container">${setupStars(card.score)}</div>
</div>
`;

const setupCards = () =>{
  MOCK_CARDS.forEach((card) =>{
    const template = getCardTemplate(card);
    galleryElement.innerHTML += template;
  })
}

setupCards();