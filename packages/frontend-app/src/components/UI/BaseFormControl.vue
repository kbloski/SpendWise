<template>
    <div class="form-control">
        <input 
            :type="typeInput"
            :id="idVal"
            :name="name"
            placeholder=""
            v-on:input="changeValue"
            v-bind:value="value"
            :disabled="!!disabled"
            :aria-hidden="!!disabled"
        />
        <label :for="idVal"><slot></slot></label>
    </div>
</template>

<script>
export default {
    props: ['id', "name", 'modelValue',"disabled", 'type'],
    emits: ['update:modelValue'],
    data(){
        return {
            value: ''
        }
    },
    computed: {
        typeInput(){
            return this.$props.type ?? 'text'
        },
        idVal(){
            return this.$props.id ?? `random-id-${Math.random()}`
        }
    },
    methods: {
        changeValue(event){
            this.value = event.target.value
            this.$emit('update:modelValue', this.value)
        }
    }
    
}
</script>

<style scoped>
.form-control {
    position: relative;
    display: flex;
    align-items: center;
    width: auto;
    height: auto;
    margin: .2rem 0;
}

input {
    border-radius: 1rem;
    border: 0;
    box-shadow: inset 0 0 10px black;
    background: white;
    min-width: 100%;
    height: auto;
    padding: .7rem;
    font-style: italic;
}

label {
    left: 0;
    top: 0;
    position: absolute;
    transform: translate(20px, 50%);
    font-style: italic;
    transition: all 0.3s ease;
    cursor: pointer;
}

input:focus + label,
input:not(:placeholder-shown) + label{
    transform: translate(100%, 50%);
    opacity: 0;
}

input:disabled + label {
    color: rgb(122, 122, 122)
}
</style>