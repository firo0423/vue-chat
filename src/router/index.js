import Vue from 'vue'
import VueRouter from 'vue-router'
import chatSpace from '../components/chatSpace'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  // {
  //   path: '/',
  //   name: 'Home',

  // },
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
