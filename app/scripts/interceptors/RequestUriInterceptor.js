function RequestUriInterceptor ($templateCache, requestUri) {

    return {
        request: function(config) {
            if(!$templateCache.get(config.url)) {
                config.url = requestUri + config.url;
            }
            return config;
        }
    }   
}
