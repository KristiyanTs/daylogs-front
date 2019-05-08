import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Landing from "./views/Landing";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import ResetPassword from "./views/ResetPassword";
import Profile from "./views/Profile";
import AdminPanel from "./views/admin/AdminPanel";
import NotesWrapper from "./views/Notes/NotesWrapper";
import TasksWrapper from "./views/Tasks/TasksWrapper";
import SoundsWrapper from "./views/Sounds/SoundsWrapper";

Vue.use(Router);

let router = new Router({
  mode: "history",
  linkExactActiveClass: "active",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
    {
      path: "/home",
      name: "home",
      components: {
        header: AppHeader,
        default: Home,
        footer: AppFooter
      },
      children: [
        {
          path: "tasks",
          component: TasksWrapper
        },
        {
          path: "notes",
          component: NotesWrapper
        },
        {
          path: "sounds",
          component: SoundsWrapper
        }
      ],
      props: {
        default: true
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      },
      props: {
        default: true
      }
    },
    {
      path: "/signup",
      name: "signup",
      components: {
        header: AppHeader,
        default: Signup,
        footer: AppFooter
      }
    },
    {
      path: "/password",
      name: "reset password",
      components: {
        header: AppHeader,
        default: ResetPassword,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      },
      props: {
        default: true
      }
    },
    {
      path: "/admin-panel",
      name: "admin panel",
      components: {
        header: AppHeader,
        default: AdminPanel,
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
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
  } else if (to.path == "/" && router.app.$store.state.signedIn) {
    next({
      path: "/home/tasks"
    });
  } else {
    next();
  }
});

export default router;
