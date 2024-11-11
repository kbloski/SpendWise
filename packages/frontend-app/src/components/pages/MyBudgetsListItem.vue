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
li > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

a {
    background-color: rgba(128, 128, 128, 0.3);
    padding: .3rem;
    border: 2px solid gray;
    color: black; 
    text-decoration: none;
    text-transform: uppercase;
}

</style>

