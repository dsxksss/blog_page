<script setup>
import {  MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { inject } from 'vue';
import menuItems from '../data/menuItems';
</script>

<template>
    <div class="navbar bg-base-100 z-50">
        <div class="flex-1">
            <button class="btn btn-ghost text-2xl">
                <component :is="menuItems[inject('nowPage').value].component" :class="`w-6 h-6 ${menuItems[inject('nowPage').value].iconColor}`"></component>
                {{ menuItems[inject('nowPage').value].title }}
            </button>

        </div>
        <div class="flex-none">
            <div class="flex flex-row items-center space-x-2">
                <button class="btn btn-ghost btn-circle">
                    <MagnifyingGlassIcon class="w-7 h-7" />
                </button>
            </div>
        </div>
    </div>
</template>