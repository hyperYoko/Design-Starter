import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/components/Home.vue";

import Page1 from "@/components/Page1.vue";
import Form from "@/components/Form.vue";
import Page3 from "@/components/Page3.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      isAuth: true,
    },
    children: [
      {
        path: "",
        name: "Page1",
        component: Page1,
      },
      {
        path: "/form",
        name: "Form",
        component: Form,
      },
      {
        path: "/page3",
        name: "Page3",
        component: Page3,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
