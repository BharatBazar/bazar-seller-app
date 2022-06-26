module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        'react-native-reanimated/plugin',
        [
            'module-resolver',
            {
                root: ['./src'],
                alias: {
                    '^@app/(.+)': './src/\\1',
                },
            },
        ],
    ],
};
