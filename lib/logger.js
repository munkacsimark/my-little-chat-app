class Logger {

  static get color() {
    return Object.freeze({
      RED: '\x1b[31m',
      GREEN: '\x1b[32m',
    });
  }

  static log(message, color) {
    console.log(color
      ? `${color}${message}\x1b[0m`
      : message
    );
  }
}

module.exports = Logger;
