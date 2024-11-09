<template>
    <div class="container">
        <base-button @click="openModal">Modify Category</base-button>
        <base-modal :visible="false" ref="modalModifyCategory">
            <template v-slot:header>Modify category</template>
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
import useFetch from '../../hooks/useFetch.js'

export default {
    props: ['categoryId'],
    setup( props ) {
        const modalModifyCategory = ref(null);
        const patchCategory = usePatch("/api/expenses/"+ props.categoryId);
        const updated = computed(() => patchCategory.response?.ok);

        const description = ref("");
        const amount = ref("");

        watch(updated, () => {
            if (!updated.value) return;

            description.value = "";
            amount.value = '0'
            patchCategory.clearResponse()
            modalModifyCategory.value.closeModal();
        });

        function openModal() {
            modalModifyCategory.value.openModal();
        }

        async function updateBudget() {
            patchCategory.patchData(
                { 
                    description: description.value ,
                }
            );
        }

        return {
            description,
            newOwnerEmail,
            modalModifyCategory,
            openModal,
            updateBudget,
        };
    },
};
</script>

<style>
.container {
    padding-bottom: 1rem;
}
</style>
