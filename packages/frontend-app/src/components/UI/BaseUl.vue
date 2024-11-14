<template>
    <div class="ul-title" v-if="title">{{ title }}</div>
    <ul>
        <slot></slot>
    </ul>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style scoped>
@property --border-color {
    syntax: "<color>";
        inherits: true;
        initial-value: rgb(240, 240, 240);
}

.ul-title{
    text-align: left;
    padding: 0.5rem;
    padding-left: 3rem;
    font-weight: bolder;
    text-transform: uppercase;
}

ul {
    background-color: white;
    border: 0.3rem solid var(--border-color);
    border-top: 0;
    box-shadow: inset 0 0 4px black;
    list-style: none;
    padding: 1rem;
    margin: 0 0;
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

    box-shadow: inset 0 0 2px rgba(199, 199, 199, 1);
    background-color: rgba(226, 226, 226, 0.15);
    border-radius: .2rem;
    padding: .3rem;
    font-weight: bold;
}

</style>