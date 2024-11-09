<template>
    <div class="user-details">
        <base-error v-if="errors">{{ errors }}</base-error>
        <div>
            Username
            <base-form-control v-model="updUsername">{{ username }}</base-form-control>
        </div>
        <div>
            Email
            <base-form-control disabled="true">{{ email }}</base-form-control>
        </div>
        <div>
            Phone
            <base-form-control disabled="true">{{ 777_777_777 }}</base-form-control>
        </div>
        <div>
            Password
            <base-form-control type="password" v-model="updPassword"
                >Hashed Password Value</base-form-control
            >
        </div>
        <div class="update-button" v-if="!loading">
            <base-button @click="updateUser" >Update Account</base-button><br />
        </div>
        <base-modal :visible="false" ref="updated-info">Zaktualizowano dane użytkownika.</base-modal>
    </div>
</template>

<script>
import useFetch from "../../hooks/useFetch.js";
import usePatch from "../../hooks/usePatch.js";

export default {
    data() {
        return {
            fetchUpdate: usePatch("/api/users/me"),
            updUsername: "",
            updPassword: "",
            fetchUser: {},
        };
    },
    created() {
        this.fetchUser = useFetch("/api/users/me");
    },
    methods: {
        updateUser() {
            const toSend = {};
            if (this.updUsername) toSend.username = this.updUsername;
            if (this.updPassword) toSend.password = this.updPassword
            this.fetchUpdate.patchData(toSend);
        },
    },
    watch: {
        isUpdated( val ){
            if (!val) return;
            this.fetchUpdate.clearResponse()
            this.$refs['updated-info'].openModal()
            this.$store.dispatch('refresh/triggerRefreshUser')
            console.log( this.$store.getters['refresh/isRefreshUserNeeded'])
        }
    },
    computed: {
        isUpdated(){
            return this.fetchUpdate?.response?.ok;
        },
        errors(){
            return this.fetchUpdate?.error || this.fetchUser?.error
        },
        loading() {
            return !!this.fetchUser.loading || !!this.fetchUpdate.loading;
        },
        username() {
            return this.fetchUser?.data?.user?.username ?? "";
        },
        email() {
            return this.fetchUser?.data?.user?.email ?? "";
        },
    },
};
</script>

<style>
.user-details {
    max-width: 500px;
}

.update-button {
    padding-top: 1rem;
}
</style>