<template>
    <div>
        {{ loading}}
        <div>
            {{  updUsername }}
            Username
            <base-form-control v-model="updUsername">{{ username }}</base-form-control>
        </div>
        <div>
            Email
            <base-form-control disabled='true'>{{ email }}</base-form-control>
        </div>
        <div>
            Phone
            <base-form-control disabled="true">{{ 777_777_777 }}</base-form-control>
        </div>


               
        <base-button>Update Account</base-button><br>
    </div>
</template>


<script>
import useFetch from '../../hooks/useFetch.js'

export default {
    data(){
        return {
            updUsername: '',
            fetchUser : {},
            loading: false,
        }
    },
    created(){
        this.fetchUser = useFetch('/api/users/me'); 
    },
    methods: {

    },
    computed: {
        loading(){
            return this.fetchUser.loading
        },
        username(){
            return this.fetchUser?.data?.user?.username ?? ""
        },
        email(){
            return this.fetchUser?.data?.user?.email ?? ''
        }
    },

}
</script>
