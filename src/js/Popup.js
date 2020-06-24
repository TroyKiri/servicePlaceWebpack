import {formEditProfile} from '../index.js';

export class Popup {
    constructor(container, form, name, job, imgPopup) {
      this.container = container;
      this.form = form;
      this.name = name;
      this.job = job;
      this.imgPopup = imgPopup;
    }
    open(event) {
      if (this.container.id === 'popup-new-place') {

        this.container.classList.add('popup_is-opened');
        this.container.querySelector('.popup__close').addEventListener('click', this.close);
        this.form.elements.submit.disabled = true;
        this.form.elements.submit.classList.remove('popup__button_active');

      } else if (this.container.id === 'popup-edit-profile'){
        this.form.deleteErrors();

        this.container.classList.add('popup_is-opened');
        this.container.querySelector('.popup__close').addEventListener('click', this.close);
          // Можно лучше: Использование глобальных переменных считается плохой практикой,
          // так как снижает переиспользуемость класса и нарушает одну из основ ООП (инкапсуляция).
        const name = formEditProfile.elements.name;
        const info = formEditProfile.elements.info;

        name.value = this.name.textContent;
        info.value = this.job.textContent;

      } else if (this.container.id === 'image-popup') {
          if (event.target.closest('.place-card__delete-icon')) {
              return;
          }
          if (event.target.closest('.place-card__image')) {
            this.imgPopup.classList.add('popup_is-opened');
            const popupImg = document.querySelector('.popup__img');
            // Можно лучше: Переменная cardLink не переприсваивается, поэтому здесь нужно const.
            let cardLink = event.target.style.backgroundImage;
            // Можно лучше: В переменной slicedCardLink нет смысла, так как можн осразу присвоить значение в popupImg.src.
            let slicedCardLink = cardLink.slice(5, cardLink.length - 2);
            popupImg.src = slicedCardLink;
          }

        this.container.querySelector('.popup__close').addEventListener('click', this.close);
      }
    }
    close(event) {
      const popup = event.target.closest(".popup");
      popup.classList.remove('popup_is-opened');
    }
    closeFormAfterApi(container){
      return container.classList.remove('popup_is-opened');
    }
  }
