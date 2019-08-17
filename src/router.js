import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

let router = new Router({
  mode: "history",
  linkExactActiveClass: "active",
  linkActiveClass: "active",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      meta: { layout: "no-sidebar" },
      component: require("@/views/Guest/Landing").default
    },
    {
      path: "/login",
      name: "Login",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/User/Login")
    },
    {
      path: "/register",
      name: "Register",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/User/Signup")
    },
    {
      path: "/terms",
      name: "Terms",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Guest/Terms")
    },
    {
      path: "/privacy",
      name: "Privacy",
      meta: { layout: "no-sidebar" },
      component: () => import("@/views/Guest/Privacy")
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("@/views/User/Profile"),
      children: [
        {
          path: "general",
          component: () => import("@/views/User/Profile/General")
        },
        {
          path: "security",
          component: () => import("@/views/User/Profile/Security")
        },
        {
          path: "notifications",
          component: () => import("@/views/User/Profile/Notifications")
        }
      ]
    },
    {
      path: "/notes/:id?",
      name: "Notes",
      component: () => import("@/views/Notes/NotesWrapper")
    },
    {
      path: "/nodes/:id?",
      name: "Nodes",
      component: () => import("@/views/Nodes/Wrapper"),
      children: [
        {
          path: "general",
          component: () => import("@/views/Nodes/Projects/Menu/General")
        },
        {
          path: "team",
          component: () => import("@/views/Nodes/Projects/Menu/RolesTeam")
        },
        {
          path: "categories",
          component: () => import("@/views/Nodes/Projects/Menu/Categories")
        },
        {
          path: "statuses",
          component: () => import("@/views/Nodes/Projects/Menu/Statuses")
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.signedIn) {
      next();
    } else {
      if (window.$cookies.get("jwt")) {
        let token = window.$cookies.get("jwt");
        let userId = window.$cookies.get("userId");
        let admin = window.$cookies.get("admin");
        store.commit("SIGNED_IN", [token, userId, admin]);
        next();
      } else {
        next({
          name: "login",
          params: { nextUrl: to.fullPath }
        });
      }
    }
  } else {
    next();
  }
});

export default router;
