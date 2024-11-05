module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    requireConfigFile: false,
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-multi-spaces': ['error'], // disallow multiple spaces
    'vue/no-multiple-template-root': 'off', // allow multiple roots in a template (not needed in Vue 3)
    'no-unused-vars': 'off', // disable unused variable checks
    'no-use-before-define': 'off', // allow using variables before they're defined
    'prettier/prettier': ['error', { endOfLine: 'lf' }]
  }
}
