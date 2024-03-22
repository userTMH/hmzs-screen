import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/big-screen", // 重定向:重新指向其它path,会改变网址
    },
    {
      path: "/big-screen",
      name: "big-screen",
      component: () => import("../views/HomeView.vue"),
    },
  ],
});

export default router;
