// config/index.js
module.exports = {
    // ...
    dev: {
        // ...
        proxyTable: {
            '/api': {
                target: 'http://localhost:5001', // you should change this, depending on the port your server is running on
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        // ...
    }
}