
<template>
    <div class="app">
        <div class="menu">
            <div v-for="i in demoCount"
                 :class="['menu-item',{'active':i === activeIndex}]"
                 :key="i"
                 @click="activeIndex = i">
                Demo-{{i}}
            </div>
        </div>
        <div class="views">
            <component :is="`view-${activeIndex}`" />
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Watch } from "vue-property-decorator";

    const demoCount = 5;

    const components = Object.fromEntries(
        Array(demoCount).fill(null).map(
            (v, i) => [`view-${i + 1}`, require(`./views/view-${i + 1}.vue`).default]
        )
    );

    @Component({
        components
    })
    export default class App extends Vue {
        demoCount = demoCount;
        activeIndex = 1;
    }

</script>
<style lang="scss" scoped>
    .app {
        display: flex;
        .menu {
            width: 220px;
            height: 100vh;
            padding: 24px 0;
            border-right: 1px solid #ccc;
            .menu-item {
                line-height: 36px;
                text-align: center;
                cursor: pointer;

                &:hover {
                    background: rgba(#0366d6, 0.1);
                }

                &.active {
                    background: rgba(#0366d6, 0.3);
                }
            }
        }
        .views {
            width: calc(100% - 220px);
            padding: 0 24px;
        }
    }
</style>
