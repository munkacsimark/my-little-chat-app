const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      flex-grow: 1;
      background-color: var(--color-white);
      padding: 16px;
      overflow: scroll;
    }
  </style>
  <slot />
`;

class ChatWindow extends HTMLElement {

  #shadowRoot;

  constructor() {
    super();
    this.#shadowRoot = this.attachShadow({mode: 'open'});
    this.#shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('chat-window', ChatWindow);

export {
  ChatWindow,
}
