import Api from '@/services/Api'

export default {

    getFavorites (favorite) {
        return Api().get('favorites',{
            params: favorite
        })
    },

    addToFavorites (params) {
        return Api().post('favorites',{params: params})
    },

    deleteFromFavorites (favoritesId) {
        return Api().delete(`favorites/${favoritesId}`)
    },

}

