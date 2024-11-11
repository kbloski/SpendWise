<template>
        <li>
            <span class="category-name">Kategoria: {{ name }}</span>
            <div class="actions">
                
                <base-button :link="true" :to="expensesLink">View Expenses</base-button>

                <div v-if="rolePriority < 2">
                    <modify-category-modal :categoryId="id"></modify-category-modal>
                    <base-button @click="onDelete" class="button-delete">Delete</base-button>
                </div>
            </div>
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
}


.category-name {
    padding:1rem;
    margin: 1rem;
    box-shadow: inset 0 0 10px black;
    background-color: rgb(82, 82, 82);
    color: white;
}

.actions > * {
    margin: 0;
}


</style>