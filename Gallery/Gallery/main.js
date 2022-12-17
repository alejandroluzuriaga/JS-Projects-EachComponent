import './style.css';
import {MOCK_CARDS} from './constants';

//Setup
const appElement = document.querySelector('#app');

const getContainerTemplate = () =>`
<div id="gallery" class="alex-gallery">
</div>
`;

const getModalTemplate = () =>`
<div id="vote-modal" class="vote-modal">
  <div class="modal-header">
    <h2 id="modal-title"></h2>
    <button id="modal-close">✖</button>
  </div>
  <div modal-body></div>
</div>
`;


appElement.innerHTML += getContainerTemplate();
appElement.innerHTML += getModalTemplate();

//Logic
const galleryElement = document.querySelector("#gallery");
const modalElement = document.querySelector('#vote-modal');

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
<div class="card" role="button">
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

const handleOpenModal = (event) =>{
  modalElement.style.display = 'block';
}

const handleCloseButtonModal = (event) =>{
  modalElement.style.display = 'none';
}

const addModalListeners = () =>{
  const addCardsListeners = () =>{
    const cards = document.querySelectorAll('#gallery .card');
    cards.forEach((card) => card.addEventListener('click', handleOpenModal));
}
  const addCloseModalButtonListener = () =>{
    const button = document.querySelector('#modal-close');
    button.addEventListener('click', handleCloseButtonModal);
  }
addCardsListeners();
addCloseModalButtonListener();
}


setupCards();
addModalListeners();
