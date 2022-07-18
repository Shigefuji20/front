<template>
    <div class="row mt-3">
        <div class="col-md-4 offset-md-4">
            <div class="card">
                <div class="card-header bg-light">
                    <h4>User Login</h4>
                </div>
                <form @submit.prevent="handleSubmit">
                <div class="card-body">
                    <div class="md-3">
                        <label for="email">Email</label>
                        <input type="email" id="email" class="form-control" v-model="user.email">
                    </div>
                    <div class="md-3">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" v-model="user.password">
                    </div>
                </div>
                <div class="card-footer">
                    <button type="submit" class="btn btn-primary">
                        Login User
                    </button>
                </div>
                </form>
            </div>
        </div>
    </div>

</template>
<script>
import { ref } from '@vue/reactivity'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

export default {
    setup() {

        const authStore = useAuthStore()
        const router = useRouter()
        const user = ref({email: "",password: ""})

        async function handleSubmit(){
            await fetch('http://127.0.0.1:8000/api/login',{
              method: 'post',
              headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user.value)
            })
            .then(response=>response.json())
            .then(data=>{
                if(data.status == 'success'){
                    authStore.saveAuth(data.user, data.token)
                    router.push('/user')
                }else{
                    alert(data.message)
                }
            })
        }
        return {
            user,
            handleSubmit
        }
    },
}
</script>
<style>
.container {
    padding-top: 50px;
}
</style>