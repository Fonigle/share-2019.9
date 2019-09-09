import './styles/style-fix.scss';

import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

import App from './app.vue';
const vm = new Vue({
    el: '#app',
    render: h => h(App),
});
