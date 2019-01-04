import Home from './components/AppHome.vue'
import TheHeader from './components/TheHeader.vue'

const User = resolve => {
    require.ensure(['./components/User/AppUser.vue'], () => {
        resolve(require('./components/User/AppUser.vue'))
    }, 'user'); // групировка по user, ВСЁ что связано с user будет грузиться вместе
}

const UserStart = resolve => {
    require.ensure(['./components/User/AppUserStart.vue'], () => {
        resolve(require('./components/User/AppUserStart.vue'))
    }, 'user');
}

const UserDetail = resolve => {
    require.ensure(['./components/User/AppUserDetail.vue'], () => {
        resolve(require('./components/User/AppUserDetail.vue'))
    }, 'user');
}

const UserEdit = resolve => {
    require.ensure(['./components/User/AppUserEdit.vue'], () => {
        resolve(require('./components/User/AppUserEdit.vue'))
    }, 'user');
}
/*
    ОПТИМИЗАЦИЯ!!! ОЧ КРУТО! ГРУЗИТ ТОЛЬКО ТОГДА, КОГДА ТЫКАЮТ НА РОУТ USER
*/

export const routes = [{
        path: '/',
        name: 'home',
        components: {
            default: Home,
            'header-top': TheHeader
        }
    },
    {
        path: '/user',
        components: {
            default: User,
            'header-bottom': TheHeader
        },
        children: [{
            path: '',
            component: UserStart
        }, {
            path: ':id',
            component: UserDetail,
            beforeEnter: (to, from, next) => {
                console.log('Inside route setup');
                next();
            }
        }, {
            path: ':id/edit',
            component: UserEdit,
            name: 'userEdit'
        }, ]
    },
    {
        path: '*',
        redirect: {
            name: 'home'
        }
    }

]