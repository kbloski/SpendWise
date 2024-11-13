<template>
    <button v-if="!isLink">
        <div class="inner-slot">
            <slot></slot>
        </div>
        <span class="icon"> > </span>
    </button>
    <span class="span-container-link" v-else>
        <router-link :to="toLink">
            <div class="inner-slot">
                <slot></slot>
            </div>
            <span class="icon"> > </span>
        </router-link>
    </span>
</template>

<script>
export default {
    props: ["link", "to"],
    computed: {
        isLink() {
            return this.$props.link;
        },
        toLink() {
            return this.$props.to ?? "/";
        },
    },
};
</script>

<style scoped>
.span-container-link {
    display: flex;
    margin: 0.2rem 0;
    padding: 0;
}

button,
a {
    align-items: center;
    border: 0;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 4px;
    margin: 0;
    position: relative;
    text-decoration: none;
    z-index: 1;
}

.icon {
    color: white;
    font-weight: bold;
    padding: 0 10px;
}

.inner-slot {
    background-color: transparent;
    color: black;
    position: relative;
    padding: .4rem;
    font-size: 1rem;
    font-weight: 900;
    margin: 0;
}

.inner-slot::after {
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    content: "";
    position: absolute;
}

/* DEFAULT */
button,
a {
    background: linear-gradient(45deg, #3b3b3b, #bdbdbd);
}
.inner-slot {
    background: linear-gradient(45deg, #3b3b3b, #bdbdbd);
    color: transparent;
    -webkit-background-clip: text;
}

/* HOVER */
button:hover,
a:hover {
    background: linear-gradient(45deg, #8f8f8f, #9c9c9c);
    color: black;
}

a:hover .inner-slot,
button:hover .inner-slot {
    background: linear-gradient(45deg, #757575, #9c9c9c);
    color: transparent;
    -webkit-background-clip: text;
}

/* ACTIVE */
button:active,
a:active {
    background: linear-gradient(45deg, #5f5f5f, #979797);
    color: black;
}

a:active .inner-slot,
button:active .inner-slot {
    background: linear-gradient(45deg, #5f5f5f, #979797);
    color: transparent;
    -webkit-background-clip: text;
}
</style>
