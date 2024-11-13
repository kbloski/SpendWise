<template>
    <li>
        {{ username }}
        {{ email }}
        {{ rolePriority }}
        <base-button v-if="!isAdmin" @click="deleteShare">Delete</base-button>
        <div v-else>Admin</div>
    </li>
</template>

<script>
import { computed } from 'vue';

export default{
    props: {
        userId: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        rolePriority: {
            type: String,
            required: true
        }
    },
    setup(props, ctx){
        const userId = computed(() => props.userId )
        const isAdmin = computed( () => props.rolePriority == 0)

        function deleteShare(){
            ctx.emit("delete", userId.value)
        }

        return {
            isAdmin,
            deleteShare
        }
    }
}
</script>