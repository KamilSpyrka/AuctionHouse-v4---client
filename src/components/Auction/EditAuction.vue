<template>
  <div>
    <Navbar /> 
    <section class="container">
      <span class="error" v-if="error">{{error}}</span>
      <div class="box">  
              <p>Edit Auction</p>
              <input type="text" id="title" name ="title" class="btn" placeholder="Title" v-model="product.title" maxlength="50" required :rules="required">

              <input type="text" id="productImage" name="productImage" class="btn" placeholder="Image URL adress" v-model="product.productImage" required :rules="required">
             
              <textarea id="description" name ="description" class="btn" placeholder="Description" v-model="product.description" required :rules="required"> </textarea>

              <input type="number" id="price" name ="price" class="btn" placeholder="Price" v-model="product.price" maxlength="6" required :rules="required">              

              <input type="submit" class="send" name="create" value="Edit Auction" @click="save">
      </div>
    </section>
  </div>
</template>

<script>
  import Navbar from '@/components/NavBar.vue'
  import ProductsService from '@/services/ProductsService'

  import {mapState} from 'vuex'

  export default {
    name: 'EditAuction',
    data () {
      return {
        product: {
          title: null,
          price: null,
          productImage: null,
          description: null,
          contactEmail: null,
          username: null
        },

        error: null,
        required: (value) => !!value || 'Required.'
      }
    },

    computed: {
      ...mapState([
      'isUserLoggedIn'
      ])
    },

    components: {
      Navbar
    },

    methods: {
      async save () {
        if(this.$store.state.user.username != this.product.username) {
          this.$router.push({name: 'Login'})
          return         
        }

        const areAllFilled = Object.keys(this.product).every(key => !!this.product[key])
        if (!areAllFilled) {
          this.error = 'You need to fill in all required fields'
          return
        }

        try{
          await ProductsService.put(this.product)
          this.$router.push({name: 'products'})
        }
        catch(err) {
          console.log(err)
        }

      }
  },

  async mounted () {
    if (!this.isUserLoggedIn) {
      this.$router.push({name: 'Login'})
      return
    }

    try {
      const productId = this.$route.params.productId
      this.product = (await ProductsService.show(productId)).data
    }
    catch (err) {
      console.log(err)
    }
  }
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