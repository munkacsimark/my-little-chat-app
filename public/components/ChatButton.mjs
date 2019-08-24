const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      box-sizing: border-box;
    }
    button {
      border: none;
      border-radius: 3px;
      font-size: 1rem;
      padding: 8px 12px;
      font-weight: bold;
      background-color: var(--color-light-gray);
      box-shadow: 0 3px 0 var(--color-black);
      cursor: pointer;
      transition: .3s;
    }
    button:hover {
      transform: translateY(2px);
      box-shadow: 0 1px 0 var(--color-black);
      transition: .2s;
    }
  </style>
  <button>
    <slot />
  </button>
`;

class ChatButton extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.appendChild(template.content.cloneNode(true));

    this.setType()
  }

  setType() {
    const type = this.getAttribute('type');
    if (type) this.shadow.querySelector('button').setAttribute('type', type);
  }
}

customElements.define('chat-button', ChatButton);

export {
  ChatButton,
}
