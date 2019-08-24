const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;
      box-sizing: border-box;
      border-top: 2px solid var(--color-full-black);
      padding: 8px 16px;
      background-color: var(--color-gray);
    }
    chat-input {
      flex-grow: 1;
      margin: 8px 8px 8px 0;
    }
  </style>
  <chat-input placeholder="Say hi! 🤗"></chat-input>
  <chat-button type="submit">Send</chat-button>
`;

class ChatFooter extends HTMLElement {

  #shadowRoot;

  constructor() {
    super();
    this.#shadowRoot = this.attachShadow({mode: 'open'});
    this.#shadowRoot.appendChild(template.content.cloneNode(true));

    this.listenToMessageSend()
  }

  listenToMessageSend() {
    const input = this.#shadowRoot.querySelector('chat-input');
    input.addEventListener('inputEnter', event => this.handleMessageSend(input));
    this.#shadowRoot.querySelector('chat-button')
      .addEventListener('click', event => this.handleMessageSend(input));
  }

  handleMessageSend(input) {
    const value = input.getAttribute('data-value').trim().replace(/ +(?= )/g,'');
    if (!value) return;
    this.dispatchEvent(new CustomEvent('sendMessage', { detail: value }));
    input.setAttribute('data-value', '');
  }
}

customElements.define('chat-footer', ChatFooter);

export {
  ChatFooter,
}
