import Vue from 'vue'
import Router from 'vue-router'
import Auctions from '@/components/AllAuctions'
import Register from '@/components/RegisterUser'
import Login from '@/components/LoginUser'
import Create from '@/components/Auction/CreateAuction'
import Edit from '@/components/Auction/EditAuction'
import Users from '@/components/UsersAuction'
import ViewProduct from '@/components/Auction/ViewProduct'
import Favorites from '@/components/AllFavorites'

Vue.use(Router)

export default new Router({


  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    },
    {
      path: '/products',
      name: 'products',
      component: Auctions
    },
    {
      path: '/products/:productId',
      name: 'product',
      component: ViewProduct
    },
    {
      path: '/products/:productId/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/users/:username',
      name: 'users',
      component: Users
    },
    {
      path: '*',
      redirect: 'products'
    },
  ]
})
