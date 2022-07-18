<template>

<nav class="navbar navbar-expand navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <RouterLink class="navbar-brand" to="/">Future Facebook</RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item" v-if="token!=''">
          <RouterLink class="nav-link" to="/user">Home</RouterLink>
        </li>
         <li class="nav-item" v-if="token!=''">
          <RouterLink class="nav-link" to="/profile">Profile</RouterLink>
        </li>
         <li class="nav-item" v-if="token!=''">
          <RouterLink class="nav-link" to="/shouts">Shouts</RouterLink>
        </li>
        <li class="nav-item" v-if="token==''">
          <RouterLink class="nav-link" to="/register">Register</RouterLink>
        </li>
        <li class="nav-item" v-if="token==''">
          <RouterLink class="nav-link" to="/login">Login</RouterLink>
        </li>
               <li class="nav-item" v-if="token!=''">
          <a class="nav-link" href="#" @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>
<script>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

export default {
    setup() {

        const authStore = useAuthStore()
        const router = useRouter()

        const { token } = storeToRefs(useAuthStore())

        async function logout(){
            await fetch('http://127.0.0.1:8000/api/logout',{
                method: 'post',
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + authStore.token
                }
            })
            .then(response=>response.json())
            .then(data=>{
                if(data.status == 'success'){
                    authStore.destroy()
                    router.push('/login')
                }
            })
        }

        return {
            logout,
            token
        }
    },
}
</script>