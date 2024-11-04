<template>
    <base-card>
        <h2>My Profile:</h2>
        <form>
            <div></div>
        </form>
        <p>Username: {{  username }}</p>
        <p>Email: {{  username }}</p>
        <base-button>Update Account</base-button><br>
        <base-button mode="danger" >Delete Account</base-button>
    </base-card>
</template>

<script>
export default {
    data(){
        return {
            username: '',
            email: '',
        }
    },
    methods: {
        async getUserData(){
            const user = await this.$store.getters['auth/getUser']
            this.username = user.username 
            this.email = user.email
        }
    },
    created(){
        this.getUserData();
    }

}
</script>

<style scoped>

</style>