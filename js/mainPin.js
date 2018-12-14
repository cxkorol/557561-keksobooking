'use strict';

window.mainPin = (function () {

  var mapPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  // Функция получения координат главной точки
  var locationMapPinMain = function () {
    var locationX = Math.round(parseInt(mapPin.offsetLeft, 10)) + window.data.PIN_WIDTH / 2;
    var locationY = Math.round(parseInt(mapPin.offsetTop, 10)) + window.data.PIN_HEIGHT / 2;
    var inputAdress = adForm.querySelector('#address');

    inputAdress.setAttribute('value', locationX + ', ' + locationY);
    inputAdress.setAttribute('readonly', 'readonly');
  };

  return {
    locationMapPinMain: locationMapPinMain
  };

})();
