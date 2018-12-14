'use strict';

(function () {

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

  var OFFER = {
    palace: {
      title: 'Дворец',
      minPrice: 10000,
      defaultPrice: 10000},
    flat: {
      title: 'Квартира',
      minPrice: 1000,
      defaultPrice: 1000},
    house: {
      title: 'Дом',
      minPrice: 5000,
      defaultPrice: 5000},
    bungalo: {
      title: 'Бунгало',
      minPrice: 0,
      defaultPrice: 0}
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

  var OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
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

  var OFFER_QUANTITY = 8;

  var ENTER_KEY = 13;
  var ESC_KEY = 27;

  window.data = {
    OFFER_TITLE: OFFER_TITLE,
    OFFER: OFFER,
    OFFER_TIME: OFFER_TIME,
    OFFER_FEATURES: OFFER_FEATURES,
    OFFER_PHOTOS: OFFER_PHOTOS,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    PHOTO_WIDTH: PHOTO_WIDTH,
    PHOTO_HEIGHT: PHOTO_HEIGHT,
    MIN_PRICE: MIN_PRICE,
    MAX_PRICE: MAX_PRICE,
    MIN_COORDINATE_X: MIN_COORDINATE_X,
    MAX_COORDINATE_X: MAX_COORDINATE_X,
    MIN_COORDINATE_Y: MIN_COORDINATE_Y,
    MAX_COORDINATE_Y: MAX_COORDINATE_Y,
    MIN_ROOMS: MIN_ROOMS,
    MAX_ROOMS: MAX_ROOMS,
    MIN_GUESTS: MIN_GUESTS,
    MAX_GUESTS: MAX_GUESTS,
    OFFER_QUANTITY: OFFER_QUANTITY,
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY
  };

})();
