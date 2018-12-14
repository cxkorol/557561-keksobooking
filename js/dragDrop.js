'use strict';

(function () {

  var mapPin = document.querySelector('.map__pin--main');
  var showMap = document.querySelector('.map');
  var containerPin = showMap.querySelector('.map__pins');

  var pinLimits = {
    minY: 130 - window.data.PIN_HEIGHT,
    maxY: 630,
    minX: 0 - window.data.PIN_WIDTH / 2,
    maxX: containerPin.offsetWidth - window.data.PIN_WIDTH / 1.5
  };

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoordsX = mapPin.offsetLeft - shift.x;
      var newCoordsY = mapPin.offsetTop - shift.y;

      if (newCoordsX < pinLimits.minX) {
        newCoordsX = pinLimits.minX;
      }
      if (newCoordsX > pinLimits.maxX) {
        newCoordsX = pinLimits.maxX;
      }
      if (newCoordsY < pinLimits.minY) {
        newCoordsY = pinLimits.minY;
      }
      if (newCoordsY > pinLimits.maxY) {
        newCoordsY = pinLimits.maxY;
      }

      mapPin.style.top = newCoordsY + 'px';
      mapPin.style.left = newCoordsX + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.mainPin.locationMapPinMain();

      if (showMap.classList.contains('map--faded')) {
        window.map.activateState();
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (prevEvt) {
          prevEvt.preventDefault();
          mapPin.removeEventListener('click', onClickPreventDefault);
        };
        mapPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
