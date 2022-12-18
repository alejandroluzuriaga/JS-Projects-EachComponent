

export const getModalBodyTemplate = (cardData) =>`
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

export const getContainerTemplate = () =>`
<div id="gallery" class="alex-gallery">
</div>
`;

export const getModalTemplate = () =>`
<div id="vote-modal" class="vote-modal">
  <div class="modal-header">
    <h2 id="modal-title"></h2>
    <button id="modal-close">✖</button>
  </div>
  <div class="modal-body"></div>
</div>
`;
