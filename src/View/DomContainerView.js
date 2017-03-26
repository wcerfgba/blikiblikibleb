class DomContainerView {

  constructor(id) {
		this.id = id;
  }

  install() {
    this.container = document.createElement('div');
    this.container.id = this.id;
    document.body.appendChild(this.container);
  }

  setContent(content) {
    this.container.innerHTML = content;
  }

}

module.exports = DomContainerView;
