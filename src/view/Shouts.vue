<template>

<div class="row">
    <div class="card">
        <div class="col-md-9 mt-2">
          <div>
            <h1>Shoutout</h1>
          </div>
      <table class="table table-striped ">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Shoutout</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sh in shouts" :key="sh.id">
            <td>{{ sh.id }}</td>
            <td>{{ sh.user_id }}</td>
            <td>{{ sh.shoutout }}</td>
            <td>{{ sh.tags }}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/auth"
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { ref } from "vue"
export default {
  data() {
    return {
      shouts: [],
      token: "",
    };
  },
  methods: {
    getData() {
      const authStore = useAuthStore();
      const router = useRouter();

      const { token } = storeToRefs(useAuthStore());
      this.token = token;

      fetch("http://localhost:8000/api/shouts/", {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + authStore.token,
        },
      })
        .then((data) => data.json())
        .then((data) => (this.shouts = data))
        .catch((err) => console.log(err));
    },
  },

  mounted() {
    this.getData();
    const router = useRouter();

    console.log("mounted");
    if (this.token == "") {
      router.replace("/login");
    }
  },
};
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