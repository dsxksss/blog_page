import { BookOpenIcon, PencilSquareIcon, UserPlusIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/solid'

const menuItems = [
    {
        path: '/',
        title: "博客列表",
        iconColor: '',
        isActive: true,
        component: BookOpenIcon,
    },
    {
        path: '/blogmanager',
        title: "博客管理",
        iconColor: '',
        isActive: false,
        component: PencilSquareIcon,
    },
    {
        path: '/usermanager',
        title: "用户管理",
        iconColor: '',
        isActive: false,
        component: UserPlusIcon,
    },
];

export default menuItems;