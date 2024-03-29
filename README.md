# Componente para juegos de mesa

La idea es que este componente se pueda usar en varios tipos de juego de mesa.

## Uso del componente

- Para modificar la cantidad de items que van en las filas, hay que modificar en el archivo _GameBoard.css_ la propiedad `grid-template-areas`.
- Para instalar paquetes usar _yarn_, [acá](https://yarnpkg.com/lang/en/docs/migrating-from-npm/) hay una tabla que compara los comandos de yarn con los de npm.
- En el código puse varias indicaciones para quien tenga que sufrir mi componente.

## Configuración del proyecto

- Se agregó eslint y prettier
- El componente está dentro del Strict Mode de React para mostrar posibles errores o malas prácticas en la consola, [acá](https://reactjs.org/docs/strict-mode.html) más info.
- storybook para visualizar y maquetar los componentes (en el componente no se usa pero está configurado para agregarlo)
- Se usa _pretty-quick_ como un pre-commit hook junto a _husky_, estas dependencias formatean los archivos cuando se hace `git commit` y si hay un error según _eslint_, no deja hacer el commit y muestra el error.
- Se configuro la extensión _Debugger for Chrome_ para trabajar junto a `Create React App`

## Generalidades

### Emoticones

- [Acá](https://unicode.org/emoji/charts/full-emoji-list.html) se pueden encontrar los emoticones (en caso de que se quiera que esos sean los dibujos de cada ficha)
  - Para usarlo de forma zafable se copia y pega el emoticón en VsCode.
  - Para usarlo mejor [acá](https://medium.com/@seanmcp/%EF%B8%8F-how-to-use-emojis-in-react-d23bbf608bf7) hay más info.

### React

- Hooks
  - useState
  - useEffect
  - useRef

## TODO

- Sacar la lógica de los botones a un custom hook para que de esa manera el componente `GameBoard` no haga tantas cosas, en la carpeta components está el sitio donde se puede trabajar.
