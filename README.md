# Unreal Engine Angelscript Documentation

This documentation site is built using [Starlight](https://starlight.astro.build/), a documentation theme for [Astro](https://astro.build/).

## Original Documentation

This documentation is a migration of the original Unreal Engine Angelscript documentation that can be found at:

- [Official Angelscript Documentation Website](https://angelscript.hazelight.se/)
- [Original Documentation Source Code](https://github.com/Hazelight/Docs-UnrealEngine-Angelscript)

The original documentation was built using Zola, while this version uses Starlight to provide an improved user experience with better search capabilities and more modern styling.

## Development

To run the site locally:

```bash
npm run dev
```

To build the site:

```bash
npm run build
```

## Content Organization

The content is organized into the following sections:

- `/getting-started/` - Basic introduction and setup guides
- `/scripting/` - Detailed documentation on the scripting language
- `/project/` - Project setup, organization, and community resources
- `/cpp-bindings/` - Working with C++ bindings

## License

See the LICENSE file for details.

```

npm create astro@latest -- --template starlight

```

## 🚀 Project Structure

Inside of your Astro + Starlight project, you'll see the following folders and files:

```
.
├── public/
├── src/
│ ├── assets/
│ │ ├── docs/
│ └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Starlight looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.

Static assets, like favicons, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [Starlight's docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).

```

```
