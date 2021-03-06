## TypeScript React app boilerplate

### Features
- Webpack 4
    - Chunk splitting
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
yarn b --env.urlloaderlimit 4096 --env.baseurl myapp --env.analyze
```
|Argument|Default|Description|
|-|-|-|
|port|27000|Webpack dev server port|
|urlloaderlimit|65536|Url loader file size limit|
|baseurl||Base url aka public url|
|analyze||Run webpack-bundle-analyzer|
