<template>
    <div>
      <h1>Profile</h1>
      <p>
        User: {{user.fname}}  {{user.lname}}<br />
        Token: {{token}}
      </p>
    </div>
</template>

<script>

import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router';


export default {

  async mounted(){
    await fetch('http://127.0.0.1:8000/api/user',{
                method: 'get',
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer" + this.token
                }
            })
            .then(response=>response.json())
            .then(data=>{
               this.user = data
            })
  },
  setup() {
    const { user, token} = useAuthStore()
    const router = useRouter()

    if(token==''){
      router.replace('/login')
    }

    return {
      user,
      token
    }
  },
}
</script>
<style>
h1 {
    text-align: center;
    padding-bottom: 50px;
}
.container {
    padding: 50px;
}
.text {
    text-align: center;
}
</style>