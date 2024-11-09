<template>
    <div class="container">
        <base-button @click="openModal">Modify Category</base-button>
        <base-modal :visible="false" ref="modalModifyCategory">
            <template v-slot:header>Modify category</template>
            <template v-slot:default>
                <base-form-control v-model="name">Name</base-form-control>
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
        const patchCategory = usePatch("/api/categories/"+ props.categoryId);
        const updated = computed(() => patchCategory.response?.ok);

        const name = ref("");

        watch(updated, () => {
            if (!updated.value) return;

            name.value = "";
            patchCategory.clearResponse()
            modalModifyCategory.value.closeModal();
        });

        function openModal() {
            modalModifyCategory.value.openModal();
        }

        async function updateBudget() {
            patchCategory.patchData(
                { 
                    name: name.value ,
                }
            );
        }

        return {
            name,
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
