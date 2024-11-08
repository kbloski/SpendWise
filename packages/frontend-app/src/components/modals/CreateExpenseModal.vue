<template>
    <div class="container">
        <base-button @click="openModal">Create expense</base-button>
        <base-modal :visible="false" ref="categoryModal">
            <template v-slot:header> Expense create </template>
            <template v-slot:default>
                <base-form-control v-model="description">Description</base-form-control>
                <base-form-control v-model="amount">Amount (Provide number)</base-form-control>
                <br />
                <base-button @click="createExpense">Create</base-button>
            </template>
        </base-modal>
    </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import usePost from "../../hooks/usePost.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    props: {
        budgetId: {
            required: true,
        },
        categoryId : {
            required: true
        }
    },
    setup(props) {
        const router = useRouter();
        const store = useStore();

        const categoryModal = ref(null);
        const postExpense = usePost("/api/budgets/" + props.budgetId + "/categories/" + props.categoryId + '/expenses');
        const description = ref("");
        const amount = ref("");
        const created = computed(() => postExpense.response?.ok);

        function openModal() {
            categoryModal.value.openModal();
        }
        
        async function createExpense() {
            postExpense.postData({ 
                description: description.value,
                amount: Number(amount.value)
            });
        }
        
        watch(created, () => {
            if (!created.value) return;
            postExpense.clearResponse()
            description.value = ""
            amount.value = ""

            store.dispatch("refresh/triggerRefreshExpenses");

            categoryModal.value.closeModal();
        });

        return {
            categoryModal,
            openModal,
            createExpense,
            created,
            amount,
            description
        };
    },
};
</script>

<style>
.container {
    padding-bottom: 1rem;
}
</style>
