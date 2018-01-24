# React App Boilerplate
This is the base template for react app project. It has out of box integration with
- [Redux](https://redux.js.org/)
- [React route](https://reacttraining.com/react-router/)
- [storybook](https://storybook.js.org/)

## Project Structure
```
.
├── README.md
├── config
│   ├── jest
│   ├── polyfills.js
│   ├── webpack.config.dev.js
│   └── webpack.config.prod.js
├── development.js
├── package.json
├── production.js
├── public
│   ├── images
│   └── index.html
├── src
│   ├── actions
│   ├── api
│   ├── components
│   ├── index.js
│   ├── reducers
│   ├── setupTests.js
│   ├── site.css
│   └── store.js
├── yarn.lock
└── storybook-server.js


```

- `development.js`  
Server in dev environment  
- `production.js`  
Server in production environment    
- `config/webpack.config.dev.js`  
Webpack development configuration  
- `config/webpack.config.prod.js`  
Webpack production configuration 


## Usage

> **First install all the dependencies for development**

```sh
yarn install && bower install
```

> **Launch application in development mode**

```sh
yarn run dev
```

> **Testing Application**

```sh
yarn run test
``` 


> **Build application**

```sh
yarn run build
```

> **Run application**
```sh
yarn run start
```

> **Extras**
- Best fix of `yarn.lock` merge conflict
    ```
    $ git checkout <previous commit> -- yarn.lock
    $ yarn run install
    ```
