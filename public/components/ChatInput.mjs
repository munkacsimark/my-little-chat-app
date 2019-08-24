const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      box-sizing: border-box;
    }
    input {
      box-sizing: border-box;
      border: none;
      border-radius: 3px;
      font-size: 1rem;
      background-color: var(--color-white);
      padding: 8px 12px;
      width: 100%;
    }
  </style>
  <input type="text" placeholder="Your message" autocomplete="off" />
`;

class ChatInput extends HTMLElement {

  #shadowRoot;

  constructor() {
    super();
    this.#shadowRoot = this.attachShadow({mode: 'open'});
    this.#shadowRoot.appendChild(template.content.cloneNode(true));

    this.setPlaceholder();
    this.handleSubmit();
  }

  setPlaceholder() {
    if (this.getAttribute('placeholder'))
      this.#shadowRoot.querySelector('input').placeholder = this.getAttribute('placeholder');
  }

  handleSubmit() {
    this.#shadowRoot.querySelector('input').addEventListener('keyup', event => {
      if (event.code === 'Enter') {
        this.dispatchEvent(new CustomEvent('inputEnter'));
      } else {
        this.setAttribute('data-value', this.#shadowRoot.querySelector('input').value); 
      }
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.#shadowRoot.querySelector('input').value = newValue;
  }

  static get observedAttributes() {
    return ['data-value'];
  }
}

customElements.define('chat-input', ChatInput);

export {
  ChatInput,
}
