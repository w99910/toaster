# Vanilla Toaster

Toast messages globally anywhere inside your app with a single static method.

> AnimeJs is used for handling animation.

## Installation

Import via NPM.

```bash
npm install vanilla-toaster
```

Or import from CDN `https://cdn.jsdelivr.net/npm/vanilla-toaster@latest/dist/vanilla-toaster.es.js`.
```
import VanillaToaster from 
```

## Usage 

### Initialization

```js
import Toaster from 'vanilla-toaster';

const toaster = document.createElement('div');
document.body.appendChild(toaster);
new Toaster(toaster);
```

### Call anywhere

```js
import Toaster from 'vanilla-toaster';

Toaster.toast('Hello World!');
```

### Customizing

- Select toast type - `info`, `success`, `warning`, `error`.

```js
Toaster.toast('Hello World!', 'success');
```

- Provide Toast Duration in milliseconds. Default is `2000`. (2 seconds)

```js
Toaster.toast('Hello World!', 'success', 5000);
```