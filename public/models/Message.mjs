class Message {
  #message;
  #user;

  constructor(message, user) {
    if (message === undefined || user === undefined)
      throw new ReferenceError('"message" or "user" field is missing.');
    this.#message = message;
    this.#user = user;
  }

  get message() {
    return this.#message;
  }

  get user() {
    return this.#user;
  }

  get json() {
    return {
      message: this.#message,
      user: this.#user,
    };
  }
}

export { Message };
