<template>
    <div class="container">
        <base-button @click="openModal" v-on:open="openInit">Modify Category</base-button>
        <base-modal :visible="false" ref="modalModifyCategory" @open="openInit">
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
import { useStore } from "vuex";

export default {
    props: ['categoryId'],
    setup( props ) {
        const store = useStore()
        const categoryId = props.categoryId
        const modalModifyCategory = ref(null);
        const patchCategory = usePatch("/api/categories/"+ categoryId);
        const name = ref(null);

        function openInit(){}
        const updated = computed(() => patchCategory.response?.ok);

        watch(updated, () => {
            if (!updated.value) return;
            name.value = "";
            patchCategory.clearResponse()
            store.dispatch('refresh/triggerRefreshCategories')
            modalModifyCategory.value.closeModal();
        });

        function openModal() {
            modalModifyCategory.value.openModal();
        }

        async function updateBudget() {
            patchCategory.patchData(
                {  name: name.value } );
        }

        return {
            name,
            modalModifyCategory,
            openModal,
            updateBudget,
            openInit
        };
    },
};
</script>

<style>
.container {
    padding-bottom: 1rem;
}
</style>
