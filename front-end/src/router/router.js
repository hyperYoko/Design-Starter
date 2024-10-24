import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/components/Home.vue";

import ElevatedPage from "@/components/ElevatedPage.vue";
import Form from "@/components/Form.vue";
import ElevatedLinePage from "@/components/ElevatedLinePage.vue";

import PlainPage from "@/components/PlainPage.vue";
import SubNavBarPage from "@/components/SubNavBarPage.vue";



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
        name: "ElevatedPage",
        component: ElevatedPage,
      },
      {
        path: "/form",
        name: "Form",
        component: Form,
      },
      {
        path: "/elevatedlinepage",
        name: "ElevatedLinePage",
        component: ElevatedLinePage,
      },
      {
        path: "/plainpage",
        name: "PlainPage",
        component: PlainPage,
      },
      {
        path: "/subnavbarpage",
        name: "SubNavBarPage",
        component: SubNavBarPage,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
