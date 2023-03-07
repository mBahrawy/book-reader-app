module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    plugins: ["@typescript-eslint", "prettier"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
        "prettier"
    ],
    parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    rules: {
        // 0:no effect,  1:warning, 2:error
        semi: ["error", "always"],
        "no-trailing-spaces": 0,
        "@typescript-eslint/ban-types": 0,
        "prettier/prettier": 1,
        "no-console": 0,
        "prefer-const": 1,
        "max-len": [1, { code: 140, ignoreComments: true }],
        "@typescript-eslint/no-explicit-any": 1,
        "no-var": 2,
        "eslint-disable-next-line prettier/prettier": 0,
        "@typescript-eslint/no-empty-function": 0
    },
    settings: {
        react: {
            version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true
    }
};
