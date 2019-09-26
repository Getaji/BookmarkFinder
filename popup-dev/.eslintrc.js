module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential'],
  plugins: ['vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ['warn', 'always-multiline'],
    semi: ['warn', 'never', {beforeStatementContinuationChars: 'never'}],
    'semi-spacing': ['warn', {after: true, before: false}],
    'semi-style': ['warn', 'first'],
    'no-extra-semi': 'warn',
    'no-unexpected-multiline': 'warn',
    'no-unreachable': 'warn',
    'quotes': ['warn', 'single'],
    'object-curly-spacing': ['warn', 'never'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
