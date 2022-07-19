<template>
    <div>
      <Navbar />
      <Search />
      <div class="main">
        <div v-for="product in products" :key="product.id">
          <Item :title="product.title" :price="product.price" 
          :productImage="product.productImage"
          :productId="product.id" :username="product.username"/>
        </div>
      </div>
    </div>
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import Item from '@/components/Auction/AuctionItem.vue'
import ProductsService from '@/services/ProductsService'
import Search from '@/components/Auction/SearchBar.vue'

import {mapState} from 'vuex'

export default {
  name: 'AllAuctions',
  data () {
    return {
        products: [ {
        }]
    }
  },

  components: {
    Item,
    Navbar,
    Search,
  },

  computed: {
        ...mapState([
            'isUserLoggedIn',
            'user'
        ])
  },

  mounted () {
        if (!this.isUserLoggedIn) {
            this.$router.push({name: 'Login'})
            return
        }
  },

  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.products = (await ProductsService.getProducts(value)).data
      }
    }
  }
}

</script>

<style scoped>
.main {
    max-width: 1100px;
    min-height: 1100px;
    background-color: #fff;
    box-shadow: 0 3px 5px rgba(0,0,0,0.6);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    margin-top: 15px;
    flex-wrap: wrap;
}
@media screen and (max-width: 768px) {
  .main {
    margin-left: 15px;
    margin-right: 15px;
  }
}
</style>