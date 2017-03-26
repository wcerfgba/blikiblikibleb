/* A view as a div in the document. */

class DomContainerView {

  constructor(id) {
    this.id = id;
  }

  /* Create the container DOM element and store. */
  install() {
    this.container = document.createElement('div');
    this.container.id = this.id;
    document.body.appendChild(this.container);
  }

  /* Set HTML inside container. */
  setContent(content) {
    this.container.innerHTML = content;
  }

}

module.exports = DomContainerView;
