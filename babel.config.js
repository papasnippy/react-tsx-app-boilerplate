module.exports = {
    presets: [
        ["@babel/preset-env", {
            modules: false,
            targets: {
                "chrome": "72",
                "edge": "18",
                "firefox": "65",
                "safari": "12"
            }
        }]
    ],
    plugins: [
        "@babel/plugin-syntax-dynamic-import"
    ]
};
