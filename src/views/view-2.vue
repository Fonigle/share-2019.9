<template>
    <div class="view-2">
        <h2>Demo 2：mounted生命周期添加data</h2>
        <p v-if="init">
            {{dynamicData}}<br />
            <input v-model="dynamicData" />
        </p>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class MyComponent extends Vue {
        init = false;

        mounted() {
            (<any>Vue)['util'].defineReactive(this, 'dynamicData', 'demo2');
            this.init = true;
        }
    }
</script>
