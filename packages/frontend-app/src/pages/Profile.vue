<template>
    <base-card>
        <h2>My Profile:</h2>
        <form>
            <div></div>
        </form>
        <p>Username: {{  username }} </p>
        <p>Email: {{  email }}</p>
        <base-button>Update Account</base-button><br>
        <base-button mode="danger" >Delete Account</base-button>
    </base-card>
</template>

<script>
import useFetch from '../hooks/useFetch.js'

export default {
    data(){
        
        return {
            fetchUser : null,
        }
    },
    created(){
        this.fetchUser = useFetch('/users/me'); 
    },
    computed: {
        username(){
            return this.fetchUser.data.user.username
        },
        email(){
            return this.fetchUser.data.user.email ?? ''
        }
    },

}
</script>

<style scoped>

</style>