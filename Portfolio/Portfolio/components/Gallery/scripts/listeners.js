export const addCardsListeners = (handler) =>{
    const cards = document.querySelectorAll('#gallery .card');
    cards.forEach((card) => card.addEventListener('click', handler)); //handleOpenModal
  }
  
export const addModalListeners = (handler) =>{
    const addCloseModalButtonListener = () =>{
      const button = document.querySelector('#modal-close');
      button.addEventListener('click', handler); //handleCloseButtonModal
    }
  addCloseModalButtonListener();
  }