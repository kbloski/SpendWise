<template>
    <button v-if="!isLink">
        <div class="inner-slot">
            <slot></slot>
        </div>
        <span class="icon"> > </span>
    </button>
    <span class="span-container-link">
        <router-link :to="toLink" v-if="isLink">
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
* {
    margin: 0;
    padding: 0;
}

.span-container-link {
    display: flex;
}

button,
a {
    align-items: center;
    border-radius: 1000px;
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
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 900;
    margin: 0;
}

.inner-slot::after {
    border-radius: 1000px 0 0 1000px;
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
    background: linear-gradient(45deg, #007c91, #33cc4c);
    
    
}
.inner-slot {
    background: linear-gradient(45deg, #007c91, #33cc4c);

    color: transparent;
    -webkit-background-clip: text;
}

/* HOVER */
button:hover,
a:hover {
    background: linear-gradient(45deg, #006f82, #2ab94b);
    color: black;
}

a:hover .inner-slot,
button:hover .inner-slot {
    background: linear-gradient(45deg, #006f82, #2ab94b);
    color: transparent;
    -webkit-background-clip: text;
}

/* ACTIVE */
button:active,
a:active {
    background: linear-gradient(45deg, #005f6b, #1f9d3b);
    color: black;
}

a:active .inner-slot,
button:active .inner-slot {
    background: linear-gradient(45deg, #005f6b, #1f9d3b);
    color: transparent;
    -webkit-background-clip: text;
}
</style>
