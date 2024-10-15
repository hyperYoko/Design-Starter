
import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from "@/components/Dashboard.vue"
import Page1 from "@/components/Page1.vue"


const routes = [
  { path: '/', component: Dashboard },
  { path: '/page1', component: Page1 },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router