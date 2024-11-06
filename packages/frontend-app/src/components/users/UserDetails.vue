<template>
    <div>
        <p>Username: {{  username }} </p>
        <p>Email: {{  email }}</p>
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
