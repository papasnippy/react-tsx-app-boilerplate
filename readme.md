## React app boilerplate

TypeScript + React app boilerplate with bleeding edge dependencies.

### Features
- Webpack 4
    - Chunk split
    - Tree shaking
    - Dynamic imports
    - Hot module replacement
- Babel 7
- TypeScript 3
- SCSS
    - CSS modules
- React.js
- Redux
    - Redux thunk
    - Dev tools
- Reselect
    - Dev tools
- Routing
    - react-router-dom
    - connected-react-router
- Jest
    - ts-jest

### Installation
```bash
git clone git@github.com:papasnippy/react-tsx-app-boilerplate.git my-app-name
cd my-app-name
yarn install
```

### Scripts
|Command|Alias|Description|
|-|-|-|
|`yarn start`|`yarn w`|Start webpack dev server|
|`yarn build`|`yarn b`|Build project (produciton by default)|
|`yarn build --mode development`|`yarn bd`|Build project in development mode|
|`yarn test`|`yarn t`|Run Jest|

### Env argumens
Example:
```bash
yarn bp --env.urlloaderlimit 4096 --env.baseurl myapp --env.analyze
```
|Argument|Default|Description|
|-|-|-|
|port|27000|Webpack dev server port|
|urlloaderlimit|65536|Url loader file size limit|
|baseurl||Base url aka public url|
|analyze||Run webpack-bundle-analyzer|
