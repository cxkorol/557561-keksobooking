'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var inputPrice = adForm.querySelector('#price');
  var inputType = adForm.querySelector('#type');
  var capacity = adForm.querySelector('#capacity');
  var inputOption = capacity.querySelectorAll('option');
  var inputRoom = adForm.querySelector('#room_number');
  var inputTimeIn = adForm.querySelector('#timein');
  var inputTimeOut = adForm.querySelector('#timeout');

  var changePriceInput = function (evt) {
    var value = evt.target.value;
    inputPrice.min = window.data.OFFER[value].minPrice;
    inputPrice.placeholder = window.data.OFFER[value].defaultPrice;
  };

  var guestQuantity = {
    '1': [true, true, false, true],
    '2': [true, false, false, true],
    '3': [false, false, false, true],
    '100': [true, true, true, false],
  };

  var roomNumberHandler = function (evt) {
    var value = evt.target.value;
    for (var i = 0; i < inputOption.length; i++) {
      inputOption[i].selected = true;
      inputOption[i].disabled = guestQuantity[value][i];
      if (inputOption[i].disabled === true) {
        inputOption[i].selected = false;
      }
    }
  };

  inputType.addEventListener('input', changePriceInput);
  inputRoom.addEventListener('change', roomNumberHandler);

  inputTimeIn.addEventListener('change', function (evt) {
    inputTimeOut.value = evt.target.value;
  });
  inputTimeOut.addEventListener('change', function (evt) {
    inputTimeIn.value = evt.target.value;
  });

})();
