<template>
    <li>
        {{ username }}
        {{ email }}
        <button class="btn-success" v-if="!isAdmin" @click="deleteShare">Delete</button>
        <div v-else>Admin</div>
    </li>
</template>

<script>
import { computed } from 'vue';

export default{
    props: {
        userId: {
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
            required: true
        }
    },
    setup(props, ctx){
        const userId = computed(() => Number(props.userId) )
        const isAdmin = computed( () => Number(props.rolePriority) === 0)

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