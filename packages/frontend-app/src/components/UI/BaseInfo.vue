<template>
    <div class="container-info">
        <div>
            <div class="container">
                <h4 class="info-title"v-if="title">{{ title }}</h4>
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
.container-info {
    display: flex;
    /* margin: 1rem 0; */
    padding: 1rem 0;
}

.info-title {
    border: 2px solid #888888;
    border-top: 0;
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