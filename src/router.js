import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing";
import Login from "./views/User/Login";
import Signup from "./views/User/Signup"

const ResetPassword = () => import("./views/User/ResetPassword");
const ConfirmEmail  = () => import("./views/User/ConfirmEmail");
const Profile       = () => import("./views/User/Profile");
const NotesWrapper  = () => import("./views/Notes/NotesWrapper");
const TasksWrapper  = () => import("./views/Tasks/TasksWrapper");
const SoundsWrapper = () => import("./views/Sounds/SoundsWrapper");

Vue.use(Router);

let router = new Router({
  mode: "history",
  linkExactActiveClass: "active",
  linkActiveClass: "active",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing,
      meta: { header: true, requiresAuth: false }
    },
    {
      path: "/tasks",
      name: "tasks",
      component: TasksWrapper,
      meta: { requiresAuth: true }
    },
    {
      path: "/notes",
      name: "notes",
      component: NotesWrapper,
      meta: { requiresAuth: true }
    },
    {
      path: "/sounds",
      name: "sounds",
      component: SoundsWrapper,
      meta: { requiresAuth: true }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { header: true, requiresAuth: false }
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
      meta: { header: true, requiresAuth: false }
    },
    {
      path: "/password",
      name: "reset password",
      component: ResetPassword,
      meta: { header: true, requiresAuth: false }
    },
    {
      path: "/confirm_email/:key",
      name: "confirm email",
      component: ConfirmEmail,
      meta: { header: true, requiresAuth: false }
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (router.app.$store.state.signedIn) {
      next();
    } else {
      if (window.$cookies.get("jwt")) {
        let token = window.$cookies.get("jwt");
        let userId = window.$cookies.get("userId");
        let admin = window.$cookies.get("admin");
        router.app.$store.commit("SIGNED_IN", [token, userId, admin]);
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
