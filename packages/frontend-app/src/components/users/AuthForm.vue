<template>
    <div class="container">
        <form>
            <div class="left">
                <section v-if="!!register" class="register">
                    <h1>Register</h1>
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
                    <button type="submit" v-if="!loading" @click="onSubmitRegister">Register</button>
                    <p>
                        You have account?
                        <router-link to="/auth">Login</router-link>
                    </p>
                </section>

                <section v-if="!register" class="login">
                    <h1>Login</h1>
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
                        </div>
                    </div>
                    <button @click="onSumitLogin" v-if="!loading" type="submit">Login</button>
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
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    props: ["register"],
    setup(props) {
        const store = useStore();
        const router = useRouter();

        const username = ref("");
        const email = ref("");
        const password = ref("");
        const confirmedPassword = ref("");
        const loading = ref(false)

        function onSumitLogin(event) {
            event.preventDefault();
            loading.value = true;

            fetch('http://localhost:8081/api/login',
                {
                    method: "POST",
                    headers: { "Content-Type" : 'application/json',
                    },
                    body: JSON.stringify({
                        email: email.value,
                        password: password.value
                    })
                }
            )
            .then( response => {
                if (!response.ok) throw new Error(response.status + ' ' + response.statusText);
                return response.json()
            })
            .then( data => {
                store.dispatch('auth/setToken', data.token)
                console.log( data.token)
                router.push('/dashboard')
            })
            .catch( err => console.error(err))
            .finally( () => loading.value = false);
        }

        async function onSubmitRegister(event) {
            event.preventDefault();
            loading.value = true;

            fetch('http://localhost:8081/api/register',
                {
                    method: "POST",
                    headers: { "Content-Type" : 'application/json'},
                    body: JSON.stringify({
                        username: username.value,
                        email: email.value,
                        password: password.value
                    })
                }
            )
            .then( response => {
                if (!response.ok) throw new Error(response.status + ' ' + response.statusText);
                router.push('/auth')
            })
            .catch( err => console.error(err))
            .finally( () => loading.value = false);
        }

        return {
            username,
            email,
            password,
            confirmedPassword,
            onSubmitRegister,
            onSumitLogin,
            loading
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
    padding-bottom: 2rem;
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
