import js from '@eslint/js';

export default [
  js.configs.recommended,

  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'no-extra-semi': 'error',
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { 'max': 2 }],
    },
  },
  {
    ignores: [
      'node_modules/',           // unignore `node_modules/` directory
      'dist/',
    ],
  },
];