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
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: rgba(0, 0, 0, 0.3); 
    border-top-color:  rgba(0, 0, 0, 0.6); 
    padding: 0 .3rem;
    text-decoration: none;
}

</style>

