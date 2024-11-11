<template>
    <div class="container">
        <base-button @click="openModal">Modify Expense</base-button>
        <base-modal :visible="false" ref="modalModifyCategory">
            <template v-slot:header>Modify Expense</template>
            <template v-slot:default>
                <base-form-control v-model="description">Description</base-form-control>
                <base-form-control v-model="amount">Amount</base-form-control>
                <br />
                <base-button @click="updateBudget">Update</base-button>
            </template>
        </base-modal>
    </div>
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
