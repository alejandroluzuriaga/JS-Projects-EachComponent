import './style.css';
import {MOCK_CARDS} from './constants';
import {getModalBodyTemplate, getContainerTemplate, getModalTemplate} from './scripts/templates'
import {addCardsListeners, addModalListeners} from './scripts/listeners'
//Setup
const appElement = document.querySelector('#gallery-container');
const getCardTemplate = (card) =>`
<div class="card" role="button" id="${card._id}">
  <h3>${card.name}</h3>

  <div class="image-container">
    <img src="${card.logo}" alt="${card.name}" />
  </div>

  <span>${card.score.toFixed(2)}</span>

  <div class="score-container">${setupStars(card.score)}</div>
</div>
`
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
  addCardsListeners(handleOpenModal); //handleOpenModal
}

const setupModalData = (cardData)=>{
  currentCard = cardData;
  modalTitle.innerText = cardData.name;
  modalBody.innerHTML = getModalBodyTemplate(cardData);
  
  const buttons = document.querySelectorAll('.review-voting-container')
  buttons.forEach((button) => button.addEventListener('click', handleVotingButtons))
}

const handleOpenModal = (event) =>{
  const cardID = event.target.id;
  const cardData = cards.find((card) => card._id === cardID);

  modalElement.style.display = 'block';
  setupModalData(cardData);
  addModalListeners(handleCloseButtonModal);
}

const handleCloseButtonModal = (event) =>{
  modalElement.style.display = 'none';
}

setupCards();
addCardsListeners(handleOpenModal);
