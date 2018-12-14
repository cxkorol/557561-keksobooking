'use strict';

window.util = (function () {

  // Нахождение случайного числа в диапазоне
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Нахождение случайного числа
  var getRandomUp = function (upperBound) {
    return Math.floor(Math.random() * upperBound);
  };

  // Функция случайной сортировки массивов
  var shuffleArr = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  // Функция генерации массива строк
  var getNewArrayFeature = function (arr) {
    var copyArray = arr.slice();
    var randomLength = getRandom(1, copyArray.length);
    var newArray = [];
    for (var i = 0; i < randomLength; i++) {
      var randomIndex = getRandom(0, copyArray.length - 1);
      newArray[i] = copyArray[randomIndex];
      copyArray.splice(randomIndex, 1);
    }
    return newArray;
  };

  // Функция случайного свойства объекта
  var getRandomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[Math.floor(keys.length * Math.random())]];
  };

  return {
    getRandom: getRandom,
    getRandomUp: getRandomUp,
    shuffleArr: shuffleArr,
    getNewArrayFeature: getNewArrayFeature,
    getRandomProperty: getRandomProperty
  };

})();
