module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  plugins: ['vue'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'indent': ['warn', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'key-spacing': ['error', { beforeColon: false }],
    'max-len': ['warn', { code: 120, ignoreRegExpLiterals: true }],
    'no-prototype-builtins': 'off',
    'brace-style': 'error',
    'space-before-blocks': 2,
    'comma-spacing': ['error', { before: false, after: true }],
    'space-in-parens': ['error', 'never'],
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never',
    }],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always', { objectsInObjects: false }],
    'no-multi-spaces': ['error'],
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 1 },
      multiline: { max: 1 },
    }],
    'vue/multiline-html-element-content-newline': ['error', {
      'ignoreWhenEmpty': true,
      'ignores': ['pre', 'textarea'],
      'allowEmptyLines': false,
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
