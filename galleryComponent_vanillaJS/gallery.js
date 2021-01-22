/**
 * Gallery component.
 * It needs to be imported from your JavaScript file:
 * import gallery from './gallery.js'
 */
const API_URL = 'https://api.giphy.com/v1/gifs/trending?api_key=Xir7wIhJt9vmwB9xcMleSHKPGQcA85yQ&limit=25&rating=g&offset=';
const LOAD_ERROR = 'Ups...';
const UL_JS_CLASS = 'images_list';
const GALLERY_JS_CLASS = 'gallery';
const IMAGE_ITEM_JS_CLASS = 'image_item_img';
const MODAL_LAYER_JS_CLASS = 'modal_layer';
const CLOSE_MODAL_BUTTON_JS_CLASS = 'modal_close_button';
const MODAL_IMG_JS_CLASS = 'modal_img';
const GALLERY_STYLE = `
  .images-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-items: center;
    gap: 10px 5px;
    align-items: center;
  }
  .image__figcaption {
    background: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    color: white;
    padding: 5px;
    position: absolute;
    top: 5%;
    right: 0;
    text-align: right;
    opacity: 0;
    transition: opacity .25s ease-in-out;
  }
  .image {
    position: relative;
    margin: 0;
  }
  .image:hover .image__figcaption {
      opacity: 1;
  }
  .show-more {
    min-width: 25%;
    max-width: 35%;
    margin: 20px auto;
    display: block;
    padding: 10px 5px;
    font-family: Arial, sans-serif;
    font-size: 15px;
  }
  .show-more:hover {
    cursor: pointer;
  }
  .image__img {
    max-width: 300px;
    cursor: pointer;
  }
  .modal-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-close {
    position: absolute;
    top: -10px;
    right: -10px;
    font-family: Arial, sans-serif;
    font-size: 25px;
    font-weight: 600;
    color: #FFF;
    cursor: pointer;
    background: #000;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-layer-hidden {
    display: none;
  }
  .modal-layer-element {
    position: relative;
  }
  @media (max-width:768px) {
    .modal-layer-element {
      max-width: 90%;
    }
    .modal-layer-element img {
      width: 100%;
    }
}
`; 

let offset = 0;

/**
 * Fetch data from URL
 */
const getData = function(){
 return fetch(`${API_URL}${offset}`)
  .then(response => response.json())
  .then(data => addImages(data));
};

/**
 * Utility function to create the list components.
 * @param {Object} data
 */
const addImages = (data) => {
  const page =  data.data.map(imgComponent).reduce((acum, curr) => {
    return acum + curr;
  }, '');
  return page;
};


/**
 * Utility function to create every item.
 * @param {Object} item
 */
const imgComponent = (item) => {
  const COMPONENT = `
    <li class="images-list__item">
      <figure class="image">
        <img class="image__img ${IMAGE_ITEM_JS_CLASS}" src="${item.images.fixed_height.url}" alt="${item.title}" attr-original=${item.images.original.url}/>
        <figcaption class="image__figcaption">${item.title}</figcaption>
      </figure>
    </li>
    `;
  return COMPONENT;
};

/**
 * Action button function to add more images.
 * @param {Element} imagesList
 * @param {HTMLElement} outerElement
 */
const addMoreImgs = (imagesList, outerElement) => {
  offset += 25;
  getData()
  .then(data => {
    const PREVIOUS_CONTENT = imagesList.innerHTML;
    imagesList.innerHTML = PREVIOUS_CONTENT + data;
    addImgListener(outerElement, imagesList);
  })
  .catch(e => outerElement.innerHTML = LOAD_ERROR);
};

/**
 * Utility function to create the gallery.
 * @param {HTMLElement} outerElement
 * @param {string} data
 */
const createGallery = (outerElement, data) => {
  const IMAGES_LIST = outerElement.querySelector(`.${UL_JS_CLASS}`);
  IMAGES_LIST.innerHTML = data;
  addImgListener(outerElement, IMAGES_LIST);
  addShowMoreButtonElement(outerElement);
  addCloseModalButtonListener(outerElement);
};

