<template>
  <div>
    <Navbar /> 
      <div class="product">
        <div class="title">
          <h1>{{product.title}}</h1>

          <div class="setting"> 
            <div>
              <span class="icon" 
                @click="navigateTo({name: 'users', params: { username: product.username}})">
                {{product.username}}
              </span>
            </div>

            <span class="material-symbols-outlined notFavorite" 
              @click="addFavorite"
              v-if="!this.favorite">
              favorite
            </span>

            <span class="material-symbols-outlined favorite"
              @click="deleteFavorite"
              v-if="this.favorite">
              favorite
            </span>

            <span class="material-symbols-outlined icon"
              v-if="this.$store.state.user.username == this.product.username"
              @click="navigateTo({name: 'edit', params: { productId: product.id}})">
              edit
            </span>

            <span class="material-symbols-outlined icon delete"
            v-if="this.$store.state.user.username == this.product.username"
            @click="deleteProduct">
              delete
            </span>

          </div>
        </div>  
        <div class="details">
          <img :src='product.productImage'/>
          <div class="priceDescription">
            <p class="description">{{product.description}}</p>
            <div class="bottom">
              <p class="contact">Contact: {{product.contactEmail}}</p>              
              <p class="el">{{product.price}} zł</p>
            </div>
          </div>
        </div>  
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import ProductsService from '@/services/ProductsService'
import FavoritesService from '@/services/FavoritesService'

import {mapState} from 'vuex'

export default {
  name: 'ViewProduct',
  components: {
    Navbar
  },

  data () {
    return {
      product: {},
      favorite: null,
    }
  },

  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },

  async mounted () {
    if (!this.isUserLoggedIn) {
      this.$router.push({name: 'Login'})
      return
    }
    
    const productId = this.$route.params.productId
    this.product = (await ProductsService.show(productId)).data

    try {
      const favorites = (await FavoritesService.getFavorites({
        productId: productId,
        userId: this.$store.state.user.id       
      })).data
      if(favorites.length) {
        this.favorite = favorites[0]
      }
    }
    catch(err) {
      console.log(err)
    }

  },

  methods: {
    navigateTo (route) {
    this.$router.push(route)
    },

    async deleteProduct () {
      try {
        await ProductsService.deleteProduct(this.product.id)
        this.$router.push({name: 'products'})
      }
      catch(err) {
        console.log(err)
      }
    },

    async addFavorite () {
      try {
        this.favorite = (await FavoritesService.addToFavorites({
          productId: this.$route.params.productId,
          userId: this.$store.state.user.id
        })).data
      }
      catch(err) {
        console.log(err)
      }
    },

    async deleteFavorite () {
      try {
        await FavoritesService.deleteFromFavorites(this.favorite.id)
        this.favorite = null
      }
      catch(err) {
        console.log(err)
      }
    }
  },
}
</script>

<style scoped>
.bottom {
  display: flex;
  justify-content: space-between;
}
.contact {
  align-self: flex-start;
  text-align: center;
  padding: 10px;
  color: #3C3C3C;
}
.product {
  max-width: 800px;
  min-height: 700px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 80px;
  flex-wrap: wrap;
}
.title {
  background-color: #373737;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: #fff;
  padding: 5px;
  text-align: center;
  display: flex;
  justify-content: space-between;
}
img {
  width: 275px;
  height: 275px;
}
.details {
  background-color: #fff;
  width: 100%;
  text-align: justify;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
}
.details p{
  margin-left: 10px;
  font-size: 20px;
}
.priceDescription {
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  margin-bottom: 10px;
}
.el {
  border: #000 1px solid;
  border-radius: 10px;
  min-width: 120px;
  text-align: center;
  padding: 10px;
  color: #3C3C3C;
}
h1 {
  margin-left: 10px;
}
.setting {
  justify-self: center;
  display: flex;
  align-items: center;
}
.icon {
  cursor: pointer;
  padding: 5px;
  font-size: 25px;
  margin-top: 5px;
  transition: 0.3s;
}
.icon:hover {
  border-bottom: #fff 1px solid;
  color: #bbb;
}
.favorite {
  color: #b23b3b;
  cursor: pointer;
  padding: 5px;
  font-size: 25px;
  margin-top: 5px;
  transition: 0.5s;
}
.notFavorite {
  cursor: pointer;
  padding: 5px;
  font-size: 25px;
  margin-top: 5px;
  transition: 0.5s;
  color: #ccc;
}
.favorite:hover {
  color: #900909;
}
.notFavorite:hover {
  color: #999;
}
.delete {
  color: #b23b3b;
}
.delete:hover {
  color: #901919;
}

@media screen and (max-height: 450px) {
  .product {
    min-width: 400px;
  }
}
</style>
