'use strict';

var OFFER_TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var OFFER_TYPE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунагло'
};

var OFFER_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

var OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var PHOTO_WIDTH = 45;
var PHOTO_HEIGHT = 40;

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var MIN_COORDINATE_X = 0;
var MAX_COORDINATE_X = 1200;

var MIN_COORDINATE_Y = 130;
var MAX_COORDINATE_Y = 630;

var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var MIN_GUESTS = 1;
var MAX_GUESTS = 10;

var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var OFFER_QUANTITY = 8;

// Нахождение случайного числа в диапазоне
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Нахождение случайного числа
var getRandomUp = function (upperBound) {
  return Math.floor(Math.random() * upperBound);
};

// Функция случайной сортировки массивов
var getRandomArr = function (arr) {
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

// Создать функцию генерации массива строк
var getNewArrayFeature = function (arr) {
  var copyArray = arr.slice();
  var randomLength = getRandom(1, copyArray.length);
  var newArray = [];
  for (var i = 0; i < randomLength; i++) {
    var randomIndex = getRandom(0, copyArray.length - 1);
    newArray[i] = copyArray[randomIndex];
    copyArray.splice(randomIndex, 1);
  }
  return newArray;
};

// Функция случайного свойства объекта
var getRandomProperty = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[Math.floor(keys.length * Math.random())]];
};


// Функция создания массива объявлений
var createAdwArray = function () {
  var adw = [];
  for (var i = 0; i < OFFER_QUANTITY; i++) {

    var avatar = 'img/avatars/user' + 0 + (i + 1) + '.png';
    var title = OFFER_TITLE[i];
    var coordinateX = getRandom(MIN_COORDINATE_X, MAX_COORDINATE_X);
    var coordinateY = getRandom(MIN_COORDINATE_Y, MAX_COORDINATE_Y);
    var adress = coordinateX + ', ' + coordinateY;
    var price = getRandom(MIN_PRICE, MAX_PRICE);
    var type = getRandomProperty(OFFER_TYPE);
    var rooms = getRandom(MIN_ROOMS, MAX_ROOMS);
    var guests = getRandom(MIN_GUESTS, MAX_GUESTS);
    var checkin = OFFER_TIME[getRandomUp(OFFER_TIME.length)];
    var checkout = OFFER_TIME[getRandomUp(OFFER_TIME.length)];
    var features = getNewArrayFeature(OFFER_FEATURES);
    var description = '';
    var photos = getRandomArr(OFFER_PHOTOS).slice();

    // Cоздание объекта объявлений
    adw[i] = {
      author: {
        avatar: avatar
      },

      offer: {
        title: title,
        adress: adress,
        price: price,
        type: type,
        rooms: rooms,
        guests: guests,
        checkin: checkin,
        checkout: checkout,
        features: features,
        description: description,
        photos: photos
      },

      location: {
        coordX: coordinateX,
        coordY: coordinateY
      }
    };
  }
  return adw;
};

var adw = createAdwArray();

console.log(adw);

var showMap = document.querySelector('.map');
var containerPin = showMap.querySelector('.map__pins');
var similarMapPin = document.querySelector('#pin').content.querySelector('.map__pin');

// Создание и отрисовка меток на карте
var renderPin = function (ad) {
  var pinElement = similarMapPin.cloneNode(true);

  pinElement.style.left = ad.location.coordX - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = ad.location.coordY - PIN_HEIGHT / 2 + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;

  return pinElement;
};

// Заполнение блока меток
var getPin = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adw.length; i++) {
    fragment.appendChild(renderPin(adw[i]));
  }
  return fragment;
};
containerPin.appendChild(getPin());

// Cоздание и отрисовка карточки на карте
var renderCard = function (ad) {
  var cardElement = similarMapCard.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.adress;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = ad.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = ad.offer.descrition;
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  // Добавление особенностей объявлений
  var features = cardElement.querySelector('.popup__features');
  for (var i = 0; i < ad.offer.features.length; i++) {
    var newFeature = document.createElement('li');
    newFeature.className = 'popup__feature popup__feature--' + ad.offer.features[i];
    features.appendChild(newFeature);
  }

  // Добавление фотографий объявлений

  var photos = cardElement.querySelector('.popup__photos');
  for (var j = 0; j < ad.offer.photos.length; j++) {
    var newPhoto = document.createElement('img');
    newPhoto.className = 'popup_photo';
    newPhoto.width = PHOTO_WIDTH;
    newPhoto.height = PHOTO_HEIGHT;
    newPhoto.src = ad.offer.photos[j];
    newPhoto.alt = 'Фотография жилья';
    photos.appendChild(newPhoto);
  }

  return cardElement;
};

var similarMapCard = document.querySelector('#card').content.querySelector('.map__card');
var mapFiltersContainer = showMap.querySelector('.map__filters-container');
showMap.insertBefore(renderCard(adw[getRandomUp(OFFER_QUANTITY)]), mapFiltersContainer);

showMap.classList.remove('map--faded');
