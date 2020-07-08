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

menu();
