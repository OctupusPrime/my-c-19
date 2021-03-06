var Vue = require('vue');

new Vue({
    el: '#app',
    router: require('./app.router'),
    store:  require('./app.store'),
    resize: require('./app.resize'),
    render: function (init) {
        return init(require('../../vue/index.vue'));
    }
});