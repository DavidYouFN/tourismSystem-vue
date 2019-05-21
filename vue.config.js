const path = require('path');

function resolve(dir) {
    return path.resolve(__dirname,dir);
} 

module.exports = {
    configureWebpack: {
        resolve: {
            extensions: ['.html','.css','.js','.vue','.less'],
            alias: {
                '@': resolve('src'),
                src: resolve('src'),
                components: resolve('src/components'),
                img: resolve('src/assets/img')
            }
        }
    },
    devServer: {
        host: "localhost",
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: false,
        proxy: 'http://localhost:8081/' // 配置跨域处理,只有一个代理
      },
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [
                //这个是加上自己的路径，
                //注意：试过不能使用别名路径
                path.resolve(__dirname, "./src/assets/less/main.less")
            ]
        }
    }
}