module.exports = {
  extends: ['next/core-web-vitals', 'eslint:recommended', 'prettier', 'plugin:jest/recommended'],
  globals: {
    JSX: true,
    Window: true
  },
  plugins: ['unicorn'],
  rules: {
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'prefer-const': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          // camelCase: true,
          // pascalCase: true,
          kebabCase: true
        }
      }
    ]
  }
};
