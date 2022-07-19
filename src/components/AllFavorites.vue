<template>
    <div>
        <Navbar />
        <div class="main">
            <div v-for="product in products" :key="product.id">
                <Item :title="product.title" :price="product.price"
                :productImage="product.productImage" :productId="product.id"/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Navbar from '@/components/NavBar.vue'
import Item from '@/components/Auction/AuctionItem.vue'
import FavoritesService from '../services/FavoritesService'

export default {
    name: 'AllFavorites',
    data () {
        return {
        products: [],
        favorites: []
        }
    },

    components: {
        Item,
        Navbar,
    },

    computed: {
        ...mapState([
            'isUserLoggedIn',
            'user'
        ])
    },

    async mounted () {
        if (!this.isUserLoggedIn) {
            this.$router.push({name: 'Login'})
            return
        }

        if(this.isUserLoggedIn) {
            this.favorites = (await FavoritesService.getFavorites({
                userId: this.user.id
            })).data

            this.favorites.forEach(el => {
                this.products.push(el.Product)
            })
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
    margin-top: 80px;
    flex-wrap: wrap;
}
</style>