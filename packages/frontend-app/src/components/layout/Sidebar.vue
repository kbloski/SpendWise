<template>
    <div class="container">
        <h1>{{ title }}</h1>
    </div>
</template>

<script>
import { appTitle } from '../../config/config.js'
export default {
    setup(props) {
        const title = appTitle;

        return {
            title
        }
    }
}
</script>

<style scoped>
.container {
    width: 20vw;
    height: 100vh;
    padding: 0rem 2rem;
    padding-top: 2rem;
}
</style>