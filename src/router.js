import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MainScreen from './components/shopper/main-screen.vue'
import SearchScreen from './components/shopper/search/search-screen.vue'
import {INSTALL_MODE, API_ENDPOINT} from './constants.js' ;
import Reprint from './components/shopper/reprint.js'
import store from './store.js' ;
// import StoreDefault from './components/shopper/store/store-default.vue' ;
const Bar = { template: '<div>bar</div>' }
Vue.use(Router)
const routes = [
  {
    path: '/',
    // component: MainScreen,
    component: () => import('./components/shopper/main/'+ (INSTALL_MODE == 'standard' ? 'home.vue': 'standalone.vue') )
  },

  {
    path: '/store/:storeid',
    component: () => import('./components/shopper/store/store-main.vue'),
    children:
        [
          {
            path:'',
            redirect:{name:'store', params:(route)=>({'storeid':route.params.storeid})}
          },
          {
            path: 'home',
            name: 'store',
            component: () => import('./components/shopper/store/store-default.vue')
          },
          {
            path: 'search',
            name: 'store-search',
            component: () => import('./components/shopper/store/store-main-search.vue')

          },
          {
            path: 'category/:category',
            component: () => import('./components/shopper/store/category.vue'),
            name: 'store-category',
            props: true
          },
          {
            path: 'cart',
            component: {
              template: `<router-view/>`
            },
            props: true,
            children: [
              {
                name: 'cart',
                path: '',
                component: () => import('./components/shopper/cart-comp-view.vue')
              },
              {
                path: 'add-delivery-info',
                name: 'add-delivery-info',
                component: () => import('./components/shopper/cart/delivery/delivery-info.vue')
              }
            ]
          },
          /* {
            name:'payment',
            path: 'payment',
            component: Payment_Comp,
        }, */
          {
            name: 'payment-success',
            path: 'payment-success',
            component: () => import('./components/shopper/payment/payment-success-route.vue'),
            props: true
          },
          {
            name: 'merchant-profile',
            path: 'profile',
            component: () => import('./components/shopper/store/profile/profile.vue')
          },
          {
            name:"merchant-pages",
            path: 'page/:id',
            component: ()=> import('./components/shopper/Pages/page.vue'),
            props: true
          },

          {
            path: 'offers',
            component: () => import('./views/Promotions/Offers.vue'),
            children:[
              {
                path:'',
                name:'merchant-promos',
                component: () => import('./views/Promotions/List.vue')
              },
              {
                path:'single',
                props:true,
                beforeEnter(to, from, next){
                  // comp requires name, type and items set, if not set, replace with merchant-promos
                  let params = Object.keys(to.params)  ;
                  if(params.indexOf('promo') != -1)
                    {
                    next() ;
                    }
                  else
                    {
                    next({name:'merchant-promos', params:to.params}) ;
                    }
                },
                name:'single-merchant-promo',
                component: () => import('./views/Promotions/Items.vue')
              }
            ],

          },

          {
            name:"opening-hours",
            path: 'profile/opening-hours',
            component: () => import('./views/OpeningHours.vue')
          },

          {
            name:"merchant-contact",
            path: 'contact',
            component: () => import('./components/shopper/store/profile/contact/contact-us.vue')
          },
          {
            path:'alternate-stores',
            name:"store-finder",
            component: () => import('./components/shopper/store/profile/FindStores.vue'),
          },
          {
            path:'pre-payment',
            name:'pre-payment',
            props:true,
            component: () => import('./components/shopper/payment/PrePaymentPage.vue'),
          },
          {
            path: 'user',
            component: () => import(/* webpackChunkName: "user" */ './components/shopper/user/user.vue'),
            props: true,
            children: [
              {
                path: '',
                component: { template: '<div>User Info</div>' },
                props: true
              },

              {
                path: 'saved-stores',
                name: 'saved-stores',
                component: () => import(/* webpackChunkName: "user" */ './components/shopper/user/saved-stores.vue'),
                props: true
              },

              {
                path: 'saved-locations',
                component:{template:'<router-view/>'},
                children:[
                    {
                        path:'',
                        name: 'saved-locations',
                        component:()=>import(/* webpackChunkName: "user-locations" */ './components/shopper/user/saved-locations/saved-locations.vue')
                    },
                    {
                        name:'add-saved-locations',
                        path:'add',
                        props:true,
                        component:()=>import('./components/shopper/user/saved-locations/add-location.vue')
                    }
                ]
              },

              {
                path: 'saved-cards',
                name: 'saved-cards',
                component: { template: '<div>Your Saved cards</div>' },
                props: true
              },

              {
                path: 'orders',
                name: 'orders',
                component: () => import(/* webpackChunkName: "user" */ './components/shopper/user/orders.vue'),
                props: true
              }
            ]
          }
        ]
  },


  {
    path: '/reprint/:reprintid',
    name: 'reprint',
    component: Reprint,
    props: true
  },
  {
      path:'/orders/tracking',
      name:'invoice-tracking',
      component:()=>import ('./components/shopper/order/order-tracking.vue')
  },

  {
      path:'/site-content',
      component:()=>import('./components/shopper/content/privacy-policy.vue')
  },
  {
    path: '*',
    redirect: '/'
  }

]

const mainSearchRoute =
 {
   path: '/search',
   component: SearchScreen,
   children:
       [
         {
           path: 'stores',
           component: () => import(/* webpackChunkName: "main-search" */ './components/shopper/search/main-search-stores.vue')
         },
         {
           path: 'restaurants',
           component: () => import(/* webpackChunkName: "main-search" */ './components/shopper/search/main-search-restaurants.vue')
         },
         {
           path: 'items',
           component: () => import(/* webpackChunkName: "main-search" */ './components/shopper/search/main-search-items.vue')
         }
       ]
 }

 if(INSTALL_MODE=='standard')
    routes.push(mainSearchRoute)

function removeNull(u){
    let w = []
    if(Array.isArray(u))
        {
        u.forEach(function(v, index){
            if(v)
                {
                let kys = Object.keys(v)
                if(kys.indexOf('children'))
                    {
                    console.log('children found', v, index) ;
                    u[index] = removeNull(v.children)
                    }
                }
            else
                {
                v.splice(index, 1);
                }
            })
        }
    else
        {
        console.log('null found', u);
        /*if(!u)
            v.splice(index, 1);
            */
        }

    return u
}

/*let rs = removeNull(routes)
console.log('removed null', rs) ;*/
/*
const routes2 = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ // './views/About.vue')
/* }
] */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes// routes
})

router.beforeEach((to, from, next) => {
  // remove the classes injected to the body by cta
  if ($('body').hasClass('disable-scroll')) {
    $('body').removeClass('disable-scroll disable-mouse')
  }
  next() ;
})

router.afterEach(function(){
  window.scroll({top:0,left:0,behavior:"smooth"}) ;
}) ;

function setupError(to){

}

export default router

/**/
