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
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.appendChild(template.content.cloneNode(true));
    this.listenToMessageSend();
  }

  listenToMessageSend() {
    const input = this.shadow.querySelector('chat-input');
    const button = this.shadow.querySelector('chat-button');
    input.addEventListener('inputEnter', _ => this.handleMessageSend(input));
    button.addEventListener('click', _ => this.handleMessageSend(input));
  }

  handleMessageSend(input) {
    const realInput = input.shadow.querySelector('input')
    if (!realInput.value) return;
    this.dispatchEvent(new CustomEvent('sendMessage', { detail: realInput.value }));
    realInput.value = '';
  }
}

customElements.define('chat-footer', ChatFooter);

export {
  ChatFooter,
}
