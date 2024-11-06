<template>
    <div class="title-container">
        <div class="title">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.title-container {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.title {
    border-radius: 1rem;
    background-color: white;
    box-shadow: inset 0 0 10px black;
    color: rgb(59, 59, 59);
    font-weight: bold;
    margin: 1rem;
    padding: 1rem 2rem;
    text-align: center;
    text-transform: uppercase;
    text-shadow: 0 0 5px gray;
    font-size: 32px;
}
</style>