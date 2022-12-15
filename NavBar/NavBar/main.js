import { DOCUMENTATION } from "./constants";
import './style.css';

const favoritesListElement = document.querySelector('#menu-content > .favorites'); //Favorites from menu-content's class
const inputSearch = document.querySelector('#menu-search') //Input from menu-search's class.
const searchBlockElement = document.querySelector('#menu-content > .search');
const toggleBurgerButton = document.querySelector('#toggle-menu');
const menuContentElement = document.querySelector('#menu-content');

const getDocumentationTemplate = (title, url) =>{ //Returns code in HTML to insert a list item from a title and URL.
  return `
  <li class="favorite-element">
    <a href="${url}" target="__blank">${title} </a>
  </li>
  `;
}

const generateList = (listID, elements) =>{ //Creates unordered list and inserts in its innerHTML every 'elements''s object.
  const ulElement = document.createElement('ul');
  ulElement.id = listID;

  elements.forEach((element) =>{
    const docTemplate = getDocumentationTemplate(element.title, element.url);
    ulElement.innerHTML += docTemplate;
  });
  return ulElement;
}

const setUpFavoritesList = () =>{ //Filter favorites from DOCUMENTATION in a new array, creates unordered list and loops through
                                  // that array doing 2 things: creating HTML code for every object, and appends them 
                                  //in the menu-content class.
  const favorites = DOCUMENTATION.filter((doc) => doc.favorite);
  const favoritesUL = generateList('favorites-list', favorites)
  favoritesListElement.append(favoritesUL);

};

const normalizeText = (text) => text.trim().toLowerCase();

const handleSearch = (event) =>{  //Filters DOCUMENTATION objects by text

  const { value } = event.target; //Getting the input
  const normalizedValue = normalizeText(value); //Normalizing it

  const filteredDocumentation = DOCUMENTATION.filter((doc) =>{ //Filter in new array those objects.title in our DOCUMENTATION
                                                              //that match the input value normalized
    const normalizedText = normalizeText(doc.title);
    return normalizedText.includes(normalizedValue);
  });

  const searchUL = generateList('search-list', filteredDocumentation);

 const previousUL =  document.querySelector('#search-list');
    if (previousUL){ //If previousUL exist, then remove it.
      previousUL.remove();
    }

  searchBlockElement.append(searchUL); //Append the new code on SearchBlockElement

}

const toggleOpenMenu = () =>{
  menuContentElement.classList.toggle('menu-content--open');
}

toggleBurgerButton.addEventListener('click', toggleOpenMenu)
setUpFavoritesList();
inputSearch.addEventListener('input', handleSearch)