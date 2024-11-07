<template>
    <base-title>Formularz kontaktowy</base-title>
    <div class="container">
        <form v-on:submit.prevent="onSubmit">
            <base-form-control v-model="title" class="input">Tytuł</base-form-control v-model="message" >
            <base-form-control v-model="message">Krótka Wiadomość</base-form-control>
            <base-button type="submit">Wyślij</base-button>
        </form>
    </div>
    <base-modal v-if="submited" @close="changeVisibleModal" ref="modal-info">
        <template v-slot:header>
            <h2>
                Przesyłanie wiadomości...
            </h2>
        </template>
        <template v-slot:default>
            <base-info title="Aktualnie trwają prace nad aplikacją...">
            Na ten moment wysłanie formularza nie jest obsługiwane. Przepraszamy za wszelkie niedogodności. Postaramy się w najbliższe przyszłości naprawić ten problem.
            </base-info>
            <base-button :link="true" to="/">Przejdź na stronę główną</base-button>
        </template>
    </base-modal>
</template>

<script>
export default {
    data(){
        return {
            title: '',
            message: '',
            submited: false
        }
    },
    methods: {
        changeVisibleModal(){
            this.submited = false
            this.$refs['modal-info'].openModal()
        },
        onSubmit(){
            this.submited = true;
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
}

form {
    padding: 1rem;
    min-width: 70%;
}

form > * {
    padding-bottom: 0.5rem;
}
</style>