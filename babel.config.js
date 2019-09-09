module.exports = function (api) {
    api.cache(true);

    const presets = [
        ["@babel/env"],
        "@vue/babel-preset-jsx"
    ];
    const plugins = [
        "@babel/transform-runtime",
        "@babel/syntax-dynamic-import",
        ["component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "~_intermediate/element-ui-theme"
            }
        ]
    ];

    return {
        presets,
        plugins
    };
}
