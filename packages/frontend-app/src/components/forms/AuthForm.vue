<template>
    <div class="container">
        <form>
            <div class="left">
                <section v-if="!!register" class="register">
                    <h1>Register</h1>
                    <base-error v-if="errors.others">{{ errors.others}}</base-error>
                    <div class="form-control">
                        <div>
                            <input
                                type="text"
                                id="username"
                                autocomplete="off"
                                placeholder=""
                                v-model="username"
                            />
                            <label for="username">Username</label>
                            <span class="icon">🖋</span>
                            <base-error v-if="errors.username">{{
                                errors.username
                            }}</base-error>
                        </div>
                    </div>
                    <div class="form-control">
                        <div>
                            <input
                                type="text"
                                id="email"
                                autocomplete="off"
                                placeholder=""
                                v-model="email"
                            />
                            <label for="email">Email</label>
                            <span class="icon">✉</span>
                            <base-error v-if="errors.email">{{
                                errors.email
                            }}</base-error>
                        </div>
                    </div>
                    <div class="form-control">
                        <div>
                            <input
                                type="password"
                                id="password"
                                placeholder=""
                                v-model="password"
                            />
                            <label for="password">Password</label>
                            <span class="icon">🔒︎</span>
                            <base-error v-if="errors.password">{{
                                errors.password
                            }}</base-error>
                        </div>
                    </div>
                    <div class="form-control">
                        <div>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder=""
                                v-model="confirmedPassword"
                            />
                            <label for="confirm-password">Confirm Password</label>
                            <span class="icon">🔒︎</span>
                        </div>
                    </div>
                    <button type="submit" v-if="!loading" @click="onSubmitRegister">
                        Register
                    </button>
                    <p>
                        You have account?
                        <router-link to="/auth">Login</router-link>
                    </p>
                </section>

                <section v-if="!register" class="login">
                    <h1>Login</h1>
                    <base-error v-if="errors.others">{{ errors.others}}</base-error>
                    <div class="form-control">
                        <div>
                            <input
                                type="text"
                                id="email"
                                placeholder=""
                                autocomplete="off"
                                v-model="email"
                            />
                            <label for="email">Email</label>
                            <span class="icon">✉</span>
                            <base-error v-if="errors.email">{{
                                errors.email
                            }}</base-error>
                        </div>
                    </div>
                    <div class="form-control">
                        <div>
                            <input
                                type="password"
                                id="password"
                                placeholder=""
                                v-model="password"
                            />
                            <label for="password">Password</label>
                            <span class="icon">🔒︎</span>
                            <base-error v-if="errors.password">{{
                                errors.password
                            }}</base-error>
                        </div>
                    </div>
                    <button @click="onSumitLogin" v-if="!loading" type="submit">
                        Login
                    </button>
                    <p>
                        Don't have an account?
                        <router-link to="/auth?register=true">Sign Up</router-link>
                    </p>
                </section>
            </div>
            <div class="right">
                <h1>WELCOME <br />BACK!</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </div>
        </form>
    </div>
</template>

