import { Socket } from '../lib/Socket.mjs';
import { State } from '../lib/State.mjs';
import { Message } from '../models/Message.mjs';
import './ChatButton.mjs';
import './ChatInput.mjs';
import './ChatMessage.mjs';
import './ChatHeader.mjs';
import './ChatWindow.mjs';
import './ChatFooter.mjs';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90vw;
      max-width: 600px;
      height: 90vh;
    }
    .app-container {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      width: 100%;
      height: 100%;
      border: 2px solid var(--color-full-black);
      border-radius: 3px;
    }
  </style>
  <div class="app-container">
    <chat-header></chat-header>
    <chat-window></chat-window>
    <chat-footer></chat-footer>
  </div>
`;

class ChatApp extends HTMLElement {
  constructor() {
    super();

    this.socket = new Socket('http://127.0.0.1:3001');
    //this.socket = new Socket('http://185.13.90.140:8081/');

    this.state = new State({ userName: 'guest' });

    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.appendChild(template.content.cloneNode(true));
    this.socket.listenForMessages(this.handleReceivedMessages.bind(this));
  }

  connectedCallback() {
    const chatHeader = this.shadow.querySelector('chat-header');
    chatHeader.setAttribute('user-name', this.state.get('userName'));
    chatHeader.addEventListener('changeName', this.handleNameChange.bind(this));

    const chatFooter = this.shadow.querySelector('chat-footer');
    chatFooter.addEventListener('sendMessage', this.handleSendMessage.bind(this));
  }

  handleNameChange(event) {
    this.state.setState('userName', event.detail);
    this.shadow.querySelector('chat-header')
      .setAttribute('user-name', this.state.get('userName'));
  }

  handleSendMessage(event) {
    const message = new Message(event.detail, this.state.get('userName'));
    this.socket.sendMessage(message.json);
  }

  handleReceivedMessages(receivedMessage) {
    const message = new Message(receivedMessage.message, receivedMessage.user);
    const chatWindow = this.shadow.querySelector('chat-window');
    const chatElement = this.createChatElement(message);
    chatWindow.appendChild(chatElement);
    chatElement.scrollIntoView({behavior: "smooth", block: "end"});
  }

  createChatElement(message) {
    const element = document.createElement('chat-message');
    if (this.state.get('userName') === message.user)
      element.setAttribute('own-message', true);
    if (message.user === 'server')
      element.setAttribute('server-message', true);
    element.setAttribute('user', message.user);
    element.setAttribute('text', message.message);
    return element;
  }
}

customElements.define('chat-app', ChatApp);

export {
  ChatApp,
}
