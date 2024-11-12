<template>
    <div>
        <base-title>Kategorie budżetu</base-title>
        <create-category :budgetId="budgetId"></create-category>
        <category-cards></category-cards>
        <div class="test">
            <router-view v-slot="slotProps">
                <transition name="card-route" mode="out-in">
                    <component :is="slotProps.Component"></component>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script>
import CategoryCards from '../components/pages/CategoriesList.vue'
import AddCategoryModal from '../components/modals/AddCategoryModal.vue';

export default {
    components: {
        createCategory: AddCategoryModal,
        CategoryCards
    },
    computed: {
        budgetId(){
            return this.$route.params.budgetId
        }
    }
}
</script>
