<template>
    <div class="container">
        <div>
            <p>
                <u>ERROR</u>: <slot></slot>
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

p {
    margin: 0;
    padding: 0;
    padding-left: 1rem;
    text-transform: uppercase;
    color: rgb(131, 0, 0);
    font-weight: bold;
    font-style: italic;
}

</style>