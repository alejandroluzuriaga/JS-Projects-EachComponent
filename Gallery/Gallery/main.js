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
  <div class="modal-body"></div>
</div>
`;
appElement.innerHTML += getContainerTemplate();
appElement.innerHTML += getModalTemplate();

//Logic
const galleryElement = document.querySelector("#gallery");
const modalElement = document.querySelector('#vote-modal');
const modalTitle = document.querySelector('#modal-title');
const modalBody = document.querySelector('.modal-body');

let cards = MOCK_CARDS;
let currentCard;

const setupStars = (score) =>{
  if (!score){
    return `<p>No rating 💀</p>`
  } else{
  let starContainer = [];
  for(let i=1; i<=score; ++i){
    starContainer.push(`<span class="star">⭐</span>`)
  }
  return starContainer.join('');
}
}

const getCardTemplate = (card) =>`
<div class="card" role="button" id="${card._id}">
  <h3>${card.name}</h3>

  <div class="image-container">
    <img src="${card.logo}" alt="${card.name}" />
  </div>

  <span>${card.score.toFixed(2)}</span>

  <div class="score-container">${setupStars(card.score)}</div>
</div>
`;

const setupCards = () =>{
  galleryElement.innerHTML = '';
  cards.forEach((card) =>{
    const template = getCardTemplate(card);
    galleryElement.innerHTML += template;
  })
}

const handleVotingButtons = (event) =>{
  const newScore = Number(event.target.getAttribute('data-score'));
  currentCard.reviews += 1;

  (newScore >= currentCard.score) ? currentCard.score+=(newScore/currentCard.reviews):currentCard.score-=(newScore/currentCard.reviews);

  if (currentCard.score >=5){currentCard.score = 5};
  
  setupModalData(currentCard);
  setupCards();
  handleCloseButtonModal();
  addCardsListeners();
}

const setupModalData = (cardData)=>{
  currentCard = cardData;
  modalTitle.innerText = cardData.name;
  modalBody.innerHTML = getModalBodyTemplate(cardData);
  
  const buttons = document.querySelectorAll('.review-voting-container')
  buttons.forEach((button) => button.addEventListener('click', handleVotingButtons))
}

const getModalBodyTemplate = (cardData) =>`
<img src= "${cardData.logo}" alt="${cardData.name}" />
<h3>Score of ${cardData.score.toFixed(2)} with ${cardData.reviews} reviews </h3>
<div class="review-voting-container">
  <button data-score="1">⭐</button>
  <button data-score="2">⭐</button>
  <button data-score="3">⭐</button>
  <button data-score="4">⭐</button>
  <button data-score="5">⭐</button>
</div>
<p>Click a star to vote!</p>
`;

const handleOpenModal = (event) =>{
  const cardID = event.target.id;
  const cardData = cards.find((card) => card._id === cardID);

  modalElement.style.display = 'block';
  setupModalData(cardData);
  addModalListeners();
}

const handleCloseButtonModal = (event) =>{
  modalElement.style.display = 'none';
}

const addCardsListeners = () =>{
  const cards = document.querySelectorAll('#gallery .card');
  cards.forEach((card) => card.addEventListener('click', handleOpenModal));
}

const addModalListeners = () =>{
  const addCloseModalButtonListener = () =>{
    const button = document.querySelector('#modal-close');
    button.addEventListener('click', handleCloseButtonModal);
  }
addCloseModalButtonListener();
}

setupCards();
addCardsListeners();
