import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        /** 非活动状态 */
        _inactive: boolean;
        util: any
    }
}
