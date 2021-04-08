module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:vue/essential', 'standard', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2020,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        indent: 'off',
        'vue/no-multiple-template-root': 'off',
        '@typescript-eslint/indent': ['error', 2],
    },

}