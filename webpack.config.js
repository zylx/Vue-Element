const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    // 开发模式，webpack会根据该模式使用相应的编译配置
    mode: 'development',
    // 打包入口
    entry: ['./src/main.js', './src/index.html'],
    // 打包后资源输出路径
    output: {
        filename: 'bundle.[hash:8].js',
        path: resolve(__dirname, 'build'),
        publicPath: '/dev/'
    },
    // 依赖模块，通过设置对应loader去执行一些webpack理解不了的语法资源
    // 如jsx转化为js，less转化为css等，相当于翻译官
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            // {
                            //     //按需加载
                            //     useBuiltIns: 'usage',
                            //     //指定core-js版本
                            //     corejs: {
                            //         version: 3
                            //     },
                            //     //指定到最低浏览器版本的兼容性
                            //     targets: {
                            //         chrome: '60',
                            //         firefox: '60',
                            //         ie: '9',
                            //         safari: '10',
                            //         edge: '17'
                            //     }
                            // }
                        ],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', {
                                'legacy': true
                            }], //将es6+中更高级的特性转化---装饰器
                            ['@babel/plugin-proposal-class-properties', {
                                'loose': true
                            }], //将es6中更高级的API进行转化---类
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                }]
            },
            {
                test: /\.css/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    //必须设置支持的浏览器才会自动添加添加浏览器兼容
                                    overrideBrowserslist: [
                                        "last 2 versions",
                                        "> 1%"
                                    ]
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    //必须设置支持的浏览器才会自动添加添加浏览器兼容
                                    overrideBrowserslist: [
                                        "last 2 versions",
                                        "> 1%"
                                    ]
                                })
                            ]
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(jpg|jepg|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 当图片大于8k时，交给file-loader处理，否则url-loader会把图片src转成base64编码
                        limit: 1024 * 8,
                        name: '[name].[hash:10].[ext]',
                        outputPath: 'images',
                        esModule: false // 新版file-loader使用了ES Module模块化方式，将esModule配置为false就可以解决html页面中图片解析地址不正确问题
                    }
                }]
            },
            {
                //字体解析
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(html|htm)$/,
                use: [{
                    loader: 'html-withimg-loader',
                    options: {
                        outputPath: 'images'
                    }
                }]
            },
            {
                test: /\.vue$/,
                use: [{
                        loader: 'cache-loader' // 缓存loader编译的结果
                    },
                    {
                        loader: 'thread-loader' // 作用使用 worker 池来运行loader，每个 worker 都是一个 node.js 进程
                    },
                    {
                        loader: 'vue-loader', // 解析.vue文件
                        options: {
                            compilerOptions: { // 编译模板
                                preserveWhitespace: false
                            }
                        }
                    }
                ]
            }
        ]
    },
    // 依赖插件，处理一些打包压缩、资源优化等任务，比loader功能更强大
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, './src/index.html')
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin()
    ],
    devServer: {
        port: 8000,
        contentBase: resolve(__dirname, 'build'),
        overlay: {
            errors: true
        },
        // historyApiFallback: true,
        historyApiFallback: {
            index: resolve(__dirname, '/index.html')
        },
        hot: true, //开启热点
        open: false, //自动打开浏览器
        progress: true, //显示打包的进度
        quiet: false, //控制台中不输出打包的信息
        noInfo: false,
        inline: true, //开启页面自动刷新
        lazy: false, //不启动懒加载
        watchOptions: {
            aggregateTimeout: 300
        },
        //配置解决跨域问题
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:80/youbeng',
                pathRewrite: {
                    '^/api': '' //路径重写
                },
                changeOrigin: true, // target是域名的话，需要这个参数，
                secure: false, //不检查安全问题
            }
        }
    },
    devtool: 'source-map'
}