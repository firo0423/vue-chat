import Vue from 'vue'
import VueRouter from 'vue-router'
import chatSpace from '../components/chatSpace'
import home from '../pages/home'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path: '/',
    name: 'home',
    component:home

  },
  {
    path:'/chat',
    name:'chatSpace',
    component: chatSpace
  }
]

const router = new VueRouter({
  routes
})

export default router
