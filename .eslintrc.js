module.exports = {
    env: {
      browser: true,
      es2021: true,
      jest: true, // תמיכה ב-Jest
    },
    plugins: ['react', 'jest'], // הוסף את התוסף של Jest
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:jest/recommended', // הרחבה מומלצת ל-Jest
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // React 17+ לא דורש import
      'no-unused-vars': 'warn', // התראה על משתנים שלא בשימוש
    },
  };
  