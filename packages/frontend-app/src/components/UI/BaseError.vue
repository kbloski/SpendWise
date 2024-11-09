<template>
    <div class="error-container">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: ['title']
    }
</script>

<style scoped>

.error-container {
    margin: 0;
    padding-left: .2rem 0;
    font-size: small;
    color: rgb(180, 0, 0);
    font-style: italic;
}

</style>