import {MapIcon, NewspaperIcon, UsersIcon } from '@heroicons/vue/24/solid'

const menuItems = [
    {
        index: 0,
        title: "主页",
        iconColor: '',
        isActive: true,
        component: MapIcon,
    },
    {
        index: 1,
        title: "blog管理",
        iconColor: '',
        isActive: false,
        component: NewspaperIcon, 
    },
    {
        index: 2,
        title: "用户管理",
        iconColor: '',
        isActive: false,
        component: UsersIcon,
    },
];

export default menuItems;