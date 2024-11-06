<template>
    <div>
        <div>
            Username
            <base-form-control>{{ username }}</base-form-control>
        </div>
        <div>
            Email
            <base-form-control>{{ email }}</base-form-control>
        </div>
        <div>
            Phone
            <base-form-control>{{ 777_777_777 }}</base-form-control>
        </div>
    </div>
</template>


<script>
import useFetch from '../../hooks/useFetch.js'

export default {
    data(){
        return {
            fetchUser : null,
        }
    },
    created(){
        this.fetchUser = useFetch('/api/users/me'); 
    },
    computed: {
        username(){
            return this.fetchUser?.data?.user?.username ?? ""
        },
        email(){
            return this.fetchUser?.data?.user?.email ?? ''
        }
    },

}
</script>
