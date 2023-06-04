<script setup>
import { inject } from 'vue';
import menuItems from '../data/menuItems';
import Menu from './Menu.vue';
</script>

<template>
    <div class="navbar bg-base-100 z-50">
        <div class="flex-1">
            <button class="btn btn-ghost text-2xl space-x-2">
                <component :is="menuItems[inject('nowPage').value].component" :class="`w-6 h-6 ${menuItems[inject('nowPage').value].iconColor}`"></component>
                <span>{{ menuItems[inject('nowPage').value].title }}</span>
            </button>

        </div>
        <div class="flex-none">
            <div class="flex flex-row items-center space-x-2">
                <Menu />
            </div>
        </div>
    </div>
</template>