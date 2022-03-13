module.exports = {
    webPackDevMiddleware: config => {
        config.watchOptions.poll = 300;
        return config;
    }
};