<template>
    <div class="base-title">
        <div class="title">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>

.base-title {
    margin: 0;
    padding: 0;
    padding-top: 1rem;
}

.title {
    border-bottom: 2px solid black;
    font-weight: bold;
    padding-bottom: 2px;
}

</style>
