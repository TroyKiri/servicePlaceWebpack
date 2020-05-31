import "./style.css";

import {Api} from './js/Api';
import {DeleteValidateErrors} from './js/DeleteValidateErrors';
import {FormValidator} from './js/FormValidator';
import {UserInfo} from './js/UserInfo';
import {Popup} from './js/Popup';
import {Card} from './js/Card';
import {CardList} from './js/CardList';

const placesList = document.querySelector('.places-list');
const formPlace = document.querySelector('.popup__form_new-place');
const formEditProfile = document.querySelector('.popup__form_new-profile');
const formButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit-button');
const popupNewPlace = document.querySelector('#popup-new-place');
const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupImage = document.querySelector('#image-popup');
const formWithoutErrors = new DeleteValidateErrors (formEditProfile);
const imgPopup = document.querySelector('.imgpopup');

const myId = '99f8d69176a6954ff0720e32';
export {myId, placesList,formEditProfile};
const baseUrl ='https://praktikum.tk/cohort10';
const token = 'c642e499-651c-490f-aacf-b902daa3a0f2';

const apiMesto = new Api(baseUrl,token);

// Можно лучше: Инстанс класса всё равно создаётся каждый раз новый при вызове функции.
// Можно просто создать экземпляр и присвоить переменной:
// const placeContainer = new CardList(...);
const placeContainer = function(cards) {
  return (new CardList(placesList, cards))
}
//загрузка информации о пользователе с сервера
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const userInfoPhoto = document.querySelector('.user-info__photo');

apiMesto.getUserInfo(userInfoName, userInfoJob, userInfoPhoto);

//загрузка первоначальных карточек с сервера
function renderCards() {
  apiMesto.getCards()
  .then((res) => {
    return res.map(card => {
      return new Card(card.name, card.link, card.likes, card.owner._id, card._id, placesList, apiMesto)
    })
  })
  .then((cards) => {
    // Можно лучше: Создаётся новый экземпляр класса, который затем больше нигде не используется.
    return placeContainer(cards).render();
  })
  .catch((err) => {console.log(err);})
}
renderCards();

//Добавление новой карточки
function addNewCard(event) {
  event.preventDefault();
  const name = formPlace.elements.name;
  const link = formPlace.elements.link;

  apiMesto.sendCard(name,link)
    .then((card) => {
      newPlace.closeFormAfterApi(popupNewPlace);
      return new Card(card.name, card.link, card.likes, card.owner._id, card._id, placesList, apiMesto)
    })
    .then((card) => {
      // Можно лучше: Создаётся новый экземпляр класса, который затем больше нигде не используется.
      return placeContainer([]).addCard(card.create());
    })
    .then(() => {formPlace.reset()})
    .catch((err) => {console.log(err);})
}

//редактирование пользовательского профиля
function addNewProfile(event) {
  event.preventDefault();
  const formEdit = formEditProfile;
  const userInfo = new UserInfo(formEdit);

  userInfo.updateUserInfo(userInfoName, userInfoJob);

  //Отправка данных о пользователе на сервер
  apiMesto.editProfile(formEdit.elements.name, formEdit.elements.info)
    .then(() => {editProfile.closeFormAfterApi(popupEditProfile);})
    .then(()=>{formEditProfile.reset()})
    .catch((err) => {console.log(err)})
}

//Добавление карточки
formPlace.addEventListener('submit', addNewCard);
//Попапы
const newPlace = new Popup(popupNewPlace, formPlace);
formButton.addEventListener('click', newPlace.open.bind(newPlace));//открытие попапа с добавлением карточки
const editProfile = new Popup(popupEditProfile, formWithoutErrors, userInfoName, userInfoJob);
editButton.addEventListener('click', editProfile.open.bind(editProfile));//открытие попапа с редактированием профиля
const imagePopup = new Popup(popupImage,'','','', imgPopup);
placesList.addEventListener('click', imagePopup.open.bind(imagePopup));//открытие попапа с картинкой
//Профиль пользователя
formEditProfile.addEventListener('submit', addNewProfile);
//Валидация
new FormValidator(formEditProfile).setEventListeners();
new FormValidator(formPlace).setEventListeners();

// Резюме по работе:
// Спасибо за работу, верные исправления.
//
// Что понравилось:
// - класс Api теперь создаётся один раз и используется для всех вызовов;
// - url сервера и авторизационный токен передаются в конструкторе;
// - после успешного выполнения запроса на добавление новой карточки закрывается попап и сбрасывается форма;
// - весь список загружается только один раз в начале.
//
// Что можно улучшить:
// - отформатировать единообразно код;
// - не использовать в классах глобальные переменные;
// - один раз создавать экземпляр класса CardList и использовать его для манипуляций со списком.
//
// Успехов в дальнейшем обучении!
