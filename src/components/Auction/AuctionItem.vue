<template>
  <div class="item" >
      <div class="itemPhoto"
        @click="navigateTo({name: 'product', params: {productId: productId}})">
        <img :src='productImage' />
        <h3>{{title}}</h3>
      </div>

      <a
        @click="navigateTo({name: 'users', params: {username: username}})">
        {{username}}
      </a>

      <h4>{{price}} zł</h4>
  </div>   
</template>

<script>
export default {
  name: 'AuctionItem',
  data () {
    return {
    }
  },

  props: [
    'title',
    'price',
    'productImage',
    'productId',
    'username'
  ],

  methods: {
    navigateTo (route) {
    this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.item {
    margin: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 336px;
    height: 450px;
    padding: 10px;
    border-radius: 2px;
    color: #000;
    transition: 0.3s;
    cursor: pointer;
    text-align: center;
}
.item h4 {
    border-top: #000 1px solid;
    margin-top: 10px;
    padding: 10px;
    width: 100%;
    color: #3C3C3C;
}
a {
  justify-self:flex-end;
  color: #000;
  text-decoration: none;
}
a:hover {
  border-bottom:#000 1px solid;
}
.item:hover{
  outline: #373737 1px solid;
}
.itemPhoto {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-bottom: 5px;
}
img {
  width: 300px;
  height: 300px;
}

</style>