module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  plugins: [
    'react',
    'fp-ts'
  ],
  rules: {
    'fp-ts/no-discarded-pure-expression': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
