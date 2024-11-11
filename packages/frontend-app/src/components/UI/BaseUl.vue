<template>
    <ul>
        <slot></slot>
    </ul>
</template>

<style scoped>
ul {
    background-color: white;
    box-shadow: inset 0 0 4px black;
    list-style: none;
    padding: 1rem;
    margin: 1rem 0;
    max-height: 150px;
    overflow-y: auto;
    direction: rtl;
}
</style>