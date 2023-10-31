<script setup>
import { useRouter } from "vue-router";
import { ref, watch, onMounted } from "vue";
import menuItems from '../data/menuItems';
import { ExclamationTriangleIcon} from '@heroicons/vue/24/solid'

const router = useRouter();
const nowComponent = ref({});

const getNowComponent = () => {
    nowComponent.value = menuItems.find(item => item.path === router.currentRoute.value.path)
     nowComponent.value  = nowComponent.value ?? {
        title: "404没找到页面",
        iconColor: '',
        isActive: true,
        component: ExclamationTriangleIcon,
    };
}

const outLogin = () => {
    localStorage.removeItem("isLogin");
    router.push("/login");
}

onMounted(() => {
    getNowComponent();
})

watch(router.currentRoute, getNowComponent)

</script>
<template>
    <div class="navbar bg-base-100 z-50">
        <div class="flex-1">
            <button class="btn btn-ghost text-2xl">
                <component :is="nowComponent.component" :class="`w-6 h-6 ${nowComponent.iconColor}`"></component>
                    {{ nowComponent.title }}
            </button>
        </div>
        <div class="flex-none">
                <div  class="flex flex-row items-center space-x-2">
                    <button @click="outLogin" class="btn btn-error btn-sm">
                        退出登录
                    </button>
                </div>
            </div>
    </div>
</template>