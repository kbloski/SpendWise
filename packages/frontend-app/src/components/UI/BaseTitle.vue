<template>
    <div class="title-container">
        <div class="title">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>

.title {
    border-bottom: 2px solid black;
    font-weight: bold;
    padding-bottom: 2px;
}

</style>