# is-my-file-ready

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Small utility to check if a file is ready to be worked with.

## Installation

`$ npm i is-my-file-ready`

## Usage

```js
const result = await isMyFileReady('./myfile.txt', [
  sameSize(expectedSize),
  endsWithStr(expectedEnds),
]);
if (!result.isReady) {
  result.checks
    .filter((check) => !check.isReady)
    .forEach((check) => {
      let toPrint = '';
      toPrint += `${check.name} failed. `;
      switch (check.name) {
        case 'sameSize':
          toPrint += `Expected "${expectedSize}", got "${check.size}."`;
          break;
        case 'endsWithStr':
          toPrint += `Expected "${expectedEnds}", got "${check.endsWith}."`;
          break;
      }
      console.log(toPrint);
    });
} else {
  console.log('File is ready !');
}
```

## Documentation
See [https://zakodium.github.io/is-my-file-ready](https://zakodium.github.io/is-my-file-ready)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/is-my-file-ready.svg
[npm-url]: https://www.npmjs.com/package/is-my-file-ready
[ci-image]: https://github.com/zakodium/is-my-file-ready/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/zakodium/is-my-file-ready/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/zakodium/is-my-file-ready.svg
[codecov-url]: https://codecov.io/gh/zakodium/is-my-file-ready
[download-image]: https://img.shields.io/npm/dm/is-my-file-ready.svg
[download-url]: https://www.npmjs.com/package/is-my-file-ready
