# astro-sauce 🍕

CSS-in-JS runtime para Astro - escreva CSS dentro do JavaScript sem SSR.

## Instalação

```bash
npm install astro-sauce
```

## Uso

### `css`

Gera uma string de CSS a partir de template literals.

```ts
// styles/button.ts
import { css } from 'astro-sauce';

export const buttonStyles = css`
  background: blue;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background: darkblue;
  }
`;
```

### `styled`

Cria elementos HTML estilizados.

```ts
// components/Button.ts
import { styled } from 'astro-sauce';

export const Button = styled('button')`
  background: blue;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background: darkblue;
  }
`;
```

### `globalStyles`

Injeta estilos globais no documento usando template literal tagged.

```astro
---
// Layout.astro
import { globalStyles } from 'astro-sauce';
---

<html>
  <head>
    {globalStyles`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: system-ui, sans-serif;
      }
    `}
  </head>
  <body>
    <slot />
  </body>
</html>
```

Também pode ser usado passando um objeto com a propriedade `styles`:

```ts
globalStyles({ styles: `body { background: red; }` })
```

## API

### `css(strings, ...values): string`

Recebe um template literal Tagged e retorna uma string de CSS.

### `styled(tag)(strings, ...values): function`

Recebe uma tag HTML e retorna uma função que recebe um template literal.

### `globalStyles({ styles }): null`

Recebe um objeto com propriedade `styles` (string) e injeta no `<head>` do documento em runtime.

## Estrutura do Projeto

```
astro-sauce/
├── src/
│   └── index.ts      # Código fonte
├── dist/             # Build gerado
├── package.json
└── tsconfig.json
```

## License

MIT