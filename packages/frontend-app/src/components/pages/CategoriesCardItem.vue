<template>
    <router-link :to="expensesLink">
        <li>
            <div>Category {{ name }}</div>
            <modify-category-modal :categoryId="id"></modify-category-modal>
            <button @click="onDelete">Delete</button>
        </li>
    </router-link>
</template>

<script>
import useDelete from '../../hooks/useDelete';
import ModifyCategoryModal from '../modals/ModifyCategoryModal.vue';


export default {
    props: ['id', 'name'],
    components: {
        ModifyCategoryModal
    },
    data(){
        return {
            deleteBudget: useDelete()
        }
    },
    methods: {
        onDelete(){
            this.deleteBudget.setNewUrl('/api/categories/'+this.id)
        }
    },
    watch: {
        isDelted( val ){
            if (!val) return;
            this.$store.dispatch('refresh/triggerRefreshCategories');
            
            
            this.$router.push({
                name: 'budget-categories',
                params: {
                    budgetId: this.$route.params.budgetId
                }
            })
        }
    },
    computed: {
        isDelted(){
            return this.deleteBudget.response.ok;
        },
        expensesLink(){
            return {
                name: 'category-expenses',
                params: {
                    budgetId: this.$route.params.budgetId,
                    categoryId: this.id
                }
            }
        }
    }
}
</script>

<style scoped>

a {
    text-decoration: none;
    border-radius: 1rem;
    padding: 0rem;
    background: greenyellow;
    font-weight: bold;
    margin: 0.2rem;
}

a:hover {
    background: rgb(101, 150, 28);
    color: white;
}

a:active {
    background: rgb(70, 104, 20);
    color: rgb(254, 255, 181);
}

li {
    box-shadow: inset 0 0 8px black;
    border-radius: 1rem;
    padding: 1rem;
}

</style>