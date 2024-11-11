<template>
    <li>
        <div>
            <span>{{ name }}</span>
            <router-link :to="budgetLink">View</router-link>
        </div>
    </li>
</template>

<script>


export default {
    props: ['name', 'id'],
    computed: {
        budgetLink(){
            return {
                name: "budget-details",
                params: {
                    budgetId: this.$props.id
                }
            }
        }
    }
}
</script>

<style scoped>
li {
    display: flex;
    padding: 0;
    justify-content: end;
}

div {
    display: flex;
    direction: ltr;
}
a {
    padding-left: 10px;
}
</style>

