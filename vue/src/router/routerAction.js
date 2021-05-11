import router from '@/router/index'
import store from "@/store/index";

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.meta.needAuth && !store.state.loginState.loggedIn){
        next({
            name: 'medical-system-login'
        })
    }
    else{
        next()
    }
})

