<template>
    <ul>
        <slot></slot>
    </ul>
</template>

<style scoped>
ul {
    background-color: white;
    border: 0.3rem solid rgb(240, 240, 240);
    box-shadow: inset 0 0 4px black;
    list-style: none;
    padding: 1rem;
    margin: 1rem 0;
    max-height: 300px;
    overflow-y: auto;
    direction: rtl;
}

ul > *  {
    margin-top: .6rem;
    text-align: end;
    width: 100%;
    float: right;
    direction: ltr;
    text-align: start;

    border: 2px solid rgba(199, 199, 199, 0.15);
    box-shadow: 0 0 2px black;
    background-color: rgba(226, 226, 226, 0.15);
    border-radius: .2rem;
    padding: .3rem;
    font-weight: bold;
}



</style>