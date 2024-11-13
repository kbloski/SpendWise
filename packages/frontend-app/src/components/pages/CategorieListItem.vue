<template>
        <li>
            <span class="category-name">Kategoria: {{ name }}</span>
            <base-dropdown>
                <div class="actions">
                    <router-link class="btn-success" :link="true" :to="expensesLink">View Expenses</router-link>
                    <modify-category-modal :categoryId="id"></modify-category-modal>
                    <button @click="onDelete" class="btn-success">Delete</button>
                </div>
            </base-dropdown>
        </li>
</template>

<script>
import useDelete from '../../hooks/useDelete';
import ModifyCategoryModal from '../modals/ModifyCategoryModal.vue';


export default {
    props: ['id', 'name', 'rolePriority'],
    components: {
        ModifyCategoryModal
    },
    data(){
        return {
            deleteBudget: useDelete()
        }
    },
    methods: {
        onDelete( event ){
            this.deleteBudget.setNewUrl('/api/categories/'+this.id)
        }
    },
    watch: {
        isDelted( val ){
            if (!val) return;
            this.$store.dispatch('refresh/triggerRefreshCategories');
            this.$store.dispatch('refresh/triggerRefreshBudgets');
            
            
            this.$router.push({
                name: 'budget-categories',
                params: {
                    budgetId: this.$route.params.budgetId
                }
            })
        }
    },
    computed: {
        isDelted(event){
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
li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}


.category-name {
    margin: 1rem;
}

.actions  {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    width: 50%;
}


</style>