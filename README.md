# Advent of Code — TypeScript

## Setup (une fois)

```shell
pnpm install
cp .env.example .env   # renseigner AOC_SESSION (cookie "session" du site) et AOC_USER_AGENT
```

## Boucle d'un jour

```shell
pnpm new 3        # input + src/2025/day3.ts + test/2025/day3.test.ts avec l'exemple partie 1
pnpm dev 3        # vitest en watch : exemples + réponse sur l'input réel à chaque sauvegarde
pnpm submit 3     # soumet la partie non résolue ; si la partie 1 est bonne, ajoute l'exemple partie 2
pnpm new 3 b      # (manuel) ajoute l'exemple partie 2 au test
```

- `pnpm new` attend l'heure de déblocage du puzzle si besoin (minuit heure de New York).
- `submit` refuse localement une réponse déjà refusée, hors bornes « too high / too low », pendant le délai imposé, ou si l'exemple échoue (`--force` pour passer outre).
- Une fois validée, la réponse devient un test de non-régression dans `pnpm dev` / `pnpm test`.
- Inputs et état des soumissions : `resources/<année>/`, ignorés par git. Autre année : `--year 2024` ou `AOC_YEAR`.

---

> 📢 NOTE: If your goal is to simply learn and play with TypeScript, which is what this repo was created to facilitate, **just use [Deno](https://deno.land/)** 🦕. Deno is a new JavaScript runtime that supports TypeScript out of the box, ships as a single executable, has built-in support for linting, formatting and testing, and offers even more!

# Minimal TypeScript project setup for curious minds

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository contains a simple setup for Node.js project with TypeScript. Feel free to take a look around the source code and step-by-step commit history, clone and fork the repo to try it out, and [open Issues](https://github.com/bobaekang/minimal-typescript-setup/issues) to share your suggestions for improvements.

Please refer to [this blog post](https://bobaekang.com/blog/minimal-typescript-project-setup-for-curious-minds/) for a detailed explanation.

## Project setup

```shell
git clone https://github.com/bobaekang/minimal-typescript-setup.git
cd minimal-typescript-setup

npm install
```

## Project structure

```
/
/dist   <- compiled JavaScript code goes here
/src    <- TypeScript source code lives here
/test   <- test files (**.test.ts) live     here
```

## Main dependencies

* [TypeScript](https://www.typescriptlang.org/)
* [`ts-node`](https://github.com/TypeStrong/ts-node) for development server
* [ESLint](https://eslint.org/) for linting
* [`typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint) for ESLint plugins to support TypeScript
* [Prettier](https://prettier.io/) for formatting source code
* [Mocha](https://mochajs.org/) for testing

## npm scripts

npm script | description
--- | ---
`build` | Compile TypeScript source code to JavaScript
`lint` | Typecheck, lint and format TypeScript source code
`serve` | Run TypeScript source code directly with `ts-node`
`start` | Run compiled JavaScript code
`test` | Run tests with Mocha

## License

[MIT](LICENSE)
