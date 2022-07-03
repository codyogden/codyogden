const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
    const config = {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'card.js',
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false,
                            },
                        },
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            hot: true,
        },
    };

    // Specific Changes for Development Mode
    if (argv.mode === 'development') {
        config.plugins.push(new HtmlWebpackPlugin({
            title: 'Calling Card',
            minify: true,
            cache: true,
            showErrors: true,
        }))
    }

    return config;
};
