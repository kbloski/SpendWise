<template>
    <router-link :to="linkTo">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            required: true,
            default: '/'
        }
    },
    computed: {
        linkTo(){
            return this.$props.to
        }
    }
}
</script>


<style scoped>

a {
    color: white;
    text-decoration: none;
}

a:hover {
    color: antiquewhite;
}

.router-link-active > * {
    color: blueviolet;
}



</style>