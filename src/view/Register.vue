<template>
    <div class="row mt-3">
        <div class="col-md-4 offset-md-4">
            <div class="card">
                <div class="card-header bg-light">
                    <h4>User Registration</h4>
                </div>
                <form @submit.prevent="handleSubmit">
                <div class="card-body">
                    <div class="md-3">
                        <label for="lname">Last Name</label>
                        <input type="text" id="lname" class="form-control" v-model="user.lname">
                    </div>
                    <div class="md-3">
                        <label for="fname">First Name</label>
                        <input type="text" id="fname" class="form-control" v-model="user.fname">
                    </div>
                      <div class="mb-3">
                      <label for="course">Course</label>
                      <select id="course" v-model="user.course" class="form-control">
                        <option value="BSIT">BSIT</option>
                        <option value="BSED">BSED</option>
                        <option value="BSN">BSN</option>
                        <option value="BSN">BSEE</option>
                        <option value="BSN">BSMT</option>
                        <option value="BSN">BSME</option>
                        </select>
                    </div>
                        <div class="mb-3">
                        <label for="year">Year</label>
                        <select id="year" v-model="user.year" class="form-control">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            </select>
                    </div>
                        <div class="mb-3">
                        <label for="address">Address</label>
                        <input type="address" id="address" v-model="user.address" class="form-control">
                        </div>
                    <div class="md-3">
                        <label for="mobile">Mobile Number</label>
                        <input type="mobile" id="mobile" class="form-control" v-model="user.mobile">
                    </div>
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
                        Register User
                    </button>
                </div>
                </form>
            </div>
        </div>
    </div>

</template>
<script>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const user = ref({lname: "",fname: "",course:"",year:"",address:"",mobile: "",email: "",password: ""})
        const authStore = useAuthStore()
        const router = useRouter()

        async function handleSubmit(){
          await fetch('http://127.0.0.1:8000/api/register',{
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
                    alert(data.message)
                    router.push('/profile')
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