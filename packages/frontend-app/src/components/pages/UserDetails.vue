<template>
    <div>
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

        <base-button @click="updateUser">Update Account</base-button><br />
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
            this.fetchUpdate.patchData({
                username: this.updUsername,
                password: this.updPassword
            });
        },
    },
    computed: {
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
