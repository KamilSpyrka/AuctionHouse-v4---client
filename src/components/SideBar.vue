<template>
  <div>
    <button class="openbtn" @click="openNav">&#9776;</button>
    <div id="mySidebar" class="sidebar">
      <h1>AuctionHouse</h1>
      <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
      <router-link to="/Create">Create New Auction</router-link>
      <router-link :to="{name: 'users', params: {username: this.$store.state.user.username}}">My Auctions</router-link>
      <router-link to="/Favorites">Favourites</router-link>
      <a href="https://github.com/KamilSpyrka/AuctionHouse" target="_blank">Github page of project</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {
    }
  },

    methods: {
        openNav() {
        document.getElementById("mySidebar").style.width = "250px";
        },

        closeNav() {
        document.getElementById("mySidebar").style.width = "0";
        }
    }
}


</script>

<style scoped>
.sidebar {
  height: 100%; 
  width: 0; 
  position:fixed;
  z-index: 1; 
  top: 0;
  left: 0;
  background-color: #373737; 
  overflow-x: hidden; 
  padding-top: 60px; 
  transition: 0.5s;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
}
h1 {
   padding: 0px 8px 8px 32px; 
   margin-bottom: 10px;
}
.sidebar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}
.sidebar a:hover {
  color: #f1f1f1;
}
.sidebar .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
  color: #D9DCD6;
}
.sidebar a:hover {
    border: 0;
}
.openbtn {
  font-size: 25px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  background-color: #373737;
  color: white;
  margin-right: 15px;
  border: none;
}
.openbtn:hover {
    color: #ddd;
}
#main {
  transition: margin-left .5s; 
  padding: 20px;
}

@media screen and (max-height: 450px) {
  .sidebar {padding-top: 15px;}
  .sidebar a {font-size: 18px;}
}
</style>