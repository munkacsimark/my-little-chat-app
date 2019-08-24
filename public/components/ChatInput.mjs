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
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.appendChild(template.content.cloneNode(true));

    this.setPlaceholder();
    this.handleSubmit();
    this.shadow.querySelector('input').focus();
  }

  setPlaceholder() {
    if (this.getAttribute('placeholder'))
      this.shadow.querySelector('input').placeholder = this.getAttribute('placeholder');
  }

  handleSubmit() {
    this.shadow.querySelector('input').addEventListener('keyup', event => {
      if (event.code !== 'Enter') return;
      this.dispatchEvent(new CustomEvent('inputEnter'));
    })
  }
}

customElements.define('chat-input', ChatInput);

export {
  ChatInput,
}