/**
 * Utility function to add the 'show more' button.
 * @param {HTMLElement} outerElement
 */
const addShowMoreButtonElement = (outerElement) => {
  const IMAGES_LIST = outerElement.querySelector(`.${UL_JS_CLASS}`);
  const GALLERY = outerElement.querySelector(`.${GALLERY_JS_CLASS}`);
  const BTN = document.createElement("button");
  BTN.innerText = 'Show more';
  BTN.classList.add('show_more', 'show-more');
  GALLERY.appendChild(BTN);
  BTN.addEventListener('click', () => addMoreImgs(IMAGES_LIST, outerElement));
};

/**
 * Utility function to add an event listener to images.
 * @param {HTMLElement} outerElement
 * @param {Element} imagesList
 */
const addImgListener = (outerElement, imagesList) => {
  const IMAGES_LIST_ITEMS = imagesList.querySelectorAll(`.${IMAGE_ITEM_JS_CLASS}`);
  IMAGES_LIST_ITEMS.forEach(item => {
    item.addEventListener('click', (event) => {
      openModalLayer(event, outerElement)
    })
  });
}

/**
 * Utility function to add gallery CSS.
 * @param {string} styleString
 */
const addGalleryStyle = (() => {
  const galleryStyle = document.createElement('style');
  document.head.append(galleryStyle);
  return (styleString) => galleryStyle.textContent = styleString;
})();

/**
 * Utility function to add an event listener to close modal layer button.
 * @param {HTMLElement} outerElement
 */
const addCloseModalButtonListener = (outerElement) => {
  const CLOSE_MODAL_BTN = outerElement.querySelector(`.${CLOSE_MODAL_BUTTON_JS_CLASS}`);
  CLOSE_MODAL_BTN.addEventListener('click', () => closeModalLayer(outerElement));
}

/**
 * Action button function to close modal layer.
 * @param {HTMLElement} outerElement
 */
const closeModalLayer = (outerElement) => {
  const MODAL_LAYER = outerElement.querySelector(`.${MODAL_LAYER_JS_CLASS}`);
  MODAL_LAYER.classList.add('modal-layer-hidden');
}

/**
 * Action function to open modal layer.
 * @param {Event} event
 * @param {HTMLElement} outerElement
 */
const openModalLayer = (event, outerElement) => {
  const MODAL_LAYER = outerElement.querySelector(`.${MODAL_LAYER_JS_CLASS}`);
  const MODAL_IMG = MODAL_LAYER.querySelector(`.${MODAL_IMG_JS_CLASS}`);
  const TARGET = event.target;
  MODAL_IMG.src = TARGET.getAttribute('attr-original');
  MODAL_IMG.setAttribute('alt', TARGET.alt);
  MODAL_LAYER.classList.remove('modal-layer-hidden');
}

/**
 * Utility function to create the basic layout.
 * @param {Element} outerElement
 */
const createBasicLayout = (outerElement) => {
  const LAYOUT = `
  <div class="${GALLERY_JS_CLASS}">
    <ul class="${UL_JS_CLASS} images-list"></ul>
    <div class="modal-layer modal-layer-hidden ${MODAL_LAYER_JS_CLASS}">
      <div class="modal-layer-element">
        <span class="modal-close ${CLOSE_MODAL_BUTTON_JS_CLASS}">X</span>
        <img class="${MODAL_IMG_JS_CLASS}" src="" alt="">
      </div> 
    </div> 
  </div>
  `;
  outerElement.innerHTML = LAYOUT;
}

/**
 * Default exported gallery function
 * @param {string} element
 */
const gallery = (element) => {
  const OUTER_ELEMENT = document.getElementById(element);
  addGalleryStyle(GALLERY_STYLE);
  createBasicLayout(OUTER_ELEMENT);
  getData()
  .then(data => createGallery(OUTER_ELEMENT, data))
  .catch(e => OUTER_ELEMENT.innerHTML = LOAD_ERROR);
};

export default gallery;