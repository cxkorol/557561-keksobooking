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

    var closeButton = cardElement.querySelector('.popup__close');
    window.map.addCardClickListeners(closeButton);

    if (adwertisments.offer.title.length !== 0 && adwertisments.offer.hasOwnProperty('title')) {
      cardElement.querySelector('.popup__title').textContent = adwertisments.offer.title;
    } else {
      cardElement.querySelector('popup__title').remove();
    }

    if (adwertisments.offer.address.length !== 0 && adwertisments.offer.hasOwnProperty('address')) {
      cardElement.querySelector('.popup__text--address').textContent = adwertisments.offer.address;
    } else {
      cardElement.querySelector('.popup__text--address').remove();
    }

    if (adwertisments.offer.price.length !== 0 && adwertisments.offer.hasOwnProperty('price')) {
      cardElement.querySelector('.popup__text--price').textContent = adwertisments.offer.price + '₽/ночь';
    } else {
      cardElement.querySelector('.popup__text--price').remove();
    }

    if (adwertisments.offer.type.length !== 0 && adwertisments.offer.hasOwnProperty('type')) {
      cardElement.querySelector('.popup__type').textContent = adwertisments.offer.type;
    } else {
      cardElement.querySelector('.popup__type').remove();
    }

    if (adwertisments.offer.rooms.length !== 0 && adwertisments.offer.guests.length !== 0 && adwertisments.offer.hasOwnProperty('rooms') && adwertisments.offer.hasOwnProperty('guests')) {
      cardElement.querySelector('.popup__text--capacity').textContent = adwertisments.offer.rooms + ' ' + roomsAdw(adwertisments.offer.rooms) + ' ' + adwertisments.offer.guests + ' ' + guestsAdw(adwertisments.offer.guests);
    } else {
      cardElement.querySelector('.popup__text--capacity').remove();
    }

    if (adwertisments.offer.checkin.length !== 0 && adwertisments.offer.checkout.length !== 0 && adwertisments.offer.hasOwnProperty('checkin') && adwertisments.offer.hasOwnProperty('checkout')) {
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adwertisments.offer.checkin + ' выезд до ' + adwertisments.offer.checkout;
    } else {
      cardElement.querySelector('.popup__text--time').remove();
    }

    if (adwertisments.offer.description.length !== 0 && adwertisments.offer.hasOwnProperty('descrition')) {
      cardElement.querySelector('.popup__description').textContent = adwertisments.offer.descrition;
    } else {
      cardElement.querySelector('.popup__description').remove();
    }

    if (adwertisments.author.avatar.length !== 0 && adwertisments.author.hasOwnProperty('avatar')) {
      cardElement.querySelector('.popup__avatar').src = adwertisments.author.avatar;
    } else {
      cardElement.querySelector('.popup__avatar').remove();
    }


    // Добавление особенностей объявлений
    var features = cardElement.querySelector('.popup__features');
    if (features.length !== 0 && adwertisments.hasOwnProperty('features')) {
      for (var i = 0; i < adwertisments.offer.features.length; i++) {
        var newFeature = document.createElement('li');
        newFeature.className = 'popup__feature popup__feature--' + adwertisments.offer.features[i];
        features.appendChild(newFeature);
      }
    } else {
      features.remove();
    }

    // Добавление фотографий объявлений
    var photos = cardElement.querySelector('.popup__photos');
    if (photos.length !== 0) {
      for (var j = 0; j < adwertisments.offer.photos.length; j++) {
        var newPhoto = document.createElement('img');
        newPhoto.className = 'popup__photo';
        newPhoto.width = window.data.PHOTO_WIDTH;
        newPhoto.height = window.data.PHOTO_HEIGHT;
        newPhoto.src = adwertisments.offer.photos[j];
        newPhoto.alt = 'Фотография жилья';
        photos.appendChild(newPhoto);
      }
    } else {
      photos.remove();
    }

    return cardElement;
  };

  return {
    createAdwArray: createAdwArray,
    renderCard: renderCard
  };

})();
