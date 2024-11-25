// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  plugins: ['react', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
    'react/display-name': 'off', // מתעלם מאזהרות על קומפוננטות שמקבלות props
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};