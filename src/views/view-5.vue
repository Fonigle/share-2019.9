<template>
    <div class="view-5">
        <h2>Demo 5：生命周期添加methods </h2>
        {{dynamicMethod('template')}}
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class MyView3 extends Vue {
        output = 'dynamic method';

        created() {
            Object.defineProperty(this, 'dynamicMethod', {
                value: (section: string) => {
                    console.log(`call from ${section}`);
                    return `this is ${this.output}`;
                }
            })
        }

        mounted() {
            console.log(
                (<any>this).dynamicMethod('mounted')
            )
        }
    }
</script>
