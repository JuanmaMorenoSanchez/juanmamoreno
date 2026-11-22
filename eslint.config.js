// @ts-check
// Flat config (ESLint 10 removed support for the legacy .eslintrc format).
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    ignores: ['dist/**', 'out-tsc/**', 'coverage/**', 'cypress/**', 'projects/**'],
  },
  {
    files: ['**/*.ts'],
    extends: [...tseslint.configs.recommended, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      // The studio is used from inside a wallet app's own browser, because that
      // is where the wallet door is. A WebView only has the JS dialogs its host
      // app chose to implement, and where they are missing `confirm` returns
      // false at once — so five admin confirmations were answered no before he
      // could read them, and the presses did nothing and said nothing. Ask in
      // the page: `AskService.confirm`.
      'no-restricted-globals': [
        'error',
        {
          name: 'confirm',
          message: 'Use AskService.confirm — a wallet app’s browser has no confirm dialog.',
        },
        {
          name: 'alert',
          message: 'Say it in the page — a wallet app’s browser may have no alert dialog.',
        },
        {
          name: 'prompt',
          message: 'Ask in the page — a wallet app’s browser may have no prompt dialog.',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  }
);
