import '../index.css';
import image1 from '../images/image1.png';
import image11 from '../images/image11.png';
import image12 from '../images/image12.png';
import image2 from '../images/image2.png';
import image21 from '../images/image21.png';
import image22 from '../images/image22.png';
import image3 from '../images/image3.png';
import image31 from '../images/image31.png';
import image32 from '../images/image32.png';

const headerSearchInput = document.querySelector('.header__search-input');
const headerSearchButton = document.querySelector('.header__search-button');

function filterCards() {
    const cards = document.querySelectorAll('.card');
    const searchTerm = headerSearchInput.value.toLowerCase();
    cards.forEach(card => {
        const title = card.querySelector('.card__title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

headerSearchInput.addEventListener('input', filterCards);

headerSearchButton.addEventListener('click', (event) => {
    event.preventDefault();
    headerSearchInput.focus();
});

const buyButtons = document.querySelectorAll('.card__button');

function updateButtonStates() {
    buyButtons.forEach(button => {
        const cardId = button.closest('.card').dataset.id;
        if (localStorage.getItem(cardId) === 'in-cart') {
            button.classList.add('in-cart');
            button.textContent = '✔️ В корзине';
        }
    });
}

buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const cardId = button.closest('.card').dataset.id;

        if (button.classList.contains('in-cart')) {
            button.classList.add('processing');
            button.textContent = '🔄Обработка...';
            button.classList.remove('in-cart');

            setTimeout(() => {
                button.classList.remove('processing');
                button.classList.remove('button');
                button.textContent = 'Купить';
                
                localStorage.removeItem(cardId);
            }, 2000);
        } else {
            button.classList.add('processing');
            button.textContent = '🔄Обработка...';
            button.classList.remove('button');

            setTimeout(() => {
                button.classList.remove('processing');
                button.classList.add('in-cart');
                button.textContent = '✔️ В корзине';

                localStorage.setItem(cardId, 'in-cart');
            }, 2000);
        }
    });
});

updateButtonStates();

//Работа с попапом
const popup = document.getElementById('popup');
const popupCloseButton = document.querySelector('.popup__close');
const popupTitle = document.querySelector('.popup__title');
const popupDescription = document.querySelector('.popup__description');
const popupPrice = document.querySelector('.popup__text-ordinary');
const popupOldPrice = document.querySelector('.popup__text-strike');
const sliderImage = document.getElementById('sliderImage');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

const cardData = {
    1: {
        title: '«Рождение Венеры» Сандро Боттичелли',
        description: '«Рождение Венеры» — это картина итальянского художника Сандро Боттичелли, которую он завершил приблизительно к 1485 году.',
        price: '1 000 000 $',
        oldPrice: '2 000 000 $',
        images: [image1, image11, image12]
    },
    2: {
        title: '«Тайная вечеря» Леонардо да Винчи',
        description: '«Тайная вечеря» — это одна из самых известных картин Леонардо да Винчи.',
        price: '3 000 000 $',
        oldPrice: '',
        images: [image2, image21, image22]
    },
    3: {
        title: '«Сотворение Адама» Микеланджело',
        description: '«Сотворение Адама» — это фреска, написанная Микеланджело.',
        price: '5 000 000 $',
        oldPrice: '6 000 000 $',
        images: [image3, image31, image32]
    }
};

let currentImageIndex = 0; // Индекс текущего изображения
let currentCardId = null; // Идентификатор текущей карточки

function updatePopup(cardId) {
    const data = cardData[cardId];
    popupTitle.textContent = data.title;
    popupDescription.textContent = data.description;
    popupPrice.textContent = data.price;
    popupOldPrice.textContent = data.oldPrice;

    currentCardId = cardId;
    currentImageIndex = 0; 
    sliderImage.src = data.images[currentImageIndex];
    sliderImage.alt = data.title;

    popup.classList.add('show');
    localStorage.setItem('popupOpen', cardId);
}

document.querySelectorAll('.card__title, .card__image').forEach(element => {
    element.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        if (card) {
            const cardId = card.dataset.id;
            updatePopup(cardId);
        }
    });
});

// Обработчик нажатия на кнопки слайдера
prevButton.addEventListener('click', () => {
    const data = cardData[currentCardId]; 
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : data.images.length - 1;
    sliderImage.src = data.images[currentImageIndex];
});

nextButton.addEventListener('click', () => {
    const data = cardData[currentCardId]; 
    currentImageIndex = (currentImageIndex < data.images.length - 1) ? currentImageIndex + 1 : 0;
    sliderImage.src = data.images[currentImageIndex];
});

// Закрытие попапа
popupCloseButton.addEventListener('click', () => {
    popup.classList.remove('show');
    localStorage.removeItem('popupOpen');
});

popup.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.classList.remove('show');
        localStorage.removeItem('popupOpen');
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        popup.classList.remove('show');
        localStorage.removeItem('popupOpen');
    }
});

// Восстановление состояния попапа при загрузке страницы
window.addEventListener('load', () => {
    const popupOpenId = localStorage.getItem('popupOpen');
    if (popupOpenId) {
        updatePopup(popupOpenId);
    }
});