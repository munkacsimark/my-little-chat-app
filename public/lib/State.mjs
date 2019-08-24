class State {

  #state;

  constructor(data) {
    this.#state = data;
  }

  setState = (key, value) =>
    this.#state[key] = value;

  get = key => this.#state[key];
}

export {
  State,
}
