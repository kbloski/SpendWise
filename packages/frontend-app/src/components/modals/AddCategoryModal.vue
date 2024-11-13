<template>
        <button class="btn-success" @click="openModal">Create category</button>
        <base-modal :visible="false" ref="categoryModal">
            <template v-slot:header> Category create </template>
            <template v-slot:default>
                <base-error v-if="errors.name || errors.server">
                    {{ errors.server }}
                    {{ errors.name }}
                </base-error>
                <div v-if="loading">Loading...</div>
                <div v-else>
                    <base-form-control v-model="name">Category name</base-form-control>
                    <base-button @click="createBudget">Create</base-button>
                </div>
            </template>
        </base-modal>
</template>

<script>
import {  ref, watch, reactive } from "vue";
import usePost from "../../hooks/usePost.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { validName } from "../../utils/validation.js";

export default {
    props: {
        budgetId: {
            required: true,
        },
    },
    setup(props) {
        const store = useStore();

        const categoryModal = ref(null);
        let postCategory = usePost("/api/budgets/" + props.budgetId + "/categories");

        const errors = reactive({
            name: null,
            server: null
        })
        const name = ref("");

        function openModal() {
            categoryModal.value.openModal();
            postCategory.clearResponse()
        }
        
        async function createBudget() {
            errors.name = validName(name.value);
            if (errors.name) return;
            postCategory.postData({ name: name.value });
        }
        
        watch( postCategory.error , () => errors.server = postCategory.error.value)

        watch(postCategory.response, () => {
            if (!postCategory.response.ok) return;
            postCategory.clearResponse()
            name.value = ""
            store.dispatch("refresh/triggerRefreshCategories");
            categoryModal.value.closeModal();
        });

        return {
            errors,
            loading: postCategory.loading,
            name,
            categoryModal,
            openModal,
            createBudget,
        };
    },
};
</script>

<style>
.container {
    padding-bottom: 1rem;
}
</style>
