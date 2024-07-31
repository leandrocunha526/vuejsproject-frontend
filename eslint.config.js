import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
    {
        files: ["**/*.{js,mjs,cjs,vue}"],
        rules: {
            "no-unused-vars": "error",
            "no-undef": "error",
        },
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...pluginVue.configs["flat/essential"],
];