<script>
import { computed, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { validUsername, validEmail, validPassword } from "../../utils/validation";
import usePost from "../../hooks/usePost";

export default {
    props: ["register"],
    setup(props) {
        const store = useStore();
        const router = useRouter();
        const postRegister = usePost("/api/register");
        const postLogin = usePost("/api/login");
        const loading = computed( () => postLogin.loading.value || postRegister.loading.value)

        watch([postLogin.response, postLogin.data], () => {
            if (!postLogin.response?.ok || !postLogin.data?.value?.token) return;
            store.dispatch("auth/setToken", postLogin.data.value.token);
            router.push("/dashboard");
        });
        watch(postRegister.response, () => {
            if (!postRegister.response.ok) return;
            alert("Utworzno nowego użytkownika.");
            postRegister.clearResponse();
            router.replace("/auth");
        });

        // Other errors
        watch( [postLogin.error, postRegister.error], ()=>{
            if (props.register) {
                errors.ok = postRegister.response.ok
                errors.others = postRegister.response.statusText
            } else {
                errors.ok = postLogin.response.ok
                errors.others = postLogin.response.statusText
            }
        })

        const username = ref("");
        const email = ref("");
        const password = ref("");
        const confirmedPassword = ref("");
        const errors = reactive({
            ok: true,
            username: null,
            email: null,
            password: null,
            others: null
        });

        function clearErrors(){
            errors.ok = true
            errors.email = null
            errors.password = null
            errors.username = null
            errors.others = null
        }

        async function onSumitLogin(event) {
            event.preventDefault();
            console.log( errors.others)
            clearErrors()

            errors.email = validEmail(email.value);
            errors.password = validPassword(password.value);
            if (errors.email || errors.password) errors.ok = false;
            if (!errors.ok) return;
            postLogin.clearResponse();
            postLogin.postData({
                email: email.value,
                password: password.value,
            });
        }

        async function onSubmitRegister(event) {
            event.preventDefault();
            clearErrors()
            errors.username = validUsername( username.value )
            errors.email = validEmail(email.value);
            errors.password = validPassword(password.value);
            if (password.value !== confirmedPassword.value) {
                errors.password = "The password and confirm password must be the same."
                errors.ok = false;
            }
            if (errors.email || errors.password) errors.ok = false;

            if (!errors.ok) return;
            postRegister.postData({
                username: username.value,
                email: email.value,
                password: password.value,
            });
        }

        return {
            username,
            email,
            password,
            confirmedPassword,
            onSubmitRegister,
            onSumitLogin,
            loading,
            errors,
        };
    },
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 2rem;
    overflow: hidden;
}

form {
    display: flex;
    color: white;
    justify-content: space-between;
    margin: auto;
    z-index: 2;
}

.left {
    display: flex;
    justify-content: center;
    width: 50%;
}

.right {
    text-align: end;
    width: 30%;
}

.left h1 {
    text-align: center;
    margin-bottom: 3rem;
}

.right > p {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 100;
}

.form-control * {
    background: rgba(0, 0, 0, 0);
    position: relative;
    margin: 0;
    /* padding-bottom: 2rem; */
    padding-bottom: 1rem;
    transition: all 0.3s ease;
}

.form-control input {
    border: 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid white;
    width: 100%;
    color: white;
}

.form-control label {
    position: absolute;
    left: 0;
}

.form-control input:focus + label,
.form-control input:not(:placeholder-shown) + label {
    opacity: 0;
    left: 100%;
}
.form-control span {
    position: absolute;
    right: 0;
}

button {
    color: white;
    font-weight: bolder;
    width: 100%;
    padding: 1rem;
    border-radius: 25px;
    cursor: pointer;
}

.login button {
    border: 2px solid #00c9d9;
    background: linear-gradient(to top, rgb(0, 26, 22) 5%, #00c9d9);
}

.login button + p {
    text-align: center;
    font-size: smaller;
}

.login a {
    font-weight: bolder;
    text-decoration: none;
    color: #00c9d9;
}

.register button {
    border: 2px solid #00d936;
    background: linear-gradient(to top, rgb(0, 26, 22) 5%, #00d936);
}

.register button + p {
    text-align: center;
    font-size: smaller;
}

.register a {
    font-weight: bolder;
    text-decoration: none;
    color: #00d936;
}

@media screen and (min-width: 0px) and (max-width: 425px) {
    .container {
        padding: 1rem;
    }

    .right {
        display: none;
    }

    form {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .left {
        width: 100%;
        min-width: none;
        max-width: 100vw;
    }

    .form-control {
        widows: 100%;
    }
}

@media screen and (min-width: 1024px) {
    .right {
        right: 0;
        transform: translateX(100%);
    }
}
</style>
