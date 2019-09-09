<template>
    <div class="view-2">
        <h2>Demo 4：生命周期添加computed (JS)</h2>
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
        <p v-if="init">
            {{computedVal}} + 2 = {{addTwo}}
        </p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                a: '2',
                b: '3',
                init: false
            }
        },
        created() {
            Object.defineProperty(this, 'computedVal', {
                get() {
                    return parseInt(this.a) + parseInt(this.b);
                }
            });

            Object.defineProperty(this, 'addOne', {
                get() {
                    return this.computedVal + 1;
                }
            })
        },
        mounted() {
            Object.defineProperty(this, 'addTwo', {
                get() {
                    return this.computedVal + 2;
                }
            });

            this.init = true;
        }

    }
</script>
