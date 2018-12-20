'use strict';

window.map = (function () {

  var showMap = document.querySelector('.map');
  var mapFiltersContainer = showMap.querySelector('.map__filters-container');
  var containerPin = showMap.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var mapPin = document.querySelector('.map__pin--main');
  var resetButton = document.querySelector('.ad-form__reset');


  // Функция удаления настроек неактивного состояния
  var removeDisabled = function () {
    var fieldSet = adForm.querySelectorAll('fieldset');
    adForm.classList.remove('ad-form--disabled');

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

    window.backend.load(function (adwertisments) {
      var newCard = window.card.renderCard(adwertisments[pinId]);
      showMap.insertBefore(newCard, mapFiltersContainer);
    });

  };

  // Функция активации кликов для смены карточек
  var addPinsClickListeners = function (item) {

    item.addEventListener('click', function (evt) {
      var button = evt.currentTarget;
      var pinId = button.getAttribute('data-id');
      activateCardPopup(pinId);
    });
  };

  var addCardClickListeners = function (closeButton) {
    closeButton.addEventListener('click', function () {
      closeCardPopup();
    });
  };


  var removePins = function () {
    var pinsList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pinsList) {
      pinsList.forEach(function (item) {
        item.remove();
      });
    }
  };

  var onSubmit = function () {
    adForm.reset();

    showMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    mapPin.style.left = window.dataPINMAIN_START_X + 'px';
    mapPin.style.top = window.data.PINMAIN_START_Y + 'px';

    closeCardPopup();
    removePins();
  };

  var saveForm = function () {
    onSubmit();
    window.pins.showSuccess();
  };

  // Функция перехода в активное состояние
  var activateState = function () {
    showMap.classList.remove('map--faded');
    removeDisabled();
    window.backend.load(function (adwertisments) {
      containerPin.appendChild(window.pins.getPins(adwertisments));
    },
    window.pins.showError);
  };

  mapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEY) {
      evt.preventDefault();
      activateState();
      window.mainPin.setAddressAttribute(window.mainPin.getMapPinMain());
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESC_KEY) {
      closeCardPopup();
    }
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), saveForm, window.pins.showError);
  });


  resetButton.addEventListener('click', onSubmit);

  return {
    activateState: activateState,
    onSubmit: onSubmit,
    addPinsClickListeners: addPinsClickListeners,
    addCardClickListeners: addCardClickListeners
  };

})();
