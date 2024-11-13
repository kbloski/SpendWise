<template>
    <div class="base-card">
        <slot></slot>
    </div>
</template>

<style scoped>

.base-card {
    background-color: var(--background-color-light);
    box-shadow: 0 0 8px white;
    width: 100%;
    height: auto;
    margin: 2rem 0 0 0;
    padding: 0 2rem ;
    border-radius: 1rem  0 0 0;
    color: black;
}

@media screen and (max-width: 800px){
    .base-card {
        border-radius: 0;
        margin-top: 0;
        min-height: 90vh;
    }
}

</style>

