<template>
    <div class="view-2">
        <h2>Demo 3：生命周期添加computed</h2>
        <p>
            a = <input v-model.number="a" />
        </p>
        <p>
            b = <input v-model.number="b" />
        </p>
        <p>
            {{a}} + {{b}} = {{computedVal}}
        </p>
        <p>
            {{computedVal}} + 1 = {{addOne}}
        </p>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch } from "vue-property-decorator";

    // @Component
    // export default class MyView3 extends Vue {
    //     a = '2';
    //     b = '3';

    //     get computedVal() {
    //         return parseInt(this.a) + parseInt(this.b);
    //     }

    //     get addOne() {
    //         return this.computedVal + 1;
    //     }
    // }

    @Component
    export default class MyView3 extends Vue {
        a = '2';
        b = '3'

        created() {
            Object.defineProperty(this, 'computedVal', {
                configurable: true,
                get() {
                    return parseInt(this.a) + parseInt(this.b);
                }
            });

            Object.defineProperty(this, 'addOne', {
                configurable: true,
                get() {
                    return this.computedVal + 1;
                }
            });
        }

        @Watch('computedVal')
        watchComputedVal(newVal: number) {
            console.log(newVal);
        }
    }
</script>
