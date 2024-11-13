<template>
    <div class="container">
        <base-button @click="openModal">Create category</base-button>
        <base-modal :visible="false" ref="categoryModal">
            <template v-slot:header> Category create </template>
            <template v-slot:default>
                <base-form-control v-model="name">Category name</base-form-control>
                <br />
                <base-button @click="createBudget">Create</base-button>
            </template>
        </base-modal>
    </div>
</template>

<script>
import { computed, ref, watch, inject } from "vue";
import usePost from "../../hooks/usePost.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    props: {
        budgetId: {
            required: true,
        },
    },
    setup(props) {
        const router = useRouter();
        const store = useStore();

        const categoryModal = ref(null);
        let postCategory = usePost("/api/budgets/" + props.budgetId + "/categories");
        const name = ref("");
        const created = computed(() => postCategory.response?.ok);

        function openModal() {
            categoryModal.value.openModal();
            postCategory.clearResponse()
        }
        
        async function createBudget() {
            console.log( name.value)
            postCategory.postData({ name: name.value });
        }
        
        watch(created, () => {
            if (!created.value) return;
            postCategory.clearResponse()
            name.value = ""
            store.dispatch("refresh/triggerRefreshCategories");
            categoryModal.value.closeModal();
        });

        return {
            name,
            categoryModal,
            openModal,
            createBudget,
            created,
        };
    },
};
</script>

<style>
.container {
    padding-bottom: 1rem;
}
</style>
