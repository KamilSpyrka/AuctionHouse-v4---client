<template>
  <div>
    <Navbar /> 
    <section class="container">
      <span class="error" v-if="error">{{error}}</span>
      <div class="box">  
        <p>Create New Auction</p>
        
        <input type="text" id="title" name ="title" class="btn"
        placeholder="Title" v-model="product.title" maxlength="50"
        required :rules="required">

        <input type="text" id="productImage" name="productImage"
        class="btn" placeholder="Image URL adress" v-model="product.productImage"
        required :rules="required">
        
        <textarea id="description" name ="description" class="btn"
        placeholder="Description" v-model="product.description"
        required :rules="required"> </textarea>

        <input type="number" id="price" name ="price" class="btn"
        placeholder="Price" v-model="product.price" maxlength="6"
        required :rules="required">              

        <input type="submit" class="send" name="create"
        value="Create Auction" @click="create">
      </div> 
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/NavBar.vue'
import {mapState} from 'vuex'
import ProductsService from '@/services/ProductsService'

export default {
  name: 'CreateAuction',
  data () {
    return {
       product: {
        title: null,
        price: null,
        productImage: null,
        description: null,
        contactEmail: null,
        username: null,
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },

  components: {
    Navbar
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

  methods: {
    async create () {
      this.product.contactEmail = this.user.email
      this.product.username = this.user.username
      const areAllFilled = Object.keys(this.product).every(key => !!this.product[key])

      if (!areAllFilled) {
        this.error = 'You need to fill in all required fields'
        return
      }
      
      try{
        await ProductsService.createProduct(this.product)
        this.$router.push({name: 'products'})
      }
      catch(err) {
      console.log(err)
      }
    }
  },  
}
</script>

<style scoped>
  .box {
    min-width: 800px;
  }

  @media screen and (max-width: 768px) {
    .box {
      min-height: 550px;
      min-width: 300px;
      margin-top: 80px;
    }
    textarea {
      min-height: 250px;
    }
}
</style>