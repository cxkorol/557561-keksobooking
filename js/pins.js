'use strict';

window.pins = (function () {

  var main = document.querySelector('main');
  var templateMapPin = document.querySelector('#pin').content;

  // Функция создания и отрисовки меток на карте
  var renderPin = function (adwertisments, index) {
    var pinElement = templateMapPin.cloneNode(true);
    var pin = pinElement.querySelector('.map__pin');

    window.map.addPinsClickListeners(pin);

    pin.style.left = adwertisments.location.x - window.data.PIN_WIDTH / 2 + 'px';
    pin.style.top = adwertisments.location.y - window.data.PIN_HEIGHT / 2 + 'px';
    pin.querySelector('img').src = adwertisments.author.avatar;
    pin.querySelector('img').alt = adwertisments.offer.title;
    pin.setAttribute('data-id', index);

    return pinElement;
  };

  // Функция заполнения блока меток
  var getPins = function (adwertisments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < adwertisments.length; i++) {
      fragment.appendChild(renderPin(adwertisments[i], i));
    }

    return fragment;
  };

  var onSuccess = function () {
    var success = document.querySelector('#success').content.querySelector('.success');
    var successElement = success.cloneNode(true);
    successElement.addEventListener('mousedown', closeSuccess);
    main.appendChild(successElement);
    document.addEventListener('keydown', closeSuccess);
  };

  var closeSuccess = function () {
    var successElement = document.querySelector('.success');
    main.removeChild(successElement);
    document.removeEventListener('keydown', closeSuccess);
  };

  // Окно с ошибкой отправки формы
  var showError = function (errMes) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorElement = error.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorButton = errorElement.querySelector('.error__button');
    errorMessage.textContent = errMes;

    main.insertAdjacentElement('afterbegin', errorElement);
    document.addEventListener('keydown', closeError);
    errorElement.addEventListener('click', closeError);
    errorButton.addEventListener('click', closeError);
  };

  var closeError = function () {
    var errorElement = document.querySelector('.error');
    main.removeChild(errorElement);
    document.removeEventListener('keydown', closeError);
    errorElement.removeEventListener('click', closeError);
    window.form.onSubmit();
  };

  return {
    getPins: getPins,
    showError: showError,
    onSuccess: onSuccess,
    closeSuccess: closeSuccess
  };
})();
