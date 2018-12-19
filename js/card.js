'use strict';

window.card = (function () {

  var templateMapCard = document.querySelector('#card').content.querySelector('.map__card');

  // Функция создания массива объявлений
  var createAdwArray = function (index) {
    var adwertisments = [];
    for (var i = 0; i < index; i++) {
      adwertisments[i] = window.data.createRandomAdw(i);
    }
    return adwertisments;
  };

  // Функция присвоения текстовых окончаний для комнат
  var roomsAdw = function (roomsNumber) {
    var roomsText = '';
    if (roomsNumber === 1) {
      roomsText = 'комната';
    } else if (roomsNumber === 5) {
      roomsText = 'комнат';
    } else {
      roomsText = 'комнаты';
    }
    return roomsText;
  };

  // Функция присвоения текстовых окончаний для гостей
  var guestsAdw = function (guestsNumber) {
    var guestsText = '';
    if (guestsNumber === 1) {
      guestsText = 'гостя';
    } else {
      guestsText = 'гостей';
    }
    return guestsText;
  };


  // Функция создание и отрисовки карточки на карте
  var renderCard = function (adwertisments) {
    var cardElement = templateMapCard.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = adwertisments.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = adwertisments.offer.adress;
    cardElement.querySelector('.popup__text--price').textContent = adwertisments.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = adwertisments.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = adwertisments.offer.rooms + ' ' + roomsAdw(adwertisments.offer.rooms) + ' ' + adwertisments.offer.guests + ' ' + guestsAdw(adwertisments.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adwertisments.offer.checkin + ' выезд до ' + adwertisments.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = adwertisments.offer.descrition;
    cardElement.querySelector('.popup__avatar').src = adwertisments.author.avatar;

    // Добавление особенностей объявлений
    var features = cardElement.querySelector('.popup__features');
    for (var i = 0; i < adwertisments.offer.features.length; i++) {
      var newFeature = document.createElement('li');
      newFeature.className = 'popup__feature popup__feature--' + adwertisments.offer.features[i];
      features.appendChild(newFeature);
    }

    // Добавление фотографий объявлений
    var photos = cardElement.querySelector('.popup__photos');
    for (var j = 0; j < adwertisments.offer.photos.length; j++) {
      var newPhoto = document.createElement('img');
      newPhoto.className = 'popup__photo';
      newPhoto.width = window.data.PHOTO_WIDTH;
      newPhoto.height = window.data.PHOTO_HEIGHT;
      newPhoto.src = adwertisments.offer.photos[j];
      newPhoto.alt = 'Фотография жилья';
      photos.appendChild(newPhoto);
    }

    return cardElement;
  };

  return {
    createAdwArray: createAdwArray,
    renderCard: renderCard
  };

})();
