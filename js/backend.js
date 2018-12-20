'use strict';

(function () {

  var DOWNLOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var XHR_STATUS_OK = 200;
  var XHR_TIMEOUT = 10000;

  var performRequest = function (url, method, onLoad, onError, data) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText + '\n Не удалось загрузить данные');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;
    xhr.open(method, url);

    if (method === 'POST') {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  var load = function (onLoad, onError) {
    performRequest(DOWNLOAD_URL, 'GET', onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    performRequest(UPLOAD_URL, 'POST', onLoad, onError, data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();

