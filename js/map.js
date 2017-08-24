'use strict';

var fragment = document.createDocumentFragment();
var containerPinMapHotels = document.querySelector('.tokyo__pin-map');
var hotelDialogTemplate = document.querySelector('#lodge-template').content;

var QUANTITY_HOTELS = 8;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_GUESTS = 1;
var MAX_GUESTS = 5;
var MIN_AVATARS = 1;
var MAX_AVATARS = 8;

var dataHotels = {
  'title': [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ],

  'type': [
    'flat',
    'house',
    'bungalo'
  ],

  'checkin': [
    '12:00',
    '13:00',
    '14:00'
  ],

  'checkout': [
    '12:00',
    '13:00',
    '14:00'
  ],

  'features': [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ]
};

var cloneTitleHotels = dataHotels.title.slice(0);
var collectionAvatars = [];
var allHotels = [];

for (var i = MIN_AVATARS; i <= MAX_AVATARS; i++) {
  collectionAvatars.push(i);
}

function random(element) {
  return Math.floor(Math.random() * element);
}

function randomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function leftPadWithZero(n) {
   if (n > 10) {
    return '' + n;
  } else {
    return '0' + n;
  }
}

function pullAvatar() {
  var index = random(collectionAvatars.length);
  var avatarIndex = collectionAvatars[index];
  
  collectionAvatars.splice(index, 1);
   
  return 'img/avatars/user' + leftPadWithZero(avatarIndex) + '.png';
}

function pullRandomElement(array) {
  var current = random(array.length);
  var element = array[current];
  var uniqueElement = array.splice(array.indexOf(element), 1).join();

  return uniqueElement;
}

function getRandomArray(array) {
  return array[random(array.length)];
}

function getFeatures(arr) {
  var rand = random(arr.length);

  return arr.splice(0, rand);
}

function getHotel() {
  var locationX = randomMinMax(300, 900);
  var locationY = randomMinMax(100, 500);

  var hotel = {
    'author': {
      'avatar': pullAvatar()
    },

    'offer': {
      'title': pullRandomElement(cloneTitleHotels),
      'address': locationX + ', ' + locationY,
      'price': randomMinMax(MIN_PRICE, MAX_PRICE),
      'type': getRandomArray(dataHotels.type),
      'rooms': randomMinMax(MIN_ROOMS, MAX_ROOMS),
      'guests': randomMinMax(MIN_GUESTS, MAX_GUESTS),
      'checkin': getRandomArray(dataHotels.checkin),
      'checkout': getRandomArray(dataHotels.checkout),
      'features': getFeatures(dataHotels.features),
      'description': '',
      'photos': []
    },

    'location': {
      'x': locationX,
      'y': locationY
    }
  };

  return hotel;
}

function createPinMapElement(hotel) {
  var element = document.createElement('div');
  element.classList.add('pin');
  element.style = 'left: ' + hotel.location.x + 'px; top: ' + hotel.location.y + 'px';

  var image = document.createElement('img');
  image.src = hotel.author.avatar;
  image.classList.add('rounded');
  image.setAttribute('width', '40px');
  image.setAttribute('height', '40px');

  element.appendChild(image);

  return element;
}

function createHotelDialog(hotel) {
  var element = hotelDialogTemplate.cloneNode(true);
  var lodgeType;
  var collectionFeatures = [];
  var featureImages;

  element.querySelector('.lodge__title').textContent = hotel.offer.title;
  element.querySelector('.lodge__address').textContent = hotel.offer.address;
  element.querySelector('.lodge__price').textContent = hotel.offer.price + ' ₽/ночь';

  switch (hotel.offer.type) {
    case 'flat':
      lodgeType = 'Квартира';
      break;
    case 'bungalo':
      lodgeType = 'Бунгало';
      break;
    case 'house':
      lodgeType = 'Дом';
      break;
  }

  element.querySelector('.lodge__type').textContent = lodgeType;

  element.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + hotel.offer.guests + ' гостей в ' + hotel.offer.rooms + ' комнатах';
  element.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
  element.querySelector('.lodge__description').textContent = hotel.offer.description;

  for (var j = 0; j < hotel.offer.features.length; j++) {
    featureImages = document.createElement('span');
    featureImages.classList.add('feature__image');
    collectionFeatures.push('feature__image--' + hotel.offer.features[j]);
    element.querySelector('.lodge__features').appendChild(featureImages);
  }

  console.log(featureImages);

  for (var l = 0; l < collectionFeatures.length; l++) {
    featureImages.classList.add(collectionFeatures[l]);
  }

  document.querySelector('.dialog__title img').src = hotel.author.avatar;

  return element;
}

function showDialog(hotels) {
  var dialogPanels = document.querySelectorAll('.dialog__panel');

  document.querySelector('#offer-dialog').removeChild(dialogPanels[0]);
  document.querySelector('#offer-dialog').appendChild(createHotelDialog(hotels));
}

function showHotels(num) {
  for (var d = 0; d < num; d++) {
    fragment.appendChild(createPinMapElement(allHotels[d]));
  }
}

for (var k = 0; k < QUANTITY_HOTELS; k++) {
  allHotels.push(getHotel());
}

showHotels(QUANTITY_HOTELS);
showDialog(allHotels[random(QUANTITY_HOTELS)]);
containerPinMapHotels.appendChild(fragment);