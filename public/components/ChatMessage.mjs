const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      box-sizing: border-box;
    }
    .row {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      margin-bottom: 16px;
    }
    .row.own {
      justify-content: flex-end;
    }
    .row.server .message {
      background-color: var(--color-black);
      color: var(--color-light-gray);
      border: 1px solid var(--color-full-black);
    }
    .row.own .message {
      align-items: flex-end;
      background-color: var(--color-blue);
    }
    .row.own .user {
      display: none;
    }
    .message {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      border-radius: 3px;
      padding: 8px 12px;
      background-color: var(--color-light-gray);
      color: var(--color-black);
      border: 1px solid var(--color-gray);
    }
    .user {
      font-size: 0.8rem;
      margin-bottom: 4px;
    }
  </style>
  <div class="row">
    <div class="message">
      <span class="user"></span>
      <span class="text"></span>
    </div>
  </div>
`;

class ChatMessage extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.getData();
  }

  getData() {
    const messageElement = this.shadow.querySelector('.row');
    if (this.getAttribute('own-message')) messageElement.classList.add('own');
    if (this.getAttribute('server-message')) messageElement.classList.add('server');
    this.shadow.querySelector('.user').innerText = this.getAttribute('user');
    this.shadow.querySelector('.text').innerText = this.getAttribute('text');
  }
}

customElements.define('chat-message', ChatMessage);

export {
  ChatMessage,
}
