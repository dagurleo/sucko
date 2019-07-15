<h1 align="center">Welcome to Sucko 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-0.0.2-blue.svg?cacheSeconds=2592000" />
</p>

> Sucko is a tool to test your socket.io events

## Install

Using npm
```sh
npm install sucko
```

Using yarn
```sh
yarn add sucko
```

## Usage


```js
const Sucko = require('sucko');
const sucko = new Sucko({ port: 3000 }); //Port of your socket server.
sucko.listen(4444); //Choose a port to host the sucko application, default port is 4444
```

## Author

👤 **Dagur Leo**

* Github: [@dagurleo](https://github.com/dagurleo)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_