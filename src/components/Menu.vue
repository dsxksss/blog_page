<script setup>
import { useRouter } from "vue-router"
import menuItems from "../data/menuItems"
import { ref } from "vue";
const router = useRouter()
const items = ref(menuItems);

</script>

<template>
    <ul class="menu flex rounded-box p-2 pl-10 space-y-4">
        <li v-for="item in items" :key="item.path">
            <RouterLink :to="item.path"
                :class="item.path == router.currentRoute.value.path ? 'active' : null">
                <component :is="item.component" :class="`w-6 h-6 ${item.iconColor}`"></component>
            </RouterLink>
        </li>
    </ul>
</template>