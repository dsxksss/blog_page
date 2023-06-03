import { BookOpenIcon, PencilSquareIcon, UserPlusIcon ,UserIcon} from '@heroicons/vue/24/solid'

const menuItems = [
    {
        index: 0,
        title: "博客主页",
        iconColor: '',
        isActive: true,
        component: BookOpenIcon,
    },
    {
        index: 1,
        title: "博客管理",
        iconColor: '',
        isActive: false,
        component: PencilSquareIcon, 
    },
    {
        index: 2,
        title: "用户管理",
        iconColor: '',
        isActive: false,
        component: UserPlusIcon,
    },
];

export default menuItems;