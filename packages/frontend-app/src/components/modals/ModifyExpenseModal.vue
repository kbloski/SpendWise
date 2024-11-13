<template>
    <button class="btn-success" @click="openModal">Modify Expense</button>
    <base-modal :visible="false" ref="modalModifyCategory">
        <template v-slot:header>Modify Expense</template>
        <template v-slot:default>
            <base-error v-if="error">{{ error }}</base-error>
            <div v-if="loading">Loading...</div>
            <div v-else>
                <base-form-control v-model="description">Description</base-form-control>
                <base-form-control v-model="amount">Amount</base-form-control>
                <base-button @click="updateBudget">Update</base-button>
            </div>
        </template>
    </base-modal>
</template>

<script>
import { computed, ref, watch, inject } from "vue";
import usePatch from '../../hooks/usePatch.js'
import { useStore } from "vuex";

export default {
    props: ['expenseId'],
    setup( props ) {
        const store = useStore();
        const modalModifyCategory = ref(null);
        const patchCategory = usePatch("/api/expenses/"+ props.expenseId);
        const updated = computed(() => patchCategory.response?.ok);

        const description = ref("");
        const amount = ref("");

        watch(updated, () => {
            if (!updated.value) return;

            description.value = "";
            amount.value = '0'
            patchCategory.clearResponse()
            store.dispatch('refresh/triggerRefreshExpenses')
            modalModifyCategory.value.closeModal();
        });

        function openModal() {
            modalModifyCategory.value.openModal();
        }

        async function updateBudget() {
            
            patchCategory.patchData(
                { 
                    description: description.value ,
                    amount: amount.value,
                }
            );
        }

        return {
            loading: patchCategory.loading,
            error: patchCategory.error,
            description,
            amount,
            modalModifyCategory,
            openModal,
            updateBudget,
        };
    },
};
</script>

<style>
.container {
    padding: 0;
    /* margin: 0; */
}
</style>
