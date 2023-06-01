<script setup>
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { inject } from 'vue';
import menuItems from '../data/menuItems';
</script>

<template>
    <div class="navbar bg-base-100 z-50">
        <div data-tauri-drag-region class="flex-1">
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
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                        <ShoppingCartIcon class="w-6 h-6" />
                        <span class="badge badge-sm indicator-item text-white bg-red-500 border-0">12</span>
                    </div>
                </label>
                <div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                    <div class="card-body">
                        <span class="font-bold text-lg">8 Items</span>
                        <span class="text-info">Subtotal: $999</span>
                        <div class="card-actions">
                            <button class="btn btn-primary btn-block">View cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>