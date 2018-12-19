'use strict';

window.pins = (function () {

  var templateMapPin = document.querySelector('#pin').content.querySelector('.map__pin');

  // Функция создания и отрисовки меток на карте
  var renderPin = function (adwertisments, index) {
    var pinElement = templateMapPin.cloneNode(true);

    pinElement.style.left = adwertisments.location.coordX - window.data.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = adwertisments.location.coordY - window.data.PIN_HEIGHT / 2 + 'px';
    pinElement.querySelector('img').src = adwertisments.author.avatar;
    pinElement.querySelector('img').alt = adwertisments.offer.title;
    pinElement.setAttribute('data-id', index);

    return pinElement;
  };

  return {
    renderPin: renderPin
  };
})();
