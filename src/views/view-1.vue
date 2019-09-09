<template>
    <div class="view-1">
        <h2>Demo 1：created生命周期添加data</h2>
        <p>
            {{dynamicData}}<br>
            <input v-model="dynamicData" />
        </p>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class MyComponent extends Vue {
        created() {
            (<any>Vue)['util'].defineReactive(this, 'dynamicData', 'demo1');
        }
    }
</script>
