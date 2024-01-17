# first-group-ui

first group ui-framework

## Setup and Build

Setup

```bash
# install dependencies
npm i
# or
npm install
```

Development

```bash
# serve with hot reload at localhost:8081
# default theme blue
npm run ui
# theme red
npm run ui:red
```

## Usage

```javascript
import Vue from 'vue'
// js
import FirstGroupUI from 'first-group-ui'

Vue.use(FirstGroupUI, {
  // ui theme
  theme: 'red',
  // project name, Prefix used to cache data KEY
  project: 'console',
  // Development environment variables, 
  // used to control console content output, etc.
  isDev: true
})
```

### Use in nuxt.js

nuxt.config.js

```javascript
{
  styleResources: {
    scss: [
      '~/plugins/first-group-ui/src/assets/scss/theme-red.scss',
      '~/plugins/first-group-ui/src/assets/scss/index.scss',
    ],
  },
}
```

