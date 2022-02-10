# ChatApp

Simple chat app with [socket.io](https://socket.io/) and native [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) without any framework, library or bundling. It's working only in new Chromes, it was tested in **Chrome v76**. (Firefox can't handle [class field declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Field_declarations) at this time.)

## How to play with it

Clone the repo and install npm dependencies. You will need two terminal instances for two servers. Each of them provides basic logging, so you can see what's happening.

## Server

It's only for development purposes, it can handle only the `message` event. It's running on `http://127.0.0.1:3001`.

```bash
$ npm run server
```

## Client

It's a very simple http server only for serving static files of the client. It's running on `http://127.0.0.1:3000`.

```bash
$ npm run client
```

## Usage

The app is fully responsive horizontally and vertically too, it has simple design. It has 3 main sections. A header a footer and a section which contains messages. In the header section the app greets you with the default name `guest`. You can change your nickname here as well by clicking the button. In the message container displays server messages, with black background and other users messages with gray on the left side. Your messages will be on right side with blue background. The section can scroll itself down when new messages arriving. The footer section contains the input and the send button which are for message sending.
