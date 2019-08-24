const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;
      border-bottom: 2px solid var(--color-full-black);
      padding: 8px 16px;
      background-color: var(--color-gray);
    }
    h3 {
      margin: 0;
    }
    chat-button {
      margin: 8px 0 8px 8px;
    }
  </style>
  <h3></h3>
  <chat-button>Change name</chat-button>
`;

class ChatHeader extends HTMLElement {

  #shadowRoot;

  constructor() {
    super();
    this.#shadowRoot = this.attachShadow({mode: 'open'});
    this.#shadowRoot.appendChild(template.content.cloneNode(true));

    this.setWelcomeMessage(this.getAttribute('user-name'));
    this.handleNameChange();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.setWelcomeMessage(newValue);
  }

  setWelcomeMessage(name) {
    this.#shadowRoot.querySelector('h3')
      .innerText = `Welcome ${name}! 👋`;
  }

  handleNameChange() {
    this.#shadowRoot.querySelector('chat-button').addEventListener('click', () => {
      const newName = (prompt(
        "Please enter your shiny new name ✨",
        this.getAttribute('user-name')
      ) || '').trim().replace(/ +(?= )/g,'');
      if (!newName || newName === 'server') return;
      this.dispatchEvent(new CustomEvent('changeName', { detail: newName }));
    });
  }

  static get observedAttributes() {
    return ['user-name'];
  }
}

customElements.define('chat-header', ChatHeader);

export {
  ChatHeader,
}
