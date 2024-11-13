<template>
    <button class="btn-success" @click="openModal" v-on:open="openInit">Modify Category</button>
    <base-modal :visible="false" ref="modalModifyCategory" @open="openInit">
        <template v-slot:header>Modify category</template>
        <template v-slot:default>
            <base-error v-if="errors.server">{{ errors.server }}</base-error>
            <base-error v-if="errors.name">{{ errors.name }}</base-error>
            <base-form-control v-model="name">Name</base-form-control>
            <br />
            <base-button @click="updateBudget">Update</base-button>
        </template>
    </base-modal>
</template>

<script>
import { computed, ref, watch, reactive } from "vue";
import usePatch from '../../hooks/usePatch.js'
import { useStore } from "vuex";
import { validName } from "../../utils/validation.js";

export default {
    props: ['categoryId'],
    setup( props ) {
        const store = useStore()
        const categoryId = props.categoryId
        const modalModifyCategory = ref(null);
        const patchCategory = usePatch("/api/categories/"+ categoryId);
        const name = ref(null);
        const errors = reactive({
            name: null,
            server: null
        })

        function openInit(){}
        const updated = computed(() => patchCategory.response?.ok);

        watch(updated, () => {
            if (!updated.value) return;
            name.value = "";
            patchCategory.clearResponse()
            store.dispatch('refresh/triggerRefreshCategories')
            modalModifyCategory.value.closeModal();
        });

        function clearErrors(){
            errors.name = null;
            errors.server = null;
        }

        function openModal() {
            clearErrors()
            modalModifyCategory.value.openModal();
        }
        
        function updateBudget() {
            
            clearErrors()
            errors.name = validName(name.value);

            if (errors.name) return;
            patchCategory.patchData(
                {  name: name.value } );
        }

        return {
            errors,
            loading: patchCategory.loading,
            name,
            modalModifyCategory,
            openModal,
            updateBudget,
            openInit
        };
    },
};
</script>

<style scoped>
.container {
    padding: 0;
    margin: 0;
}
</style>
