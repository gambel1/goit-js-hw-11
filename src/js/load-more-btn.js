export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    if (hidden === true) {
      this.hide();
      // hidden && this.hide()
    }
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.label = refs.button.querySelector('.label');
    return

    return refs;
  }

  enable() {
    this.refs.button.disable = false;
    this.refs.label.textContent = 'Показать еще';
  }

  disable() {
    this.refs.button.disable = true;
    this.refs.label.textContent = 'Загружаем';
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('in.hidden');
  }
}
