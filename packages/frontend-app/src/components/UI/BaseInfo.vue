<template>
    <div class="container">
        <div>
            <div class="container">
                <h4 v-if="title">{{ title }}</h4>
            </div>
            <p>
                <slot></slot>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title']
    }
</script>

<style scoped>
.container {
    display: flex;
    margin: 1rem 0;
    padding: 0;
}

h4 {
    border: 2px solid #1f9d3b;
    border-top: 0;
    border-radius: 0.5rem;
    border-right: 0;
    text-align: center;
    padding: 0.4rem;
    margin: 0;
}

p {
    margin: 0;
    padding: 0;
    padding-left: 1rem;
}

</style>