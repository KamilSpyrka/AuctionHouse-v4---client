<template>
    <nav class="navbar">
        <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        </head>

        <div class="flex">
            <div v-if=($store.state.isUserLoggedIn)> <Sidebar /> </div>
            <router-link to="/"><h1 id="logo">AuctionHouse</h1></router-link>
        </div>

        <div v-if=($store.state.isUserLoggedIn) class="logout" @click="logout">
            Logout
        </div>

        <div v-if=(!$store.state.isUserLoggedIn) class="userPanel">
            <router-link class="userSetting" to="/login" >Login</router-link>
            <router-link class="userSetting" to="/register">Register</router-link>
        </div>

    </nav>
</template>

<script>
import Sidebar from '@/components/SideBar'

export default {
  name: 'NavBar',
  data () {
    return {
    }
  },

  components: {
    Sidebar
  },
  
  methods: {
        logout() {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  overflow: hidden;
  background-color: #373737;
  color: #fff;
  padding: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;

}
.flex a{
    color: #fff;
}
.flex a:hover{
    color: #bbb;
    border: 0;
}
.logout {
    color: white;
    padding: 5px;
    text-decoration: none;
    cursor: pointer;
}
.logout:hover {
    color: #b23b3b;
    border-bottom: 1px #b23b3b solid;
}
.userPanel {
    padding: 5px;
}
.userSetting {
    color: white;
    text-decoration: none;
    margin-right: 5px;
    padding: 10px;
}
.userSetting:hover {
    color: #bbb;
    border-bottom: 1px #fff solid;
}
</style>