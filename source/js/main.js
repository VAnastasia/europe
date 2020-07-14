const validateEmail = (email) => {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(email) === false) {
    return false;
  }
  return true;
};

const validatePhone = (phone) => {
  const reg = /^\d{10}$/;
  if (reg.test(phone) === false) {
    return false;
  }
  return true;
};

const menu = () => {
  const pageHeader = document.querySelector(`.page-header__wrapper`);
  const mainNav = document.querySelector(`.main-nav`);
  const openNavButton = mainNav.querySelector(`.main-nav__open`);
  const closeNavButton = mainNav.querySelector(`.main-nav__close`);
  const mainNavLinks = mainNav.querySelectorAll(`.main-nav__link`);

  pageHeader.classList.remove(`page-header__wrapper--no-js`);
  mainNav.classList.remove(`main-nav--no-js`);
  openNavButton.addEventListener(`click`, () => {
    mainNav.classList.add(`main-nav--open`);
  });

  closeNavButton.addEventListener(`click`, () => {
    mainNav.classList.remove(`main-nav--open`);
  });

  mainNavLinks.forEach((link) => {
    link.addEventListener(`click`, () => {
      mainNav.classList.remove(`main-nav--open`);
    });
  });
};

const modalHandlers = () => {
  const priceBuyButtons = document.querySelectorAll(`.prices__buy`);
  const tabBuyButtons = document.querySelectorAll(`.tabs__buy`);
  const modal = document.querySelector(`.modal--closed`);
  const modalForm = modal.querySelector(`.modal__form`);
  const modalOverlay = document.querySelector(`.modal__overlay`);
  const modalCloseButton = modal.querySelector(`.modal__close`);
  const modalMessage = document.querySelector(`.modal--message`);
  const modalMessageClose = modalMessage.querySelector(`.modal__close`);
  const inputPhone = modal.querySelector(`.modal__input--phone`);
  const inputEmail = modal.querySelector(`.modal__input--email`);

  if (localStorage.getItem(`phone`)) {
    inputPhone.value = localStorage.getItem(`phone`);
  }

  if (localStorage.getItem(`email`)) {
    inputEmail.value = localStorage.getItem(`email`);
  }

  const checkEmail = () => {
    const email = inputEmail.value;
    localStorage.setItem(`email`, email);

    if (validateEmail(email) === false) {
      inputEmail.parentNode.classList.add(`modal__error`);
      return false;
    } else {
      inputEmail.parentNode.classList.remove(`modal__error`);
      return true;
    }
  };

  const checkPhone = () => {
    const phone = inputPhone.value;
    localStorage.setItem(`phone`, phone);

    if (validatePhone(phone) === false) {
      inputPhone.parentNode.classList.add(`modal__error`);
      return false;
    } else {
      inputPhone.parentNode.classList.remove(`modal__error`);
      return true;
    }
  };

  const onEscDown = (evt) => {
    if (evt.code === `Escape` || evt.keyCode === 27) {
      closeModal();
      closeModalMessage();
    }
  };

  const closeModal = () => {
    modal.classList.add(`modal--closed`);
    modalOverlay.style.display = `none`;
    modalOverlay.removeEventListener(`click`, closeModal);
    document.removeEventListener(`keydown`, onEscDown);
  };

  const openModal = (evt) => {
    evt.preventDefault();
    modal.classList.remove(`modal--closed`);
    modalOverlay.style.display = `block`;
    modalOverlay.addEventListener(`click`, closeModal);
    document.addEventListener(`keydown`, onEscDown);
    inputPhone.focus();
  };

  const closeModalMessage = () => {
    modalMessage.style.display = `none`;
    modalOverlay.style.display = `none`;
    modalOverlay.removeEventListener(`click`, closeModalMessage);
    document.removeEventListener(`keydown`, onEscDown);
  };

  const openModalMessage = () => {
    modalMessage.style.display = `block`;
    modalOverlay.style.display = `block`;
    modalOverlay.addEventListener(`click`, closeModalMessage);
    document.addEventListener(`keydown`, onEscDown);
  };

  priceBuyButtons.forEach((button) => {
    button.addEventListener(`click`, openModal);
  });

  tabBuyButtons.forEach((button) => {
    button.addEventListener(`click`, openModal);
  });

  modalCloseButton.addEventListener(`click`, closeModal);
  modalMessageClose.addEventListener(`click`, closeModalMessage);

  inputPhone.addEventListener(`input`, checkPhone);
  inputEmail.addEventListener(`input`, checkEmail);

  modalForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    const isValidPhone = checkPhone();
    const isValidEmail = checkEmail();

    if (isValidEmail && isValidPhone) {
      closeModal();
      openModalMessage();
    }
  });
};

const formHandlers = () => {
  const modalMessage = document.querySelector(`.modal--message`);
  const modalOverlay = document.querySelector(`.modal__overlay`);

  const form = document.querySelector(`.feedback__form`);
  const inputPhone = form.querySelector(`.feedback__input--phone`);
  const inputEmail = form.querySelector(`.feedback__input--email`);

  if (localStorage.getItem(`phone`)) {
    inputPhone.value = localStorage.getItem(`phone`);
  }

  if (localStorage.getItem(`email`)) {
    inputEmail.value = localStorage.getItem(`email`);
  }

  const checkEmail = () => {
    const email = inputEmail.value;
    localStorage.setItem(`email`, email);

    if (validateEmail(email) === false) {
      inputEmail.parentNode.classList.add(`feedback__error`);
      return false;
    } else {
      inputEmail.parentNode.classList.remove(`feedback__error`);
      return true;
    }
  };

  const checkPhone = () => {
    const phone = inputPhone.value;
    localStorage.setItem(`phone`, phone);

    if (validatePhone(phone) === false) {
      inputPhone.parentNode.classList.add(`feedback__error`);
      return false;
    } else {
      inputPhone.parentNode.classList.remove(`feedback__error`);
      return true;
    }
  };

  const onEscDown = (evt) => {
    if (evt.code === `Escape` || evt.keyCode === 27) {
      closeModalMessage();
    }
  };

  const openModalMessage = () => {
    modalMessage.style.display = `block`;
    modalOverlay.style.display = `block`;
    modalOverlay.addEventListener(`click`, closeModalMessage);
    document.addEventListener(`keydown`, onEscDown);
  };

  const closeModalMessage = () => {
    modalMessage.style.display = `none`;
    modalOverlay.style.display = `none`;
    modalOverlay.removeEventListener(`click`, closeModalMessage);
    document.removeEventListener(`keydown`, onEscDown);
  };

  inputPhone.addEventListener(`input`, checkPhone);
  inputEmail.addEventListener(`input`, checkEmail);

  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    const isValidPhone = checkPhone();
    const isValidEmail = checkEmail();

    if (isValidEmail && isValidPhone) {
      openModalMessage();
    }
  });
};

menu();
modalHandlers();
formHandlers();
