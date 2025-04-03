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

## Migration Guide

This repository contains a migration of the original Zola-based documentation to Starlight. The migration is ongoing, with the following progress:

- [x] Basic project setup
- [x] Home page
- [x] Getting Started section
  - [x] Introduction
  - [x] Installation
- [ ] Scripting section (partial)
- [ ] Project section (not started)
- [ ] C++ Bindings section (not started)

### How to Continue the Migration

1. **Identify content to migrate**: Look at the `legacy-docs/content` directory to find content that still needs to be migrated
2. **Create new Markdown files**: For each section in the legacy docs, create equivalent Markdown files in the `src/content/docs` directory
3. **Convert content format**:
   - Update frontmatter to use Starlight's format
   - Convert code blocks from custom format to standard Markdown
   - Use `typescript` for code highlighting (since Angelscript isn't supported natively)
   - Update internal links to use the new URL structure
4. **Copy images**: If you need additional images, copy them from `legacy-docs/static/img` to `public/img`
5. **Test the site**: After each migration, run `npm run dev` to check your changes

### Content Organization

The content is organized into the following sections:

- `/getting-started/` - Basic introduction and setup guides
- `/scripting/` - Detailed documentation on the scripting language
- `/project/` - Project setup and organization
- `/cpp-bindings/` - Working with C++ bindings

### Code Block Conversion

When migrating code blocks, convert them from the custom HTML format to standard Markdown:

From:

```html
<div class="code_block" style="...">
  <!-- complex HTML structure -->
</div>
```

To:

````
```typescript
class ATestActor : AActor
{
    // Your code here
}
````

## License

See the LICENSE file for details.

```

npm create astro@latest -- --template starlight

```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/starlight/tree/main/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/starlight/tree/main/examples/basics)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/withastro/starlight&create_from_path=examples/basics)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwithastro%2Fstarlight%2Ftree%2Fmain%2Fexamples%2Fbasics&project-name=my-starlight-docs&repository-name=my-starlight-docs)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

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
