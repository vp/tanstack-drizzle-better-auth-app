//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  // These config files are plain JS, but TanStack's config enables
  // type-aware linting via `parserOptions.project`, which requires files
  // to be part of a TS Program (JS files need `allowJs` for that).
  { ignores: ['eslint.config.js', 'prettier.config.js'] },
  ...tanstackConfig,
]
