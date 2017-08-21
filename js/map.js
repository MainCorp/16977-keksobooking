'use strict';

var fragment = document.createDocumentFragment();
var containerPinMapHotels = document.querySelector('.tokyo__pin-map');
var hotelDialogTemplate = document.querySelector('#lodge-template').content;
var QUANTITY_HOTELS = 8;

var titleHotels = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var typeHotels = [
  'flat',
  'house',
  'bungalo'
];

var checkinHotels = ['12:00', '13:00', '14:00'];
var checkoutHotels = ['12:00', '13:00', '14:00'];
var featuresHotels = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var hotel = {
  'author': {
    'avatar': getAvatarHotel(1, 8)
  },

  'offer': {
    'title': getTitleHotel(),
    'address': 'hotel.location.x + , + hotel.location.y',
    'price': randomMinMax(1000, 1000000),
    'type': getTypeHotel(),
    'rooms': randomMinMax(0, 2),
    'guests': randomMinMax(1, 10),
    'checkin': checkinHotels[randomDefault(checkinHotels.length)],
    'checkout': checkoutHotels[randomDefault(checkoutHotels.length)],
    'features': getFeatures(featuresHotels),
    'description': '',
    'photos': []
  },

  'location': {
    'x': randomMinMax(300, 900),
    'y': randomMinMax(100, 500)
  }
};

/* Возвращает случайное значение */
function randomDefault(num) {
  return Math.floor(Math.random() * (num - 1));
}

/* Возвращает случайное значение от min до max */
function randomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/* Возвращает случайный аватарку пользователя */
function getAvatarHotel(min, max) {
  var currentRandom = randomMinMax(min, max);

  if (currentRandom < 10) {
    return 'img/avatars/user0' + currentRandom + '.png';
  } else {
    return 'img/avatars/user' + currentRandom + '.png';
  }
}

/* Возвращает случайный заголовок отеля */
function getTitleHotel() {
  return titleHotels[randomDefault(titleHotels.length)];
}

/* Возвращает случайный тип отеля */
function getTypeHotel() {
  return typeHotels[randomDefault(typeHotels.length)];
}

/* Возвращает случайные функции отеля */
function getFeatures(arr) {
  var random = randomDefault(arr.length);

  return arr.splice(0, random);
}

function createPinMapElement() {
  var element = document.createElement('div');
  element.classList.add('pin');
  element.style = 'left: ' + randomMinMax(300, 900) + 'px; top: ' + randomMinMax(100, 500) + 'px';

  var image = document.createElement('img');
  image.src = getAvatarHotel(1, 8);
  image.classList.add('rounded');
  image.setAttribute('width', '40px');
  image.setAttribute('heihgt', '40px');

  element.appendChild(image);

  return element;
}

function createHotelDialogs() {
  var element = hotelDialogTemplate.cloneNode(true);

  element.querySelector('.lodge__title').textContent = hotel.offer.title;
  element.querySelector('.lodge__address').textContent = hotel.offer.address;
  element.querySelector('.lodge__price').textContent = hotel.offer.price + '&#x20bd;/ночь';
  element.querySelector('.lodge__type').textContent = hotel.offer.type;
  element.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + hotel.offer.guests + ' гостей в '+ hotel.offer.rooms + ' комнатах';
  element.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
  element.querySelector('.lodge__description').textContent = hotel.offer.description;

  for (var i = 0; i < hotel.offer.features.length; i++) {
    var featureImages = document.createElement('span');
    featureImages.classList.add('feature__image');
    featureImages.classList.add('feature__image--' + hotel.offer.features);

    element.querySelector('.lodge__features').appendChild(featureImages);
  }

  document.querySelector('.dialog__title img').src = hotel.author.avatar;

  return element;
}

function showHotels(num) {
  for (var i = 0; i < num; i++) {
    fragment.appendChild(createPinMapElement());
  }
}

showHotels(QUANTITY_HOTELS);
document.body.appendChild(createHotelDialogs());
containerPinMapHotels.appendChild(fragment);
