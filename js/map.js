'use strict';

window.map = (function () {

  var showMap = document.querySelector('.map');
  var mapFiltersContainer = showMap.querySelector('.map__filters-container');
  var containerPin = showMap.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var mapPin = document.querySelector('.map__pin--main');
  var adwertisments = window.card.createAdwArray(window.data.OFFER_QUANTITY);


  // Функция заполнения блока меток
  var getPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adwertisments.length; i++) {
      fragment.appendChild(window.pins.renderPin(adwertisments[i], i));
    }
    return fragment;
  };

  // Функция удаления настроек неактивного состояния
  var removeDisabled = function () {
    var fieldSet = adForm.querySelectorAll('fieldset');
    adForm.classList.remove('ad-form-disabled');

    for (var i = 0; i < fieldSet.length; i++) {
      fieldSet[i].removeAttribute('disabled');
    }
  };

  // Функция удаления активной карточки
  var closeCardPopup = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  // Функция отрисовки активной карточки
  var activateCardPopup = function (pinId) {
    var card = document.querySelector('.map__card');
    if (card) {
      closeCardPopup();
    }
    var newCard = window.card.renderCard(adwertisments[pinId]);
    showMap.insertBefore(newCard, mapFiltersContainer);

    var closeButton = document.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      closeCardPopup();
    });
  };

  // Функция активации кликов для смены карточек
  var addPinsClickListeners = function () {
    var pinList = containerPin.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinList.length; i++) {

      pinList[i].addEventListener('click', function (evt) {
        var button = evt.currentTarget;
        var pinId = button.getAttribute('data-id');
        activateCardPopup(pinId);
      });
    }
  };

  // Функция перехода в активное состояние
  var activateState = function () {
    showMap.classList.remove('map--faded');
    containerPin.appendChild(getPins());
    removeDisabled();
    addPinsClickListeners();
  };

  mapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEY) {
      evt.preventDefault();
      activateState();
      window.mainPin.locationMapPinMain();
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESC_KEY) {
      closeCardPopup();
    }
  });

  return {
    activateState: activateState
  };

})();
